const db = require("../db/models");
const Language = db.language;
const TranslatorTranslateLanguage = db.translator_translate_language;


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
        },
        order:[
            ['idlanguage', 'asc']
        ]
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

exports.updateLanguagesKnownByUser = (req, res) => {
    req.body.idsLanguages.map(id => TranslatorTranslateLanguage.upsert({
        translator: req.userId,
        language: id
    }))
    TranslatorTranslateLanguage.destroy({
        attributes: ['id', 'translator', 'language'],
        where: {
            translator: { [db.Sequelize.Op.eq]: req.userId },
            language: {[db.Sequelize.Op.notIn]: req.body.idsLanguages}
        }
    }).then( () => {
        res.sendStatus(200)
    });

}