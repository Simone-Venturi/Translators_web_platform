const db = require("../models");

const MongoDataset = db.mongoDataset;
const MongoTranslation = db.mongoTranslation;

MongoDataset.createCollection().then(function(collection) {
    console.log('Collection is created!');
});
MongoTranslation.createCollection().then(function(collection) {
    console.log('Collection is created!');
});