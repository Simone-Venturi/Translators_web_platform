const db = require("../models");

const Sentence = db.sentence;

module.exports = {
    createSentences : async () => {
        await Sentence.create({
            sentence: "你好",
            languageId: 541
        });
        await Sentence.create({
            sentence: "Hello.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Olá.",
            languageId: 385
        });
        await Sentence.create({
            sentence: "Hola.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "Happy birthday!",
            languageId: 130
        });
        await Sentence.create({
            sentence: "¡Feliz cumpleaños!",
            languageId: 133
        });
        await Sentence.create({
            sentence: "I do not undestand.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "No entiendo.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "I am pleased to meet you.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Encantado de conocerte.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "Pilar is 25 years old.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Pilar tiene 25 años.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "She is studying medicine in Tarragona and has lots of friends.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Estudia medicina en Tarragona y tiene muchos amigos.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "Pilar is very likable and kind.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Pilar es muy simpática y agradable.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "She is going out with a young man called Javier.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Ella sale con un chico que se llama Javier.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "He is 30 years old and works in Barcelona.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Tiene 30 años y trabaja en Barcelona.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "Javier is an engineer.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "Javier es ingeniero.",
            languageId: 133
        });
        await Sentence.create({
            sentence: "Javier likes going out in the evenings, going to the cinema and meeting friends.",
            languageId: 130
        });
        await Sentence.create({
            sentence: "A Javier le gusta salir por la noche, ir al cine y quedar con sus amigos.",
            languageId: 133
        });
        console.log("Sentences created")
    },
    createTestSentences : async () => {  
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