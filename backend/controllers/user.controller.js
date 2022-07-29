const db = require("../models");
const Translation = db.translation;
const Review = db.review;

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  exports.translatorBoard = (req, res) => {
    res.status(200).send("Translator Content.");
  };
  exports.datascientistBoard = (req, res) => {
    res.status(200).send("Data Scientist Content.");
  };
  exports.statistics = async (req, res) => {
    try {
      let n_translation = await Translation.count({
        where: {
          translator: req.userId,
          is_generated_from_alignment: false
        }
      })
      let n_alignment = await Translation.count({
        where: {
          translator: req.userId,
          is_generated_from_alignment: true
        },
        distinct: true,
        col: 'parallel_text_id'
      })
      let n_review = await Review.count({
        where: {
          translator: req.userId
        }
      })
      let all_translations = await Translation.findAll({
        where: {
          translator: req.userId,
          n_scores: { [db.Sequelize.Op.gt]: 0 }
        }
      })
      //raw averages
      let accumulator_review_all_translations = all_translations
        .map(translation => translation.average_score)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      let mean_review_all_translations = all_translations.length == 0 ? 'nd' : accumulator_review_all_translations / all_translations.length
      
      let translations_not_from_alignment = all_translations.filter(translation => translation.is_generated_from_alignment == false)
      let accumulator_review_translations_not_from_alignment = translations_not_from_alignment
        .map(translation => translation.average_score)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      let mean_review_translations_not_from_alignment = translations_not_from_alignment.length == 0 ? 'nd' : accumulator_review_translations_not_from_alignment / translations_not_from_alignment.length
      
      let translations_from_alignment = all_translations.filter(translation => translation.is_generated_from_alignment == true)
      let accumulator_review_translations_from_alignment = translations_from_alignment
        .map(translation => translation.average_score)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      let mean_review_translations_from_alignment = translations_from_alignment.length == 0 ? 'nd' : accumulator_review_translations_from_alignment / translations_from_alignment.length

      // weighted averages
      let weighted_accumulator_review_all_translations = all_translations
        .reduce((previousValue, currentValue) => previousValue + currentValue.average_score*currentValue.n_scores, 0);
      let weighted_counter_review_all_translations = all_translations
        .map(translation => translation.n_scores)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      let weighted_average_review_all_translations = all_translations.length == 0 ? 'nd' : weighted_accumulator_review_all_translations / weighted_counter_review_all_translations
      
      let weighted_accumulator_review_translations_not_from_alignment = translations_not_from_alignment
        .reduce((previousValue, currentValue) => previousValue + currentValue.average_score*currentValue.n_scores, 0);
      let weighted_counter_review_translations_not_from_alignment = translations_not_from_alignment
        .map(translation => translation.n_scores)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      let weighted_average_review_translations_not_from_alignment = translations_not_from_alignment.length == 0 ? 'nd' : weighted_accumulator_review_translations_not_from_alignment / weighted_counter_review_translations_not_from_alignment
      
      let weighted_accumulator_review_translations_from_alignment = translations_from_alignment
        .reduce((previousValue, currentValue) => previousValue + currentValue.average_score*currentValue.n_scores, 0);
      let weighted_counter_review_translations_from_alignment = translations_from_alignment
        .map(translation => translation.n_scores)
        .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
      let weighted_average_review_translations_from_alignment = translations_from_alignment.length == 0 ? 'nd' : weighted_accumulator_review_translations_from_alignment / weighted_counter_review_translations_from_alignment
    
      res.status(200).send({
        translations: n_translation,
        alignments: n_alignment,
        reviews: n_review,
        mean_review_all_translations: mean_review_all_translations,
        mean_review_translations_not_from_alignment: mean_review_translations_not_from_alignment,
        mean_review_translations_from_alignment: mean_review_translations_from_alignment,
        weighted_average_review_all_translations: weighted_average_review_all_translations,
        weighted_average_review_translations_not_from_alignment: weighted_average_review_translations_not_from_alignment,
        weighted_average_review_translations_from_alignment: weighted_average_review_translations_from_alignment
      });
    } catch (e){
      res.sendStatus(500)
    }
  };

  exports.chart = async (req, res) => {
    let date1month = new Date()
    date1month.setMonth(date1month.getMonth() - 1)
    try {
      let translations = await Translation.findAll({
        attributes: [
          [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count'],
          [db.Sequelize.fn('date_trunc', 'week', db.Sequelize.col('createdAt')), 'createdAtWeek'],
        ],
        where: {
          translator: req.userId,
          createdAt: {[db.Sequelize.Op.gte]: date1month}
        },
        group: [db.Sequelize.fn('date_trunc', 'week', db.Sequelize.col('createdAt')), 'createdAtWeek']
      })
      let reviews = await Review.findAll({
        attributes: [
          [db.Sequelize.fn('COUNT', db.Sequelize.col('id')), 'count'],
          [db.Sequelize.fn('date_trunc', 'week', db.Sequelize.col('createdAt')), 'createdAtWeek'],
        ],
        where: {
          translator: req.userId,
          createdAt: {[db.Sequelize.Op.gte]: date1month}
        },
        group: [db.Sequelize.fn('date_trunc', 'week', db.Sequelize.col('createdAt')), 'createdAtWeek']
      })
      res.status(200).send({
        translations: translations,
        reviews: reviews
      })
    } catch(e){
      res.sendStatus(500)
    }

  }