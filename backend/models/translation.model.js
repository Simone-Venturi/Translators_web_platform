module.exports = (sequelize, Sequelize) => {
    const Translation = sequelize.define("translations", {
      original: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      translated: {
        type: Sequelize.INTEGER,
        primaryKey: true
      }
    });
    return Translation;
};