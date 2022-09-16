const db = require("../models");
const path = require("path");

const Language = db.language;

/* creation basic users */
module.exports = {
    createLanguages : () => {  
        const fs = require('fs');
        let rawdata = fs.readFileSync(path.resolve(__dirname,'../resources/languages.json'));
        let languages = JSON.parse(rawdata);
        languages.forEach(async language => {
            await Language.create({
                title: language.itemLabel.charAt(0).toUpperCase() + language.itemLabel.slice(1),
                abbreviation: language.lang_code.toUpperCase()
            })
        })
    }
}