const Listing = require("./models/listing");
const ExpressError = require("./utils/ExpressError.js");
const {listingSchema, reviewSchema} = require("./schema.js");



module.exports.isLoggedIn = (req, res, next)=>{
    
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error", "Please login to perform the operation.")
        return res.redirect("/login");

    }
    next();
}

module.exports.saveRedirectUrl = (req, res, next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async (req, res, next)=>{
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(! (res.locals.currUser  && listing.owner._id.equals(res.locals.currUser._id))){
            req.flash("error", "You are not the owner of this listing!")
            return res.redirect(`/listing/${id}`);
    }
    next();
}

module.exports.validateListing = (req, res, next) => {
    let { error }= listingSchema.validate(req.body);
    if (error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

module.exports.validateReview = (req, res, next) => {
    let { error }= reviewSchema.validate(req.body);
    if (error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}
