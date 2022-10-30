const db = require("../models");
var bcrypt = require("bcryptjs");
var sha256 = require('js-sha256');

const User = db.user;

/* creation basic users */
module.exports = {
    createUsers : async () => {  
        await User.create({
            username: "translator",
            email: "translator@simone.it",
            password: sha256(bcrypt.hashSync("translator", 8)),
            roleId: 1
        });
        
        await User.create({
            username: "data scientist",
            email: "datascientist@simone.it",
            password: sha256(bcrypt.hashSync("data scientist", 8)),
            roleId: 2
        });
        
        await User.create({
            username: "admin",
            email: "admin@simone.it",
            password: sha256(bcrypt.hashSync("admin", 8)),
            roleId: 3
        });
    }
}