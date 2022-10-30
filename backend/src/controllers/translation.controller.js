const db = require("../db/models");
const Translation = db.translation;
const Sentence = db.sentence;

exports.allTranslations = (req, res) => {
    Translation.findAll({
        attributes: ['id', 'average_score', 'n_scores'],
        include: ['OriginalSentence','TranslatedSentence']
    }).then( translations => {        
        if (!translations) {
            return res.status(404).send({ message: "Sentences not found." });
        }

        res.status(200).send(translations)
    })
}

exports.createTranslation = async (req, res) => {
    try {        
        const sentence = await Sentence.create({
            sentence: req.body.translationText,
            languageId: req.body.idLanguage
        })
        if(!sentence){
            return res.status(404).send({ message: "Sentence not created." });
        }
        const translation = await Translation.create({
            original: req.body.idSentence,
            translated: sentence.idsentence,
            translator: req.userId
        })
        if(!translation){
            return res.status(404).send({ message: "Translation not created." });
        }
        return res.status(200).send(translation);
    } catch (e){
        console.log(e)
        return res.status(500).send({error: "Error during creation"})
    }
}

exports.allTranslationsNotReviewdByUser = async (req, res) => {
    try {
        let all_translations = await Translation.findAll({
            attributes: ['id', 'average_score', 'n_scores'],
            include: ['OriginalSentence','TranslatedSentence', 'Reviews'],            
            where: {
                [db.Sequelize.Op.or]: [
                    {
                        '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.fromLanguage },                
                        '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.toLanguage }
                    },
                    {                        
                        '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.toLanguage },                
                        '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.fromLanguage },
                    }
                ]
            }
        })        
        let translations_reviewed = await Translation.findAll({
            attributes: ['id', 'average_score', 'n_scores'],
            include: ['OriginalSentence','TranslatedSentence', 'Reviews'],            
            where: {
                '$Reviews.translator$': { [db.Sequelize.Op.eq]: req.userId },
                [db.Sequelize.Op.or]: [
                    {
                        '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.fromLanguage },                
                        '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.toLanguage }
                    },
                    {                        
                        '$OriginalSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.toLanguage },                
                        '$TranslatedSentence.languageId$' : { [db.Sequelize.Op.eq]: req.params.fromLanguage },
                    }
                ]
            }
        })
        let array_id_reviews = translations_reviewed.map(review => review.id)
        all_translations = all_translations.filter(translation => !array_id_reviews.includes(translation.id))
        res.status(200).send(all_translations)
    } catch(e){
        return res.status(404).send({ message: "Translations not found." });
    }
}