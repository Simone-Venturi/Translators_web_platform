module.exports = {
    runSeeders: () => {
        require("./role.seeder").createRoles()
            .then( () => require("./user.seeder").createUsers())
            .then( () => require("./language.seeder").createLanguages()
                .then( () =>require("./translator_translate_language.seeder").createTranslatorTranslateLanguages())
                .then( () => require("./sentence.seeder").createSentences())
                    .then(() => require("./translation.seeder").createTranslations()
                        .then( () => require("./review.seeder").createReviews()
            )))
    }
}