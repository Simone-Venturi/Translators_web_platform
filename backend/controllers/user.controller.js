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
      res.status(200).send({
        translations: n_translation,
        alignments: n_alignment,
        reviews: n_review,
      });
    } catch (e){
      res.sendStatus(500)
    }
  };