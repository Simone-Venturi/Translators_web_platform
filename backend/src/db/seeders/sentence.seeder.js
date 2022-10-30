const db = require("../models");

const Sentence = db.sentence;

/* creation basic users */
module.exports = {
    createSentences : async () => {  
        await Sentence.create({
            sentence: "Are you going to translate the rest of the book?",
            languageId: 130
        });
        
        await Sentence.create({
            sentence: "The water felt delightful.",
            languageId: 130
        });
        
        await Sentence.create({
            sentence: "L'acqua era deliziosa",
            languageId: 215
        });

        await Sentence.create({
            sentence: "Il pane è caldo",
            languageId: 215
        });

        await Sentence.create({
            sentence: "Oggi ho pranzato alle 13:00",
            languageId: 215
        });

        await Sentence.create({
            sentence: "Today I had lunch at 1:00 PM",
            languageId: 130
        });

        await Sentence.create({
            sentence: "你好",
            languageId: 541
        });

        await Sentence.create({
            sentence: "Hello",
            languageId: 130
        });

        await Sentence.create({
            sentence: "Ciao",
            languageId: 215
        });
        
        await Sentence.create({
            sentence: "Olá",
            languageId: 385
        });

        await Sentence.create({
            sentence: "Hola",
            languageId: 133
        });
    }
}