const redisConfig = require("../config/redis.config.js");
const Bull = require('bull');
const datasetProcess = require("../processes/dataset.process");

const datasetLoadQueue = new Bull('dataset-translations-queue', {
    redis: { 
        port: redisConfig.PORT,
        host: redisConfig.HOST,
        password: redisConfig.PASSWORD 
    }
});
datasetLoadQueue.process(concurrency= 12, datasetProcess.bulkInsert);
datasetLoadQueue.on('completed', function (job, result) {
    console.log('COMPLETED')
    console.log(result)
});

exports.bulkInsert = (dataChunk, original_language, translated_language, translator, dataset) => {
    datasetLoadQueue.add({
        data: dataChunk,
        original_language: original_language,                    
        translated_language: translated_language,
        translator: translator,
        dataset_id: dataset
    });
}