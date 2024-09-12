const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const Listing  = require("../models/listing.js")
const Review  = require("../models/review.js")
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")

const listingController = require("../controllers/listings.js");


//Index Route.
router.get("/", wrapAsync(index))

//Create new route
router.get("/new", isLoggedIn, (req, res)=>{
    res.render("./listings/new.ejs")
})

//show route
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;

    const listing = await Listing.findById(id).populate({path: "reviews", populate: { path: "author"}}).populate("owner");
    
    if(!listing){
        req.flash("error", "Listing you requested for does not exists!");
        res.redirect("/listing")
    }
    console.log(listing);
    res.render("./listings/show.ejs", { listing})
}))

//Create Route
router.post("/", validateListing, wrapAsync(async (req, res, next)=>{
        let newListing = new Listing(req.body.listing);
        newListing.owner = req.user._id;
        await newListing.save();
        req.flash("success", "New Listing Created!");
        res.redirect("/listing");
        
}))

//Edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(async(req, res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you want to update does not exists!");
        res.redirect("/listing")
    }
    res.render("./listings/edit.ejs", {listing})
}))

//Update
router.put("/:id", isLoggedIn, isOwner, validateListing, wrapAsync(async(req, res)=>{

    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}))

//Delete Route
router.delete("/:id", isLoggedIn, isOwner,  wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listing");
}))




module.exports = router;