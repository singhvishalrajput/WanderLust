const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing  = require("../models/listing.js")
const Review  = require("../models/review.js")
const {listingSchema, reviewSchema} = require("../schema.js")




//Validate Review
const validateReview = (req, res, next) => {
    let { error }= reviewSchema.validate(req.body);
    if (error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

//Reviews
//Post route
router.post("/", validateReview, wrapAsync(async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    console.log("new review saved");
    res.redirect(`/listing/${listing._id}`);

}));

module.exports = router;