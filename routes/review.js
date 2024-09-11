const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const Listing  = require("../models/listing.js")
const Review  = require("../models/review.js")
const {isLoggedIn, validateReview} = require("../middleware.js");


//Reviews
//Post route
router.post("/", isLoggedIn, validateReview, wrapAsync(async(req, res)=>{
    let listing = await Listing.findById(req.params.id);

    let newReview = new Review(req.body.review)
    newReview.author = req.user._id;
    console.log(newReview);
    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();
    req.flash("success", "New Review Created!");
    console.log("new review saved");
    res.redirect(`/listing/${listing._id}`);

}));

module.exports = router;