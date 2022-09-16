const redisConfig = require("../config/redis.config.js");
const Bull = require('bull');
const mongoTranslationProcess = require("../processes/mongotranslation.process");
const mongoTranslationAggregationProcess = require("../processes/mongotranslationAggregation.process");
const postgresTranslationProcess = require("../processes/postgrestranslation.process");

const mongoTranslationsQueue = new Bull('mongo-translations-queue', {
    redis: { 
        port: redisConfig.PORT,
        host: redisConfig.HOST,
        password: redisConfig.PASSWORD 
    }
});

const mongoTranslationAggregationQueue = new Bull('mongo-translations-aggregation-queue', {
    redis: { 
        port: redisConfig.PORT,
        host: redisConfig.HOST,
        password: redisConfig.PASSWORD 
    }
});

const postgresTranslationQueue = new Bull('postgres-translations-queue', {
    redis: { 
        port: redisConfig.PORT,
        host: redisConfig.HOST,
        password: redisConfig.PASSWORD 
    }
});
mongoTranslationsQueue.process(concurrency=12, mongoTranslationProcess.bulkInsert);
mongoTranslationAggregationQueue.process(concurrency=4, mongoTranslationAggregationProcess.aggregation);
postgresTranslationQueue.process(concurrency=3, postgresTranslationProcess.update);

mongoTranslationsQueue.on('completed', function (job, result) {
    mongoTranslationAggregationQueue.add({
        data: result.data.data,
        original_language: result.data.original_language,
        dataset_name: result.data.dataset_name,
        dataset_id: result.data.dataset_id,
        translator: result.data.translator
    })
});

mongoTranslationAggregationQueue.on('completed', function (job, result) {
    postgresTranslationQueue.add(result)
});

exports.bulkInsertMongo = (dataChunk, original_language, translated_language, dataset_name, dataset_id, translator) => {
    mongoTranslationsQueue.add({
        data: dataChunk,
        original_language: original_language,                    
        translated_language: translated_language,
        dataset_name: dataset_name,
        dataset_id: dataset_id,
        translator: translator
    });
}