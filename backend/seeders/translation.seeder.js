const db = require("../models");

const Translation = db.translation;

/* creation basic users */
module.exports = {
    createTranslations : async () => {  
        await Translation.create({
            id: 1,
            original: 2,
            translated: 1,
            translator: 1
        });
    }
}