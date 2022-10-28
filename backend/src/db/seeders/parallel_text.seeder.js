const db = require("../models");

const ParallelText = db.parallel_text;

/* creation basic users */
module.exports = {
    createParallelTexts : async () => {  
        await ParallelText.create({
            originalText: "Dream as if you'll live forever. Live as if you'll die today.",
            translatedText: "Sogna come se dovessi vivere per sempre. Vivi come se dovessi morire oggi.",
            originalLanguage: 130,
            translatedLanguage: 215
        });

        await ParallelText.create({
            originalText: "No existe la muerte. La gente solo muere cuando nos olvidamos de ellos.",
            translatedText: "La morte non esiste. Le persone muoiono solo quando ci dimentichiamo di loro.",
            originalLanguage: 133,
            translatedLanguage: 215
        });

        await ParallelText.create({
            originalText: "No soy extraño. Sólo no soy normal.",
            translatedText: "Non sono strano. È solo che non sono normale.",
            originalLanguage: 133,
            translatedLanguage: 215
        });

        await ParallelText.create({
            originalText: "Il mondo uno deve crearselo, deve crearsi i gradini che lo portino su, che lo portino fuori dal pozzo. Uno deve inventarsi la vita affinché possa diventare realtà.",
            translatedText: "El mundo hay que fabricárselo uno mismo, hay que crear peldaños que te suban, que te saquen del pozo. Hay que inventar la vida porque acaba siendo verdad.",
            originalLanguage: 215,
            translatedLanguage: 133
        });
    }
}