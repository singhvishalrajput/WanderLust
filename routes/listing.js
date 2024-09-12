const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing  = require("../models/listing.js")
const Review  = require("../models/review.js")
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")

const listingController = require("../controllers/listings.js");


//Index Route.
router.get("/", wrapAsync(listingController.index))

//Create new route
router.get("/new", isLoggedIn, listingController.renderNewForm)

//show route
router.get("/:id", wrapAsync(listingController.showListing))

//Create Route
router.post("/", validateListing, wrapAsync(listingController.createListing))

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))

//Update
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))

//Delete Route
router.delete("/:id", isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));



module.exports = router;