module.exports = {
    runSeeders: async () => {
        await require("./role.seeder").createRoles()
        await require("./user.seeder").createUsers()
        await require("./language.seeder").createLanguages()
    }
}