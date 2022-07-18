const db = require("../models");
const Language = db.language;


exports.allLanguages = (req, res) => {
    Language.findAll({
        attributes: ['idlanguage', 'title', 'abbreviation']
    }).then( languages => {
        if (!languages) {
            return res.status(404).send({ message: "Languages not found." });
        }
        res.status(200).send(languages)
    });
}

exports.allLanguagesKnownByUser = (req, res) => {
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
        languages = languages.map((language) =>  {
            return {
                idlanguage: language.idlanguage,
                title: language.title,
                abbreviation: language.abbreviation
        }});
        res.status(200).send(languages)
    });
}