const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing  = require("../models/listing.js")
const Review  = require("../models/review.js")
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")

const listingController = require("../controllers/listings.js");
const multer = require('multer');
const upload = multer({ dest : 'uploads/'}) // It will create a folder automatically.


//Index route and Create route
router
    .route("/")
    .get( wrapAsync(listingController.index))
    // .post( validateListing, wrapAsync(listingController.createListing))
    .post( upload.single('listing[image.url]'), (req, res)=>{
        res.send(req.file);
    })



//Create new route
router.get("/new", isLoggedIn, listingController.renderNewForm)

//show route, update route and delete route
router
    .route("/:id")
    .get( wrapAsync(listingController.showListing))
    .put( isLoggedIn, isOwner, validateListing, wrapAsync(listingController.updateListing))
    .delete( isLoggedIn, isOwner,  wrapAsync(listingController.destroyListing));



//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm))

module.exports = router;