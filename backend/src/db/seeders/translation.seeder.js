const db = require("../models");

const Translation = db.translation;

module.exports = {
    createTranslations : async () => {  
        await Translation.create({
            original: 2,
            translated: 1,
            translator: 1
        });
        await Translation.create({
            original: 2,
            translated: 3,
            translator: 1
        });
        await Translation.create({
            original: 2,
            translated: 4,
            translator: 1
        });
        await Translation.create({
            original: 3,
            translated: 4,
            translator: 1
        });
        await Translation.create({
            original: 5,
            translated: 6,
            translator: 1
        });
        await Translation.create({
            original: 7,
            translated: 8,
            translator: 1
        });
        await Translation.create({
            original: 9,
            translated: 10,
            translator: 1
        });
        await Translation.create({
            original: 11,
            translated: 12,
            translator: 1
        });
        await Translation.create({
            original: 13,
            translated: 14,
            translator: 1
        });
        await Translation.create({
            original: 15,
            translated: 16,
            translator: 1
        });
        await Translation.create({
            original: 17,
            translated: 18,
            translator: 1
        });
        await Translation.create({
            original: 19,
            translated: 20,
            translator: 1
        });
        await Translation.create({
            original: 21,
            translated: 22,
            translator: 1
        });
        await Translation.create({
            original: 23,
            translated: 24,
            translator: 1
        });
        console.log("Translations created")
    },
    createTestTranslations : async () => {  
        await Translation.create({
            original: 2,
            translated: 3,
            translator: 1
        });
        await Translation.create({
            original: 5,
            translated: 6,
            translator: 1
        });
        await Translation.create({
            original: 8,
            translated: 7,
            translator: 1
        });
        await Translation.create({
            original: 8,
            translated: 9,
            translator: 1
        });
        await Translation.create({
            original: 8,
            translated: 10,
            translator: 1
        });
    }
}