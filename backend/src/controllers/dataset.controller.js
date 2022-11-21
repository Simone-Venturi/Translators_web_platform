const db = require("../db/models");
const path = require('path');
const fs = require('fs');
const archiver = require('archiver');
var sha256 = require('js-sha256');
const DataSet = db.dataset;
const Language = db.language;
const Translation = db.translation;
const DatasetHasLanguage = db.datasets_have_languages;
const MongoDataset = db.mongoDataset;
const MongoTranslation = db.mongoTranslation;
const xml2js = require('xml2js');
const { bulkInsertMongo } = require("../queues/translation.queue");

exports.allDataSets = async (req, res) => {
    let datasets = await DataSet.findAll()
    if (!datasets) {
        return res.status(404).send({ message: "DataSet not found." });
    }
    return res.status(200).send(datasets)
};

exports.createDataSet = async (req, res) => {
    try {
        let dataset = await DataSet.create({
            name: req.body.name,
            URL: req.body.url
        });
        return res.status(200).send(dataset)
    } catch (e) {
        console.log(e)
        return res.status(500).send({error: "error during creation"})
    }
};

exports.loadDataSet = async (req, res) => {
    try {
        xml2js.parseStringPromise(req.files.file.data.toString()).then(async (result) => {
            const header = result.tmx.header
            const body = result.tmx.body
            const original_language = await Language.findOne({
                where: {
                    abbreviation: header[0].$.srclang.toUpperCase()
                }
            })
            if ( original_language == null ){
                return res.status(404).send({message: 'Original Language not found'})
            }
            const translated_language = await Language.findOne({
                where: {
                    abbreviation: body[0].tu[0].tuv[1].$['xml:lang'].toUpperCase()
                }
            })
            if ( translated_language == null ){
                return res.status(404).send({message: 'Translated Language not found'})
            }
            const dataset = await DataSet.findByPk(req.body.id)
            await DatasetHasLanguage.findOrCreate({            
                where: {
                    dataset: dataset.id,
                    language: original_language.idlanguage
                }
            })
            await DatasetHasLanguage.findOrCreate({            
                where: {
                    dataset: dataset.id,
                    language: translated_language.idlanguage
                }
            })
            MongoDataset.findOne({name: dataset.name}, async (err, mongoDataset) => {
                if(mongoDataset == null) {
                    await MongoDataset.create({
                        name: dataset.name,
                        url: dataset.URL,
                        languages: [original_language.abbreviation, translated_language.abbreviation]
                    })
                } else {
                    mongoDataset.languages.indexOf(original_language.abbreviation) === -1 ? mongoDataset.languages.push(original_language.abbreviation) : 0 ;
                    mongoDataset.languages.indexOf(translated_language.abbreviation) === -1 ? mongoDataset.languages.push(translated_language.abbreviation) : 0 ;
                    mongoDataset.save()
                }
                const chunkSize = 1000;
                for (let i = 0; i < body[0].tu.length; i += chunkSize) {
                    const chunk = body[0].tu.slice(i, i + chunkSize);
                    bulkInsertMongo(chunk, original_language.abbreviation.toLowerCase(), translated_language.abbreviation.toLowerCase(), dataset.name, dataset.id, req.userId)                    
                }             
            })           
            return res.sendStatus(200)
          })
          .catch((err) => {
            return res.status(500).send({message: 'error during dataset parsing'})
          })
    } catch (e) {
        return res.sendStatus(500)
    }
};

exports.checkDataSetSize = async (req, res) => {
    try {
        let datasets = req.body.datasets.map(v => v == null ? "null" : v)
        let languages_permutations = permutations(req.body.languagesTo)
        let total = 0
        for (let i = 0; i<languages_permutations.length; i++){            
            let query = queryBuilder(req.body.languagesTo, datasets, req.body.minReviewScore, req.body.maxReviewScore, req.body.minReview, true, languages_permutations[i])
            const [result, metadata] = await db.sequelize.query(query);
            total += parseInt(result[0].total)
        }
        res.status(200).send({total: total})
    } catch (e){
        console.log(e)
        res.status(404)
    }    
}

exports.downloadDataSet = async (req, res) => {
    try {
        const datasetDb = await DataSet.findAll({
            where: {
                id: {
                    [db.Sequelize.Op.in] : req.body.datasets
                }
            }
        })
        const languages_requested = await Language.findAll({
            where: {
                idlanguage: {
                    [db.Sequelize.Op.in] : req.body.languagesTo
                }
            }
        })
        let datasets = req.body.datasets.map(v => v == null ? "null" : v)
        let languages_permutations = permutations(req.body.languagesTo)
        const dir = path.join(__dirname,'/../../resources/requests/' + sha256(Date.now().toString()))
        const languages_abbreviation_string = languages_requested.map(lang => lang.abbreviation).join('-')
        const datasets_name_string = (req.body.datasets.includes(null) ? 'Translations-' : '') + datasetDb.map(v => v.name).join('-');
        const filename = datasets_name_string+'-langs-'+languages_abbreviation_string+'.zip'
        const out = path.join(__dirname, '/../../resources/zips/'+filename)
        if (!fs.existsSync(dir)){
            fs.mkdirSync(dir);
        }
        const file = fs.createWriteStream(dir+'/langs-'+languages_abbreviation_string+'.txt');
        for (let i = 0; i<languages_permutations.length; i++){            
            let query = queryBuilder(req.body.languagesTo, datasets, req.body.minReviewScore, req.body.maxReviewScore, req.body.minReview, false, languages_permutations[i])
            const [translations, metadata] = await db.sequelize.query(query);
            for(let translation of translations){
                for await (let lang of languages_requested.map(l => l.idlanguage)){
                    file.write(languages_requested.filter(l => l.idlanguage == lang).map(l => l.abbreviation.toLowerCase())[0]+':'+translation[lang]+'\n')
                }
            }
        }
        file.end();
        await zipDirectory(dir,out)
        res.download(out);
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

//https://stackoverflow.com/questions/15641243/need-to-zip-an-entire-directory-using-node-js 
/**
 * @param {String} sourceDir: /some/folder/to/compress
 * @param {String} outPath: /path/to/created.zip
 * @returns {Promise}
 */
function zipDirectory(sourceDir, outPath) {
  const archive = archiver('zip', { zlib: { level: 9 }});
  const stream = fs.createWriteStream(outPath);

  return new Promise((resolve, reject) => {
    archive
      .directory(sourceDir, false)
      .on('error', err => reject(err))
      .pipe(stream)
    ;

    stream.on('close', () => resolve());
    archive.finalize();
  });
}

const permutations = arr => {  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;  return arr.reduce(
    (acc, item, i) => acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map(val => [
            item,...val,
        ])
      ),
    []
  );
};

function queryBuilder(languages_array, datasets_array, score_min = 0, score_max = 5, n_score = 0, isCounter = false, permutation) {
    let doDatasetsContainsNull = datasets_array.filter(v => v == "null" ).length > 0 ? true : false
    let query = "SELECT"
    if(!isCounter){
        for (let l=0; l<languages_array.length; l++){ 
            query += ` s${l}.sentence as "${permutation[l]}"`;
            if(l!= languages_array.length -1){
                query += ","; 
            }
        }
    } else {
        query += " COUNT(*) AS total"
    }
    query += " FROM "

    for (let l=0; l<languages_array.length; l++){ 
        query += "sentences s" + l + ", "; 
    }
    for (let l=0; l<languages_array.length-1; l++){ 
        query += "translations t" + l + ", "; 
    }
    query = query.slice(0, -2) + " \n";
    query += "WHERE ";
    for (let l=0; l<languages_array.length-1; l++){
        if(l != 0){
            query += " AND "
        }
        query += `"s${l}"."languageId" = ${permutation[l]}
            AND s${l}.idsentence = t${l}.original
            AND s${l+1}.idsentence = t${l}.translated
            AND "s${l+1}"."languageId" = ${permutation[l+1]}
        `;
    }
    for (let l=0; l<languages_array.length-1; l++){
        query += `AND t${l}.average_score BETWEEN ${score_min} AND ${score_max} `
    }
    for (let l=0; l<languages_array.length-1; l++){
        query += `AND t${l}.n_scores >= ${n_score} `
    }    
    for (let l=0; l<languages_array.length-1; l++){
        if(doDatasetsContainsNull) {
            query += `AND ( t${l}.dataset_id IN (${datasets_array}) OR t${l}.dataset_id IS NULL) `
        } else {
            query += `AND t${l}.dataset_id IN (${datasets_array}) `
        }
    }
    query += `\n`
    return query
}