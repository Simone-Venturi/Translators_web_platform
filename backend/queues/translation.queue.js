const redisConfig = require("../config/redis.config.js");
const Bull = require('bull');
const mongoTranslationProcess = require("../processes/mongotranslation.process");
const mongoTranslationAggregationProcess = require("../processes/mongotranslationAggregation.process");

const mongoTranslationsQueue = new Bull('mongo-translations-queue', {
    redis: { 
        port: redisConfig.PORT,
        host: redisConfig.HOST,
        password: redisConfig.PASSWORD 
    }
});

const datasetAggregationQueue = new Bull('mongo-translations-aggregation-queue', {
    redis: { 
        port: redisConfig.PORT,
        host: redisConfig.HOST,
        password: redisConfig.PASSWORD 
    }
});
mongoTranslationsQueue.process(concurrency=12, mongoTranslationProcess.bulkInsert);
datasetAggregationQueue.process(concurrency=3, mongoTranslationAggregationProcess.aggregation);

mongoTranslationsQueue.on('completed', function (job, result) {
    datasetAggregationQueue.add({
        data: result.data.data,
        original_language: result.data.original_language,
        dataset_name: result.data.dataset_name
    })
});

exports.bulkInsertMongo = (dataChunk, original_language, translated_language, dataset_name) => {
    mongoTranslationsQueue.add({
        data: dataChunk,
        original_language: original_language,                    
        translated_language: translated_language,
        dataset_name: dataset_name
    });
}