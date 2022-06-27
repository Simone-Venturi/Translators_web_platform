const db = require("../models");

const TranslatorTranslateLanguage = db.translator_translate_language;

/* creation basic users */
module.exports = {
    createTranslatorTranslateLanguages : async () => {  
        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 1
        });
        
        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 2
        });

        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 4
        })
        
        await TranslatorTranslateLanguage.create({
            translator: 1,
            language: 5
        })
        
        await TranslatorTranslateLanguage.create({
            translator: 3,
            language: 1
        })
        
        await TranslatorTranslateLanguage.create({
            translator: 3,
            language: 2
        })
        
        await TranslatorTranslateLanguage.create({
            translator: 3,
            language: 4
        })
    }
}