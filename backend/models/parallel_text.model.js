module.exports = (sequelize, Sequelize) => {
    const ParallelText = sequelize.define("parallel_text", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      originalText: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      translatedText: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      originalLanguage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      translatedLanguage: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
    });
    return ParallelText;
};