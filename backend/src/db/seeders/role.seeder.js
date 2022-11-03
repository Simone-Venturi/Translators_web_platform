const db = require("../models");

const Role = db.role;

/* creation basic roles */
module.exports = {
    createRoles: async () => {
        await Role.create({
            id: 1,
            name: "translator",
            role_translator: true,
            role_data_scientist: false,
            role_admin: false
        });
    
        await Role.create({
            id: 2,
            name: "data scientist",
            role_translator: false,
            role_data_scientist: true,
            role_admin: false
        });
    
        await Role.create({
            id: 3,
            name: "admin",
            role_translator: true,
            role_data_scientist: true,
            role_admin: true
        });        
        console.log("Roles created")
    },    
    createTestRoles: async () => {
        await Role.create({
            id: 1,
            name: "translator",
            role_translator: true,
            role_data_scientist: false,
            role_admin: false
        });
    
        await Role.create({
            id: 2,
            name: "data scientist",
            role_translator: false,
            role_data_scientist: true,
            role_admin: false
        });
    
        await Role.create({
            id: 3,
            name: "admin",
            role_translator: true,
            role_data_scientist: true,
            role_admin: true
        });
    }
}