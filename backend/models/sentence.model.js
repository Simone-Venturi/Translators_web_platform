module.exports = (sequelize, Sequelize) => {
    const Sentence = sequelize.define("sentences", {
      idsentence: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      sentence: {
        type: Sequelize.STRING
      } 
    });
    return Sentence;
};