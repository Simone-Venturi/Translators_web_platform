const db = require("../db/models");
const ParallelText = db.parallel_text;
const Sentence = db.sentence;
const Translation = db.translation;
const Language = db.language;

exports.allAlignments = async (req, res) => {
    try {
        let parrallelTexts = await ParallelText.findAll({
            attributes: ['id', 'originalText', 'translatedText', 'originalLanguage', 'translatedLanguage']
        })
        if (!parrallelTexts) {
            return res.status(404).send({ message: "ParallelTexts not found." });
        }
        const languages = await Language.findAll({
            attributes: ['idlanguage', 'title', 'abbreviation'],
            include: ['TranslatorTranslateLanguage'],
            where: {
                '$TranslatorTranslateLanguage.id$': { [db.Sequelize.Op.eq]: req.userId }
            }
        })
        if (!languages) {
            return res.status(404).send({ message: "Languages not found." });
        }
        let array_id_language = languages.map(language => language.idlanguage)
        parrallelTexts = parrallelTexts
            .filter(parallel_text => array_id_language.includes(parallel_text.originalLanguage))
            .filter(parallel_text => array_id_language.includes(parallel_text.translatedLanguage))
        return res.status(200).send(parrallelTexts)
    } catch(e) {
        console.log(e)
        return res.status(500).send({error: "error during reading parallel texts"})
    }
}

exports.allAlignmentsAvailable = async (req, res) => {
    try {
        let parrallelTexts = await ParallelText.findAll({
            attributes: ['id', 'originalText', 'translatedText', 'originalLanguage', 'translatedLanguage'],
            include: ['Translations'],
            where: {
                '$Translations.id$': { [db.Sequelize.Op.eq]: null },
            }
        })   
        if (!parrallelTexts) {
            return res.status(404).send({ message: "ParallelTexts not found." });
        }
        const languages = await Language.findAll({
            attributes: ['idlanguage', 'title', 'abbreviation'],
            include: ['TranslatorTranslateLanguage'],
            where: {
                '$TranslatorTranslateLanguage.id$': { [db.Sequelize.Op.eq]: req.userId }
            }
        })
        if (!languages) {
            return res.status(404).send({ message: "Languages not found." });
        }
        let array_id_language = languages.map(language => language.idlanguage)
        parrallelTexts = parrallelTexts
            .filter(parallel_text => array_id_language.includes(parallel_text.originalLanguage))
            .filter(parallel_text => array_id_language.includes(parallel_text.translatedLanguage))
        return res.status(200).send(parrallelTexts)
    } catch(e) {
        console.log(e)
        return res.status(500).send({error: "error during reading parallel texts"})
    }
}

exports.getParallelTextFromID = (req, res) => {
    ParallelText.findByPk(req.params.parallelText)
        .then( parallelText => {
            if (!parallelText) {
                return res.status(404).send({ message: "Prallel Text not found." });
            }        
            res.status(200).send(parallelText)
        })
}

exports.createAlignment = (req, res) => {
    ParallelText.findByPk(req.body.idParallelText)
        .then( parallelText => {
            if (!parallelText) {
                return res.status(404).send({ message: "Prallel Text not found." });
            }
            //create translations
            req.body.translationObjectsArray.forEach(element => {
                Sentence.create({
                    sentence: element.original_sentence,
                    languageId: parallelText.originalLanguage
                }).then( sentenceOriginal => {
                    if(!sentenceOriginal){
                        return res.status(404).send({ message: "SentenceOriginal not created." });
                    }
                    Sentence.create({
                        sentence: element.translated_sentence,
                        languageId: parallelText.translatedLanguage
                    }).then( sentenceTranslated => {
                        if(!sentenceTranslated){
                            return res.status(404).send({ message: "SentenceTranslated not created." });
                        }
                        Translation.create({
                            original: sentenceOriginal.idsentence,
                            translated: sentenceTranslated.idsentence,
                            translator: req.userId,
                            parallel_text_id: parallelText.id,
                            is_generated_from_alignment: true
                        }).then( translation => {
                            if(!translation){
                                return res.status(404).send({ message: "Translation not created." });
                            }
                        })
                    })
                })
            });
            //create sentences without a translation
            req.body.sentenceArrayOriginal.forEach(element => {
                Sentence.create({
                    sentence: element,
                    languageId: parallelText.originalLanguage
                }).then( sentenceTranslated => {
                    if(!sentenceTranslated){
                        return res.status(404).send({ message: "SentenceTranslated not created." });
                    }
                })
            });

            //create sentences translated without a original text
            req.body.sentenceArrayTranslated.forEach(element => {
                Sentence.create({
                    sentence: element,
                    languageId: parallelText.translatedLanguage
                }).then( sentenceTranslated => {
                    if(!sentenceTranslated){
                        return res.status(404).send({ message: "SentenceTranslated not created." });
                    }
                })
            });
            res.sendStatus(200)
        })
}

exports.createParallelText = async (req, res) => {
    try {
        await ParallelText.create({
            originalLanguage: req.body.idLanguageFrom,
            originalText: req.body.originalText,
            translatedLanguage: req.body.idLanguageTo,
            translatedText: req.body.translatedText
        })
        res.sendStatus(200)
    } catch (exception){
        res.sendStatus(500)
    }
}