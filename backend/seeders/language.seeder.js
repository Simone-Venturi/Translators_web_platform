const db = require("../models");

const Language = db.language;

/* creation basic users */
module.exports = {
    createLanguages : async () => {  
        await Language.create({
            idlanguage: 1,
            title: "English",
            abbreviation: "EN"
        });
        
        await Language.create({
            idlanguage: 2,
            title: "Italian",
            abbreviation: "IT"
        });
        
        await Language.create({
            idlanguage: 3,
            title: "Chinese",
            abbreviation: "ZH"
        });
    }
}