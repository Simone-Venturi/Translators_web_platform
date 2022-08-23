const db = require("../models");
const DataSet = db.dataset;
const Language = db.language;
const Translation = db.translation;
const Sentence = db.sentence;
const xml2js = require('xml2js');


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
            let translation_not_created = 0
            let translation_created = 0
            let total_records = 0
            Promise.all(body[0].tu.map(async element => {
                let original_sentence = await Sentence.findOrCreate({
                    where: {
                        sentence: element.tuv[0].seg[0],
                        languageId: original_language.idlanguage
                    }
                })
                let translated_sentence = await Sentence.findOrCreate({
                    where: { 
                        sentence: element.tuv[1].seg[0],
                        languageId: translated_language.idlanguage
                    }
                })
                let [translation, created] = await Translation.findOrCreate({
                    where: {
                        original: original_sentence[0].idsentence,
                        translated: translated_sentence[0].idsentence,
                        translator: req.userId,
                        dataset_id: req.body.id
                    }
                })
                if (translation == null){
                    translation_not_created = translation_not_created + 1
                }
                if (created) {
                    translation_created = translation_created + 1
                }
                total_records = total_records + 1 
            })).then( () => {                
                res.status(200).send({
                    translation_created: translation_created,
                    translation_not_created: translation_not_created,
                    total_records: total_records
                })
            }).catch( () => {
                res.status(500).send({message: 'error during dataset loading'})
            })
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