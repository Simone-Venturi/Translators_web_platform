const config = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.language = require("../models/language.model.js")(sequelize, Sequelize);
db.sentence = require("../models/sentence.model.js")(sequelize, Sequelize);
db.translation = require("../models/translation.model.js")(sequelize, Sequelize);
db.review = require("../models/review.model.js")(sequelize, Sequelize);

db.role.hasMany(db.user);
db.user.belongsTo(db.role);

db.user.belongsToMany(db.language, {
  through: 'translators_translate_languages',
  foreignKey: "translator",
  otherKey: "language"
});
db.language.belongsToMany(db.user, {
  through: 'translators_translate_languages',
  foreignKey: "language",
  otherKey: "translator"
});

db.language.hasMany(db.sentence, {
  foreignKey: 'languageId'
});
db.sentence.belongsTo(db.language, {
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
db.translation.hasMany(db.review);
db.review.belongsTo(db.translation);
module.exports = db;