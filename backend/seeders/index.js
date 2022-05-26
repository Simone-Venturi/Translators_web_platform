module.exports = {
    runSeeders: () => {
        require("./role.seeder").createRoles()
            .then( () => require("./user.seeder").createUsers())
            .then( () => require("./language.seeder").createLanguages()
                .then( () => require("./sentence.seeder").createSentences()
                    .then(() => require("./translation.seeder").createTranslations()
                        .then( () => require("./review.seeder").createReviews()
            ))))
    }
}