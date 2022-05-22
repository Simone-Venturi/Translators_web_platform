const db = require("../models");

const Language = db.language;

/* creation basic users */
module.exports = {
    createLanguages : () => {  
        Language.create({
            idlanguage: 1,
            title: "English",
            abbreviation: "EN"
        });
        
        Language.create({
            idlanguage: 2,
            title: "Italian",
            abbreviation: "IT"
        });
        
        Language.create({
            idlanguage: 3,
            title: "Chinese",
            abbreviation: "ZH"
        });
    }
}