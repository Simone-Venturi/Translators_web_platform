const db = require("../models");

const TranslatorTranslateLanguage = db.translator_translate_language;

module.exports = {
    createTranslatorTranslateLanguages : async () => {  
        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 130
        });
        
        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 133
        });

        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 215
        })

        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 385
        })

        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 541
        })
        console.log("TranslatorTranslateLanguages created")
    }
}