module.exports = (sequelize, Sequelize) => {
    const Sentence = sequelize.define("sentences", {
      idsentence: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      sentence: {
        type: Sequelize.TEXT
      },
      languageId: {
        type: Sequelize.INTEGER
      }
    },{
      uniqueKeys: {
          sentence_unique: {
              fields: ['sentence', 'languageId']
          }
      }
    });
    return Sentence;
};