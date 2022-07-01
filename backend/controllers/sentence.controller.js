const { translation } = require("../models");
const db = require("../models");
const Sentence = db.sentence;
const Translation = db.translation;


exports.allSentences = (req, res) => {
    Sentence.findAll({
        attributes: ['idsentence', 'sentence', 'languageId']
    }).then( sentences => {
        if (!sentences) {
            return res.status(404).send({ message: "Sentences not found." });
        }
        res.status(200).send(sentences)
    });
};

exports.getSentenceFromID = (req, res) => {
    Sentence.findByPk(req.params.idSentence)
        .then( sentence => {
            if (!sentence) {
                return res.status(404).send({ message: "Sentence not found." });
            }        
            res.status(200).send(sentence)
        })
}

exports.getSentenceFromLanguageToTranslate = (req, res) => {
    if(req.params.fromLanguage === req.params.toLanguage){        
        res.status(200).send([])
    } else {
        if(req.params.fromLanguage === 'null'){
            res.status(400).send([])
        } else if(req.params.toLanguage === 'null'){
            Sentence.findAll({
                where: {
                    languageId: { [db.Sequelize.Op.eq]: req.params.fromLanguage }
                }
            }).then((sentences) => {                    
                res.status(200).send(sentences)
            })
        } else {
            Sentence.findAll({
                where: {
                    languageId: { [db.Sequelize.Op.eq]: req.params.fromLanguage }
                }
            }).then((sentences) => {
                if (!sentences) {
                    return res.status(404).send({ message: "Sentences not found." });
                }
                Translation.findAll({
                    include: ['TranslatedSentence'],
                    where: {
                        '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.toLanguage }
                    }
                }).then((translations) => {
                    if (!translations) {
                        return res.status(404).send({ message: "Translations not found." });
                    }
                    let array_id = translations.map(translation => translation.original)
                    sentences = sentences.filter(sentence => !array_id.includes(sentence.idsentence))
                    res.status(200).send(sentences)
                })
            })
        }
    }
}