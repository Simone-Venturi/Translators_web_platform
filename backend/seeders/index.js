require("./role.seeder").createRoles()
    .then( () => require("./user.seeder").createUsers())
    .then( () => require("./language.seeder").createLanguages())