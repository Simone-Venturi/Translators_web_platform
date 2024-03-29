module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("languages", {
      idlanguage: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING
      },
      abbreviation: {
        type: Sequelize.STRING
      }
    });
    return Language;
};