const db = require("../models");

const Translation = db.translation;

/* creation basic users */
module.exports = {
    createTranslations : async () => {  
        await Translation.create({
            original: 2,
            translated: 1,
            translator: 1
        });
    }
}