const db = require("../models");
const Sentence = db.sentence;


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