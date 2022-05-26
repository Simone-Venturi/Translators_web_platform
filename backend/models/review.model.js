module.exports = (sequelize, Sequelize) => {
    const Review = sequelize.define("review", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      translationId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'review_unique'
      },
      translator: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: 'review_unique'
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    },
    {
        uniqueKeys: {
            review_unique: {
                fields: ['translationId', 'translator']
            }
        }
    });
    return Review;
};