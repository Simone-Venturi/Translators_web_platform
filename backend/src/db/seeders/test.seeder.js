module.exports = {
    dataScientistTestSeeds: async () => {
        await require("./role.seeder").createTestRoles()
        await require("./user.seeder").createTestUsers()
        await require("./language.seeder").createLanguages()
    },
    translatorTestSeeds: async () => {
        await require("./role.seeder").createTestRoles()
        await require("./user.seeder").createTestUsers()
        await require("./language.seeder").createLanguages()
        await require("./sentence.seeder").createTestSentences()
        await require("./translation.seeder").createTestTranslations()
        await require("./parallel_text.seeder").createTestParallelTexts()
    }
}