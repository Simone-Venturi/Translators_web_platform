const db = require("../models");
const Review = db.review;
const Translation = db.translation;

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
                //update Translation element
                Translation.findByPk(rew.translationId, {
                    include: ['Reviews']
                }).then(translation => {
                    translation.getReviews().then( reviews => {
                        let rev_mean_score = reviews
                            .map(single_review_filtered => single_review_filtered.score)
                            .reduce((previousValue, currentValue) => previousValue + currentValue, 0);
                        translation.avarage_score = rev_mean_score / reviews.length
                        translation.n_scores += 1
                        translation.save().then(() => {return res.sendStatus(200)})
                    })
                })
            })
        } else {
            return res.status(404).send({ message: "Review already exist." });
        }
    })
};