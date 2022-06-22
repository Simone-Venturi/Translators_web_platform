const db = require("../models");

const Review = db.review;

/* creation basic users */
module.exports = {
    createReviews : async () => {  
        await Review.create({
            translationId: 1,
            translator: 1,
            score: 4
        });
        await Review.create({
            translationId: 1,
            translator: 2,
            score: 4
        });
    }
}