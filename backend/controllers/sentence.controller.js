const db = require("../models");
const Sentence = db.sentence;
const Translation = db.translation;


exports.allSentences = async (req, res) => {
    let sentences = await Sentence.findAll({
        attributes: ['idsentence', 'sentence', 'languageId']
    })
    if (!sentences) {
        return res.status(404).send({ message: "Sentences not found." });
    }
    res.status(200).send(sentences)
};

exports.getSentenceFromID = async (req, res) => {
    let sentence = await Sentence.findByPk(req.params.idSentence)
    if (!sentence) {
        return res.status(404).send({ message: "Sentence not found." });
    }        
    res.status(200).send(sentence)
}

exports.getSentenceFromLanguageToTranslate = async (req, res) => {
    if(req.params.fromLanguage === req.params.toLanguage){        
        res.status(200).send([])
    } else {
        if(req.params.fromLanguage === 'null'){
            res.status(400).send([])
        } else if(req.params.toLanguage === 'null'){
            let sentences = await Sentence.findAll({
                where: {
                    languageId: { [db.Sequelize.Op.eq]: req.params.fromLanguage }
                }
            })
            res.status(200).send(sentences)
        } else {
            let sentences = await Sentence.findAll({
                where: {
                    languageId: { [db.Sequelize.Op.eq]: req.params.fromLanguage }
                }
            })
            if (!sentences) {
                return res.status(404).send({ message: "Sentences not found." });
            }
            let translations_done_to_req_toLanguage_param = await Translation.findAll({
                include: ['TranslatedSentence'],
                where: {
                    '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.toLanguage }
                }
            })
            let array_id_done_to_req_toLanguage_param = translations_done_to_req_toLanguage_param.map(translation => translation.original)
            let translations_done_from_req_toLanguage_to_req_fromLanguage = await Translation.findAll({
                include: ['TranslatedSentence', 'OriginalSentence'],
                where: {
                    '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.fromLanguage },
                    '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.toLanguage }
                }
            })
            let array_id_done_from_req_toLanguage_to_req_fromLanguage = translations_done_from_req_toLanguage_to_req_fromLanguage.map(translation => translation.translated)
            sentences = sentences
                .filter(sentence => !array_id_done_to_req_toLanguage_param.includes(sentence.idsentence))
                .filter(sentence => !array_id_done_from_req_toLanguage_to_req_fromLanguage.includes(sentence.idsentence))
            res.status(200).send(sentences)
        }
    }
}