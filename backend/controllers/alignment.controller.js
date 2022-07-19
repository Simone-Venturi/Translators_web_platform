const db = require("../models");
const ParallelText = db.parallel_text;
const Sentence = db.sentence;
const Translation = db.translation;
const Language = db.language;

exports.allAlignments = (req, res) => {
    ParallelText.findAll({
        attributes: ['id', 'originalText', 'translatedText', 'originalLanguage', 'translatedLanguage']
    }).then( parrallelTexts => {        
        if (!parrallelTexts) {
            return res.status(404).send({ message: "ParallelTexts not found." });
        }
        Language.findAll({
            attributes: ['idlanguage', 'title', 'abbreviation'],
            include: ['TranslatorTranslateLanguage'],
            where: {
                '$TranslatorTranslateLanguage.id$': { [db.Sequelize.Op.eq]: req.userId }
            }
        }).then( languages => {
            if (!languages) {
                return res.status(404).send({ message: "Languages not found." });
            }
            let array_id_language = languages.map(language => language.idlanguage)
            parrallelTexts = parrallelTexts
                .filter(parallel_text => array_id_language.includes(parallel_text.originalLanguage))
                .filter(parallel_text => array_id_language.includes(parallel_text.translatedLanguage))
            res.status(200).send(parrallelTexts)
        });
    })
}

exports.getParallelTextFromID = (req, res) => {
    ParallelText.findByPk(req.params.parallelText)
        .then( parallelText => {
            if (!parallelText) {
                return res.status(404).send({ message: "Prallel Text not found." });
            }        
            res.status(200).send(parallelText)
        })
}

exports.createAlignment = (req, res) => {
    console.log(req.body)
    ParallelText.findByPk(req.body.idParallelText)
        .then( parallelText => {
            if (!parallelText) {
                return res.status(404).send({ message: "Prallel Text not found." });
            }
            //create translations
            req.body.translationObjectsArray.forEach(element => {
                Sentence.create({
                    sentence: element.original_sentence,
                    languageId: parallelText.originalLanguage
                }).then( sentenceOriginal => {
                    if(!sentenceOriginal){
                        return res.status(404).send({ message: "SentenceOriginal not created." });
                    }
                    Sentence.create({
                        sentence: element.translated_sentence,
                        languageId: parallelText.translatedLanguage
                    }).then( sentenceTranslated => {
                        if(!sentenceTranslated){
                            return res.status(404).send({ message: "SentenceTranslated not created." });
                        }
                        Translation.create({
                            original: sentenceOriginal.idsentence,
                            translated: sentenceTranslated.idsentence,
                            translator: req.userId
                        }).then( translation => {
                            if(!translation){
                                return res.status(404).send({ message: "Translation not created." });
                            }
                        })
                    })
                })
            });
            //create sentences without a translation
            req.body.sentenceArray.forEach(element => {
                Sentence.create({
                    sentence: element,
                    languageId: parallelText.originalLanguage
                }).then( sentenceTranslated => {
                    if(!sentenceTranslated){
                        return res.status(404).send({ message: "SentenceTranslated not created." });
                    }
                })
            });
            res.sendStatus(200)
        })
}