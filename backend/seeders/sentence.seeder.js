const db = require("../models");

const Sentence = db.sentence;

/* creation basic users */
module.exports = {
    createSentences : async () => {  
        await Sentence.create({
            sentence: "Are you going to translate the rest of the book?",
            languageId: 1
        });
        
        await Sentence.create({
            sentence: "The water felt delightful.",
            languageId: 1
        });
        
        await Sentence.create({
            sentence: "L'acqua era deliziosa",
            languageId: 2
        });
    }
}