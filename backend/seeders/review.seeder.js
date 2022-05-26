const db = require("../models");

const Review = db.review;

/* creation basic users */
module.exports = {
    createReviews : async () => {  
        await Review.create({
            id: 1,
            translationId: 1,
            translator: 1,
            score: 4
        });
        await Review.create({
            id: 2,
            translationId: 1,
            translator: 3,
            score: 4
        });
    }
}