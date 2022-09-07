const db = require("../models")
const Translation = db.translation
const Sentence = db.sentence
const Language = db.language

exports.update = async (job) => {
    const allLanguages = await Language.findAll({
        attributes: ['idlanguage', 'title', 'abbreviation']
    })
    await massiveInsert(job, allLanguages)
    await massiveUpdate(job, allLanguages)
}

async function massiveInsert(job, allLanguages){
    for (let newRecord of job.data.newRecords){
        let sentences = []
        for await (let language of newRecord.languages) {
            let language_id = allLanguages.filter(lang => lang.abbreviation === language.toUpperCase())[0].idlanguage
            const sentence = await Sentence.create({ 
                sentence: newRecord.object[language],
                languageId: language_id
            });
            sentences = [...sentences, sentence]
        }
        await Translation.create({
            original: sentences[0].idsentence,
            translated: sentences[1].idsentence,
            translator: job.data.translator,
            dataset_id: job.data.dataset_id
        })
    }
    return 1
}

async function massiveUpdate(job, allLanguages){
    for (let recordMerged of job.data.recordsMerged){
        let sentences = []
        for await (let language of recordMerged.languages) {
            let language_id = allLanguages.filter(lang => lang.abbreviation === language.toUpperCase())[0].idlanguage
            const [sentence, created] = await Sentence.findOrCreate({            
                where: {
                    sentence: recordMerged.object[language],
                    languageId: language_id
                }
            });
            sentences = [...sentences, sentence]
        }
        for(let i = 0; i < sentences.length; i++) {
            for(let j = i + 1; j < sentences.length; j++){
                await Translation.findOrCreate({
                    where: {
                        original: sentences[i].idsentence,
                        translated: sentences[j].idsentence
                    },
                    defaults: {
                        original: sentences[i].idsentence,
                        translated: sentences[j].idsentence,
                        translator: job.data.translator,
                        dataset_id: job.data.dataset_id
                    }
                })
            }
        }
    }
    return 1
}