const db = require("../models");

const MongoDataset = db.mongoDataset;
const MongoTranslation = db.mongoTranslation;

const createCollections = async () => {
    try{
        await MongoDataset.createCollection()
        await MongoTranslation.createCollection()
        console.log('Collection Created')
    } catch(exception) {
        console.log(exception)
    } finally {        
        process.exit();
    }
    
}

createCollections();