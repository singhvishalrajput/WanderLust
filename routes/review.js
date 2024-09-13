const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js")
const Listing  = require("../models/listing.js")
const Review  = require("../models/review.js")
const {isLoggedIn, validateReview} = require("../middleware.js");


const reviewController = require("../controllers/reviews.js");


//Reviews
//Post route
router.post("/", isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

module.exports = router;