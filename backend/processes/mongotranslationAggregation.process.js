const db = require("../models");
const MongoTranslation = db.mongoTranslation;

exports.aggregation = async (job) => {
    await massiveAgrgegation(job)
    return 1
}

async function massiveAgrgegation(job){
    for (let translation of job.data.data) {
        try {
            let documents = await MongoTranslation.find({[job.data.original_language]: translation.tuv[0].seg[0]})
            let latest_record = documents[0]
            const result = Object.assign(...documents)
            let fields = Object.keys(result).filter(elem => elem != '_id').filter(elem => elem != 'createdAt')
            for(let field of fields){
                latest_record[field] = result[field]
            } 
            let updaterecord = await MongoTranslation.findOneAndUpdate({_id: latest_record}, latest_record, {new:true})
            updaterecord.save()
            await MongoTranslation.deleteMany({
                [job.data.original_language]: translation.tuv[0].seg[0],
                '_id': {$ne: updaterecord._id}
            })
        } catch(e) {
        }
    }
    return 1
}