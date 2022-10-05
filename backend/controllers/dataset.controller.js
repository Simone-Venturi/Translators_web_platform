const db = require("../models");
const path = require('path');
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
    try {
        const languages_requested = await Language.findAll({
            where: {
                idlanguage: {
                    [db.Sequelize.Op.in] : req.body.languagesTo
                }
            }
        })
        const mongo_filter = Object.assign({}, ...languages_requested.map(lang => { return {[lang.abbreviation.toLowerCase()]: { $exists: true}}}))
        const total = await MongoTranslation.count(mongo_filter).exec()
        res.status(200).send({total: total})
    } catch (e){
        console.log(e)
        res.status(404)
    }    
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
    try {
        const dataset = await DataSet.findByPk(req.body.dataset)
        const languages_requested = await Language.findAll({
            where: {
                idlanguage: {
                    [db.Sequelize.Op.in] : req.body.languagesTo
                }
            }
        })
        const mongo_filter = Object.assign({}, ...languages_requested.map(lang => { return {[lang.abbreviation.toLowerCase()]: { $exists: true}}}))
        const all_translations = await MongoTranslation.find(mongo_filter).exec()
        const dir = path.join(__dirname,'/../resources/requests/' + sha256(Date.now().toString()))
        const languages_abbreviation_string = languages_requested.filter(lang => req.body.languagesTo.includes(lang.idlanguage)).map(lang => lang.abbreviation).join('-')
        const filename = dataset.name+'-langs-'+languages_abbreviation_string+'.zip'
        const out = path.join(__dirname, '/../resources/zips/'+filename)
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const file = fs.createWriteStream(dir+'/langs-'+languages_abbreviation_string+'.txt');
        for(let translation of all_translations){
            for await (let lang of languages_requested.map(l => l.abbreviation.toLowerCase())){
                file.write(lang+':'+translation[lang]+'\n')
            }
        }
        file.end();
        await zipDirectory(dir,out)
        res.download(out);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
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