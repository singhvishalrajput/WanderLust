const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js")
const Listing  = require("../models/listing.js")
const Review  = require("../models/review.js")
const {listingSchema, reviewSchema} = require("../schema.js")




//Validate listing
const validateListing = (req, res, next) => {
    let { error }= listingSchema.validate(req.body);
    if (error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

//Index Route.
router.get("/", wrapAsync(async (req, res)=>{

    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{ allListings });

}))

//Create new route
router.get("/new", (req, res)=>{
    res.render("./listings/new.ejs")
})

//show route
router.get("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;

    const listing = await Listing.findById(id);
    const Allreviews  = await Review.find({});
    
    res.render("./listings/show.ejs", { listing, Allreviews })
}))

//Create Route
router.post("/", validateListing, wrapAsync(async (req, res, next)=>{
        let newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listing")
        
}))

//Edit route
router.get("/:id/edit", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing})
}))

//Update
router.put("/:id", validateListing, wrapAsync(async(req, res)=>{

    let {id} = req.params;
    
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listing");
}))

//Delete Route
router.delete("/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
}))




module.exports = router;