const db = require("../models");
const ParallelText = db.parallel_text;
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