module.exports = (sequelize, Sequelize) => {
    const DataSet = sequelize.define("dataset", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      URL: {
        type: Sequelize.TEXT,
        allowNull: false
      }
    });
    return DataSet;
};