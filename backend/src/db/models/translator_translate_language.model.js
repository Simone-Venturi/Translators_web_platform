module.exports = (sequelize, Sequelize) => {
    const TranslatorTranslateLanguage = sequelize.define("translators_translate_languages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }
    });
    return TranslatorTranslateLanguage;
};