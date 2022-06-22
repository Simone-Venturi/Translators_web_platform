module.exports = (sequelize, Sequelize) => {
    const Translation = sequelize.define("translations", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      original: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'translation_unique'
      },
      translated: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'translation_unique'
      },
      avarage_score: {
        type: Sequelize.FLOAT,
        allowNull: true,
        defaultValue: 0
      },
      n_scores: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0
      }
    }, {
      uniqueKeys: {
          translation_unique: {
              fields: ['original', 'translated']
          }
      }
    });
    return Translation;
};