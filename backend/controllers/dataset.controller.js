const db = require("../models");
const DataSet = db.dataset;
const Language = db.language;
const Translation = db.translation;
const Sentence = db.sentence;
const xml2js = require('xml2js');
const { bulkInsert } = require("../queues/dataset.queue");

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
            const chunkSize = 1000;
            for (let i = 0; i < body[0].tu.length; i += chunkSize) {
                const chunk = body[0].tu.slice(i, i + chunkSize);
                bulkInsert(chunk, original_language.idlanguage, translated_language.idlanguage, req.userId, req.body.id)
            }             
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