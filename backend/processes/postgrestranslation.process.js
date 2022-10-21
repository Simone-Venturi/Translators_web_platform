const db = require("../models")
const Translation = db.translation
const Sentence = db.sentence
const Language = db.language

exports.update = async (job) => {
    const allLanguages = await Language.findAll({
        attributes: ['idlanguage', 'title', 'abbreviation']
    })
    await massiveInsert(job, allLanguages)
}

async function massiveInsert(job, allLanguages){
    for (let record of job.data.records){
        let sentences = []
        for await (let language of record.languages) {
            let language_id = allLanguages.filter(lang => lang.abbreviation === language.toUpperCase())[0].idlanguage
            const [sentence, created] = await Sentence.findOrCreate({            
                where: {
                    sentence: record.object[language],
                    languageId: language_id
                }
            });
            sentences = [...sentences, sentence]
        }
        for (let i = 0; i < sentences.length; i++) {
            for (let j = i + 1; j < sentences.length; j++){
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