const db = require("../models");

const ParallelText = db.parallel_text;

/* creation basic users */
module.exports = {
    createParallelTexts : async () => {  
        await ParallelText.create({
            originalText: "Dream as if you'll live forever. Live as if you'll die today.",
            translatedText: "Sogna come se dovessi vivere per sempre. Vivi come se dovessi morire oggi.",
            originalLanguage: 1,
            translatedLanguage: 2
        });
    }
}