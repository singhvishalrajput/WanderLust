const Listing = require("../models/listing");



module.exports.index = async (req, res)=>{

    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{ allListings });

}

module.exports.renderNewForm = (req, res)=>{
    res.render("./listings/new.ejs")
}

module.exports.showListing = async (req, res)=>{
    let {id} = req.params;

    const listing = await Listing.findById(id).populate({path: "reviews", populate: { path: "author"}}).populate("owner");
    
    if(!listing){
        req.flash("error", "Listing you requested for does not exists!");
        res.redirect("/listing")
    }
    console.log(listing);
    res.render("./listings/show.ejs", { listing})
}

module.exports.createListing = async (req, res, next)=>{
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listing");
    
}

module.exports.renderEditForm = async(req, res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    if(!listing){
        req.flash("error", "Listing you want to update does not exists!");
        res.redirect("/listing")
    }
    res.render("./listings/edit.ejs", {listing})
}

module.exports.updateListing = async(req, res)=>{

    let {id} = req.params;
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    req.flash("success", "Listing Updated!");
    res.redirect(`/listing/${id}`);
}


module.exports.destroyListing = async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted!");
    res.redirect("/listing");
}