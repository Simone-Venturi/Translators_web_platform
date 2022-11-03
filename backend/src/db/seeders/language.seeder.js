const db = require("../models");
const path = require("path");

const Language = db.language;

module.exports = {
    createLanguages : async () => {  
        const fs = require('fs');
        let rawdata = fs.readFileSync(path.resolve(__dirname,'../../../resources/languages.json'));
        let languages = JSON.parse(rawdata);
        for await (let language of languages){
            await Language.create({
                title: language.itemLabel.charAt(0).toUpperCase() + language.itemLabel.slice(1),
                abbreviation: language.lang_code.toUpperCase()
            })
        }
    }
}