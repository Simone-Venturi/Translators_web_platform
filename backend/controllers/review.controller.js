const db = require("../models");
const Review = db.review;

exports.createReview = (req, res) => {
    Review.findOne({
        where: {
            translationId: req.body.idTranslation,
            translator: req.userId,
        }
    }).then( review => {
        if (!review){
            Review.create({
                translationId: req.body.idTranslation,
                translator: req.userId,
                score: req.body.rateReview
            }).then( rew => {
                if(!rew){
                    return res.status(404).send({ message: "Review not created." });
                }
                return res.status(200).send(rew);
            })
        } else {
            return res.status(404).send({ message: "Review already exist." });
        }
    })
};