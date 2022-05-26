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