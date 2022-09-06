const db = require("../models");
const MongoTranslation = db.mongoTranslation;

exports.bulkInsert = async (job) => {
    let result = {
        translation_created: 0,
        translation_not_created: 0,
        total_records: 0
    }
    await massiveInsert(job, result)
    return {
        translation_created: result.translation_created,
        translation_not_created: result.translation_not_created,
        total_records: result.total_records,
        data: job.data
    }
}

async function massiveInsert(job, result){
    for (let translation of job.data.data) {
        try {
            await MongoTranslation.create({
                dataset: job.data.dataset_name,
                [job.data.original_language]: translation.tuv[0].seg[0],
                [job.data.translated_language]: translation.tuv[1].seg[0]
            })
            result.translation_created += 1
        } catch(e) {
            result.translation_not_created += 1
        } finally {
            result.total_records += 1 
        }
    }
}