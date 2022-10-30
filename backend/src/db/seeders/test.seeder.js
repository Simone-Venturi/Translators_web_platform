module.exports = {
    dataScientistTestSeeds: async () => {
        await require("./role.seeder").createRoles()
        await require("./user.seeder").createUsers()
        await require("./language.seeder").createLanguages()
    },
    translatorTestSeeds: async () => {
        await require("./role.seeder").createRoles()
        await require("./user.seeder").createUsers()
        await require("./language.seeder").createLanguages()
        await require("./sentence.seeder").createSentences()
        await require("./translation.seeder").createTranslations()
        await require("./parallel_text.seeder").createParallelTexts()
    }
}