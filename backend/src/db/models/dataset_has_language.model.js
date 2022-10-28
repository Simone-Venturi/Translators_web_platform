module.exports = (sequelize, Sequelize) => {
    const DatasetHasLanguage = sequelize.define("datasets_have_languages", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      }
    });
    return DatasetHasLanguage;
};