module.exports = {
    runSeeders: () => {
        console.log("Creation ROLE")
        require("./role.seeder").createRoles();
        console.log("Creation USER")
        require("./user.seeder").createUsers();
        console.log("Creation LANGUAGE")
        require("./language.seeder").createLanguages();
        console.log("Creation SENTENCE")
        require("./sentence.seeder").createSentences();
        console.log("Creation TRANSLATION")
        require("./translation.seeder").createTranslations();
        console.log("END Creation")
    }
}