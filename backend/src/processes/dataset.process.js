const db = require("../models");
const Translation = db.translation;
const Sentence = db.sentence;

exports.bulkInsert = async (job) => {
    let translation_not_created = 0
    let translation_created = 0
    let total_records = 0
    let total_errors = 0
    for (let element of job.data.data) {
        let original_sentence = await Sentence.create({
            where: {
                sentence: element.tuv[0].seg[0],
                languageId: job.data.original_language
            }
        })
        let translated_sentence = await Sentence.create({
            where: { 
                sentence: element.tuv[1].seg[0],
                languageId: job.data.translated_language
            }
        })
        let [translation, created] = await Translation.create({
            where: {
                original: original_sentence[0].idsentence,
                translated: translated_sentence[0].idsentence,
                translator: job.data.translator,
                dataset_id: job.data.dataset_id
            }
        })
        if (translation == null){
            translation_not_created += 1
        }
        if (created) {
            translation_created += 1
        }
            total_records += 1
    }
    return {
        translation_created: translation_created,
        translation_not_created: translation_not_created,
        total_errors: total_errors,
        total_records: total_records
    }
}