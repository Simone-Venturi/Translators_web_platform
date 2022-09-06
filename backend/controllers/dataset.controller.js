const db = require("../models");
const DataSet = db.dataset;
const Language = db.language;
const Translation = db.translation;
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
            MongoDataset.findOne({name: dataset.name}, (err, mongoDataset) => {
                console.log(mongoDataset)
                if(mongoDataset == null) {
                    MongoDataset.create({
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
                    bulkInsertMongo(chunk, original_language.abbreviation.toLowerCase(), translated_language.abbreviation.toLowerCase(), mongoDataset.name)                    
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
    let translationsCount = await Translation.count({
        include: ['OriginalSentence', 'TranslatedSentence'],
        where: {
            '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageFrom },
            '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageTo },
            dataset_id: req.body.dataset,
            average_score: {[db.Sequelize.Op.between]: [req.body.minReviewScore, req.body.maxReviewScore]}
        }
    })
    console.log(translationsCount)
    res.status(200).send({count: translationsCount})
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

exports.downalodDataSet = async (req, res) => {
    let translations = await Translation.findAll({
        include: ['OriginalSentence', 'TranslatedSentence'],
        where: {
            '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageFrom },
            '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.body.languageTo },
            dataset_id: req.body.dataset,
            average_score: {[db.Sequelize.Op.between]: [req.body.minReviewScore, req.body.maxReviewScore]}
        }
    })
    res.status(200).send(translations)
}