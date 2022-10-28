module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define("roles", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING
      },
      role_translator: {
        type: Sequelize.BOOLEAN
      },
      role_data_scientist: {
        type: Sequelize.BOOLEAN
      },
      role_admin: {
        type: Sequelize.BOOLEAN
      }
    });
    return Role;
  };