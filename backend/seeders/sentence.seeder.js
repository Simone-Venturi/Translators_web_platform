const db = require("../models");

const Sentence = db.sentence;

/* creation basic users */
module.exports = {
    createSentences : async () => {  
        await Sentence.create({
            idsentence: 1,
            sentence: "Are you going to translate the rest of the book?",
            languageId: 1
        });
        
        await Sentence.create({
            idsentence: 2,
            sentence: "The water felt delightful.",
            languageId: 1
        });
        
        await Sentence.create({
            idsentence: 3,
            sentence: "L'acqua era deliziosa",
            languageId: 2
        });
    }
}