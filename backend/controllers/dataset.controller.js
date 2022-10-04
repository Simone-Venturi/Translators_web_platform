const db = require("../models");
const fs = require('fs');
const archiver = require('archiver');
var sha256 = require('js-sha256');
const DataSet = db.dataset;
const Language = db.language;
const Translation = db.translation;
const DatasetHasLanguage = db.datasets_have_languages;
const MongoDataset = db.mongoDataset;
const MongoTranslation = db.mongoTranslation;
const xml2js = require('xml2js');
const { bulkInsertMongo } = require("../queues/translation.queue");

exports.allDataSets = async (req, res) => {
    let datasets = await DataSet.findAll()
    if (!datasets) {
        return res.status(404).send({ message: "DataSet not found." });
    }
    res.status(200).send(datasets)
};

exports.createDataSet = async (req, res) => {
    let dataset = await DataSet.create({
        name: req.body.name,
        URL: req.body.url
    });
    res.status(200).send(dataset)
};

exports.loadDataSet = async (req, res) => {
    try {
        xml2js.parseStringPromise(req.files.file.data.toString()).then(async (result) => {
            const header = result.tmx.header
            const body = result.tmx.body
            const original_language = await Language.findOne({
                where: {
                    abbreviation: header[0].$.srclang.toUpperCase()
                }
            })
            if ( original_language == null ){
                res.status(404).send({message: 'Original Language not found'})
            }
            const translated_language = await Language.findOne({
                where: {
                    abbreviation: body[0].tu[0].tuv[1].$['xml:lang'].toUpperCase()
                }
            })
            if ( translated_language == null ){
                res.status(404).send({message: 'Translated Language not found'})
            }
            const dataset = await DataSet.findByPk(req.body.id)
            await DatasetHasLanguage.findOrCreate({            
                where: {
                    dataset: dataset.id,
                    language: original_language.idlanguage
                }
            })
            await DatasetHasLanguage.findOrCreate({            
                where: {
                    dataset: dataset.id,
                    language: translated_language.idlanguage
                }
            })
            MongoDataset.findOne({name: dataset.name}, async (err, mongoDataset) => {
                if(mongoDataset == null) {
                    await MongoDataset.create({
                        name: dataset.name,
                        url: dataset.URL,
                        languages: [original_language.abbreviation, translated_language.abbreviation]
                    })
                } else {
                    mongoDataset.languages.indexOf(original_language.abbreviation) === -1 ? mongoDataset.languages.push(original_language.abbreviation) : 0 ;
                    mongoDataset.languages.indexOf(translated_language.abbreviation) === -1 ? mongoDataset.languages.push(translated_language.abbreviation) : 0 ;
                    mongoDataset.save()
                }
                const chunkSize = 1000;
                for (let i = 0; i < body[0].tu.length; i += chunkSize) {
                    const chunk = body[0].tu.slice(i, i + chunkSize);
                    bulkInsertMongo(chunk, original_language.abbreviation.toLowerCase(), translated_language.abbreviation.toLowerCase(), dataset.name, dataset.id, req.userId)                    
                }             
            })           
            res.sendStatus(200)
          })
          .catch((err) => {
            res.status(500).send({message: 'error during dataset parsing'})
          })
    } catch (e) {
        res.sendStatus(500)
    }
};

exports.checkDataSetSize = async (req, res) => {
    const languages_requested = req.body.languagesTo
    const languages_before_language_from = languages_requested.filter(elem => req.body.languageFrom > elem)
    const languages_after_language_from = languages_requested.filter(elem => req.body.languageFrom < elem)
    let translationsCounts = []
    for await (let language_id of languages_before_language_from) {
        let count = await Translation.count({
            include: ['OriginalSentence', 'TranslatedSentence'],
            where: {
                '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: language_id },
                '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageFrom  },
                dataset_id: req.body.dataset,
                average_score: {[db.Sequelize.Op.between]: [req.body.minReviewScore, req.body.maxReviewScore]}
            }
        })
        translationsCounts.push({
            language_id: language_id,
            count: count
        })
    }
    for await (let language_id of languages_after_language_from) {
        let count = await Translation.count({
            include: ['OriginalSentence', 'TranslatedSentence'],
            where: {
                '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageFrom },
                '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: language_id },
                dataset_id: req.body.dataset,
                average_score: {[db.Sequelize.Op.between]: [req.body.minReviewScore, req.body.maxReviewScore]}
            }
        })
        translationsCounts.push({
            language_id: language_id,
            count: count
        })
    }
    const total = translationsCounts.map(translation => translation.count)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
    res.status(200).send({partials: translationsCounts, total: total})
}

exports.checkMongoData = (req, res) => {
    MongoTranslation.find({'en' : { $regex: new RegExp(req.body.text), $options: 'i' }})
        .sort({createdAt: "desc"})
        .lean()
        .exec(async function (err, translations) {
            console.log(translations)
            return res.status(200).send({message: JSON.stringify(translations)});
        });
}

exports.downloadDataSet = async (req, res) => {
    const all_languages = await Language.findAll();
    const dataset = await DataSet.findByPk(req.body.dataset)
    const languages_requested = req.body.languagesTo
    const languages_before_language_from = languages_requested.filter(elem => req.body.languageFrom > elem)
    const languages_after_language_from = languages_requested.filter(elem => req.body.languageFrom < elem)
    const abbreviation_language_from = all_languages.filter(lang => lang.idlanguage == req.body.languageFrom)[0].abbreviation
    const dir = 'dist/resources/requests/' + sha256(Date.now().toString())
    const languages_abbreviation_string = all_languages.filter(lang => req.body.languagesTo.includes(lang.idlanguage)).map(lang => lang.abbreviation).join('-')
    const filename = dataset.name+'-'+abbreviation_language_from+'to'+languages_abbreviation_string+'.zip'
    const out = 'dist/resources/zips/'+filename
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    for await (let language_id of languages_before_language_from) {
        const abbreviation_language_to = all_languages.filter(lang => lang.idlanguage == language_id)[0].abbreviation
        let translations = await Translation.findAll({
            include: ['OriginalSentence', 'TranslatedSentence'],
            where: {
                '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: language_id },
                '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageFrom  },
                dataset_id: req.body.dataset,
                average_score: {[db.Sequelize.Op.between]: [req.body.minReviewScore, req.body.maxReviewScore]}
            }
        })
        const file = fs.createWriteStream(dir+'/'+abbreviation_language_from+'-'+abbreviation_language_to+'.txt');
        translations
            .forEach((translation) => {
                file.write(abbreviation_language_from+':'+translation.TranslatedSentence.sentence+'\n');
                file.write(abbreviation_language_to+':'+translation.OriginalSentence.sentence+'\n');
            });            
        file.end();
    }
    for await (let language_id of languages_after_language_from) {
        const abbreviation_language_to = all_languages.filter(lang => lang.idlanguage == language_id)[0].abbreviation
        let translations = await Translation.findAll({
            include: ['OriginalSentence', 'TranslatedSentence'],
            where: {
                '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageFrom },
                '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: language_id },
                dataset_id: req.body.dataset,
                average_score: {[db.Sequelize.Op.between]: [req.body.minReviewScore, req.body.maxReviewScore]}
            }
        })        
        const file = fs.createWriteStream(dir+'/'+abbreviation_language_from+'-'+abbreviation_language_to+'.txt');
        translations
            .forEach((translation) => {
                file.write(abbreviation_language_from+':'+translation.OriginalSentence.sentence+'\n');
                file.write(abbreviation_language_to+':'+translation.TranslatedSentence.sentence+'\n');
            });            
        file.end();
    }
    await zipDirectory(dir,out)
    res.download(out);
}

//https://stackoverflow.com/questions/15641243/need-to-zip-an-entire-directory-using-node-js 
/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
  });
}