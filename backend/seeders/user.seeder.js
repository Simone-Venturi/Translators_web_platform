const db = require("../models");
var bcrypt = require("bcryptjs");

const User = db.user;

/* creation basic users */
module.exports = {
    createUsers : async () => {  
        await User.create({
            id: 1,
            username: "translator",
            email: "translator@simone.it",
            password: bcrypt.hashSync("translator", 8),
            roleId: 1
        });
        
        await User.create({
            id: 2,
            username: "data scientist",
            email: "datascientist@simone.it",
            password: bcrypt.hashSync("data scientist", 8),
            roleId: 2
        });
        
        await User.create({
            id: 3,
            username: "admin",
            email: "admin@simone.it",
            password: bcrypt.hashSync("admin", 8),
            roleId: 3
        });
    }
}