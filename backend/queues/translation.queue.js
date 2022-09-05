const redisConfig = require("../config/redis.config.js");
const Bull = require('bull');
const mongoTranslationProcess = require("../processes/mongotranslation.process");

const mongoTranslationsQueue = new Bull('mongo-translations-queue', {
    redis: { 
        port: redisConfig.PORT,
        host: redisConfig.HOST,
        password: redisConfig.PASSWORD 
    }
});
mongoTranslationsQueue.process(concurrency=12, mongoTranslationProcess.bulkInsert);
mongoTranslationsQueue.on('completed', function (job, result) {
});

exports.bulkInsertMongo = (dataChunk, original_language, translated_language, dataset_name) => {
    mongoTranslationsQueue.add({
        data: dataChunk,
        original_language: original_language,                    
        translated_language: translated_language,
        dataset_name: dataset_name
    });
}