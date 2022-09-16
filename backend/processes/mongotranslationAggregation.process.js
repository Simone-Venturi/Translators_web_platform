const db = require("../models");
const MongoTranslation = db.mongoTranslation;

exports.aggregation = async (job) => {
    return await massiveAgrgegation(job)
}

async function massiveAgrgegation(job){
    let jobResult = {
        recordsMerged: [],
        dataset_id: job.data.dataset_id,
        translator: job.data.translator,
        newRecords: []
    }
    for (let translation of job.data.data) {
        try {
            let documents = await MongoTranslation
                .aggregate([{ $match: { [job.data.original_language]: translation.tuv[0].seg[0]}}])
                .exec()
            const result = documents.reduce((accumulator, current) => Object.assign({}, {...accumulator}, {...current}), {})
            let fields = Object.keys(result).filter(elem => !['_id', 'dataset', 'createdAt', 'updatedAt', '__v'].includes(elem))
            let updaterecord = await MongoTranslation.findOneAndUpdate({_id: result["_id"]}, result, {new:true})
            await updaterecord.save()
            let n_record_deleted = await MongoTranslation.deleteMany({
                [job.data.original_language]: translation.tuv[0].seg[0],
                '_id': {$ne: updaterecord._id}
            })
            let languages = Object.keys(updaterecord._doc).filter(elem => !['_id', 'dataset', 'createdAt', 'updatedAt', '__v'].includes(elem))
            languages.sort()
            if (n_record_deleted.deletedCount >= 1 ){
                jobResult.recordsMerged.push({
                    object: result,
                    languages: languages
                })            
            } else {
                jobResult.newRecords.push({
                    object: result,
                    languages:languages
                })
            }
        } catch(e) {
            console.log(e)
        }
    }
    return jobResult
}