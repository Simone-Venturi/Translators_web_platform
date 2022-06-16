const db = require("../models");
const Translation = db.translation;
const Sentence = db.sentence;


exports.createTranslation = (req, res) => {
    Sentence.create({
        sentence: req.body.translationText,
        languageId: req.body.idLanguage
    }).then( sentence => {
        if(!sentence){
            return res.status(404).send({ message: "Sentence not created." });
        }
        Translation.create({
            original: req.body.idSentence,
            translated: sentence.idsentence,
            translator: req.userId
        }).then( translation => {
            if(!translation){
                return res.status(404).send({ message: "Translation not created." });
            }
            return res.status(200).send(translation);
        })
    })
};