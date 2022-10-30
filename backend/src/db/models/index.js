const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || 'development';
const postgresConfig = require(__dirname + '/../config/postgres.config')[env];
const mongoConfig = require(__dirname + '/../config/mongo.config')[env];

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+mongoConfig.HOST+':'+mongoConfig.PORT+'/'+mongoConfig.DB+'')
  .catch(err => {
      console.log('error connecting to MongoDB');
      process.exit();
  });

const db = {};

let sequelize;
if (postgresConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[postgresConfig.use_env_variable], postgresConfig);
} else {
  sequelize = new Sequelize(postgresConfig.database, postgresConfig.username, postgresConfig.password, postgresConfig);
}
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.role = require("./role.model.js")(sequelize, Sequelize);
db.language = require("./language.model.js")(sequelize, Sequelize);
db.translator_translate_language = require("./translator_translate_language.model.js")(sequelize, Sequelize);
db.sentence = require("./sentence.model.js")(sequelize, Sequelize);
db.translation = require("./translation.model.js")(sequelize, Sequelize);
db.review = require("./review.model.js")(sequelize, Sequelize);
db.parallel_text = require("./parallel_text.model.js")(sequelize, Sequelize);
db.dataset = require("./dataset.model.js")(sequelize, Sequelize);
db.datasets_have_languages = require("./dataset_has_language.model.js")(sequelize, Sequelize);
db.mongoConnection = mongoose;
db.mongoDataset = require("./mongodataset.model")(mongoose)
db.mongoTranslation = require("./mongotranslation.model")(mongoose)

db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.user.belongsToMany(db.language, {
  through: db.translator_translate_language,
  as: 'TranslatorTranslateLanguage',
  foreignKey: "translator",
  otherKey: "language"
});
db.language.belongsToMany(db.user, {
  through: db.translator_translate_language,
  as: 'TranslatorTranslateLanguage',
  foreignKey: "language",
  otherKey: "translator"
});

db.language.hasMany(db.sentence, {
  foreignKey: 'languageId'
});
db.sentence.belongsTo(db.language, {
  as: 'Language',
  foreignKey: 'languageId'
});

db.sentence.hasMany(db.translation, {
  foreignKey: 'original'
});
db.translation.belongsTo(db.sentence, {
  as: 'OriginalSentence',
  foreignKey: 'original'
});
db.sentence.hasMany(db.translation, {
  foreignKey: 'translated'
});
db.translation.belongsTo(db.sentence, {
  as: 'TranslatedSentence',
  foreignKey: 'translated'
});
db.user.hasMany(db.translation, {
  foreignKey: 'translator'
});
db.translation.belongsTo(db.user, {
  foreignKey: 'translator'
});

db.user.hasMany(db.review, {
  foreignKey: 'translator'
});
db.review.belongsTo(db.user, {
  foreignKey: 'translator'
});
db.translation.hasMany(db.review, {
  as: 'Reviews'
});
db.review.belongsTo(db.translation);

db.parallel_text.belongsTo(db.language, {
  as: 'OriginalLanguage',
  foreignKey: 'originalLanguage'
});
db.language.hasMany(db.parallel_text, {
  foreignKey: 'originalLanguage'
});
db.parallel_text.belongsTo(db.language, {
  as: 'TranslatedLanguage',
  foreignKey: 'translatedLanguage'
});
db.language.hasMany(db.parallel_text, {
  foreignKey: 'translatedLanguage'
});
db.parallel_text.hasOne(db.translation, {
  as: 'Translations',
  foreignKey: 'parallel_text_id'
});
db.translation.belongsTo(db.parallel_text, {
  as: 'ParallelText',
  foreignKey: 'parallel_text_id'
});

db.dataset.hasMany(db.translation, {
  as: 'Translations',
  foreignKey: 'dataset_id'
});
db.translation.belongsTo(db.dataset, {
  as: 'DataSet',
  foreignKey: 'dataset_id'
});

db.dataset.belongsToMany(db.language, {
  through: db.datasets_have_languages,
  as: 'DatasetHasLanguage',
  foreignKey: "dataset",
  otherKey: "language"
});
db.language.belongsToMany(db.dataset, {
  through: db.datasets_have_languages,
  as: 'DatasetHasLanguage',
  foreignKey: "language",
  otherKey: "dataset"
});

module.exports = db;