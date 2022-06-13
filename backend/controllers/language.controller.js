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
};