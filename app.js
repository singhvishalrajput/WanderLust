const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing  = require("./models/listing.js")
const path = require("path");
// const Listing = require("./models/listing.js");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js")
const ExpressError = require("./utils/ExpressError.js")
const {listingSchema, reviewSchema} = require("./schema.js")
const Review  = require("./models/review.js")



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/Public")))

const MONGO_URL = "mongodb://127.0.0.1:27017/WanderLust";

main().
then(()=>{
    console.log("connected to db.")
}).catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(MONGO_URL)
}

app.get("/", (req,res)=>{
    res.send("working.")
})

const validateListing = (req, res, next) => {
    let { error }= listingSchema.validate(req.body);
    if (error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

const validateReview = (req, res, next) => {
    let { error }= reviewSchema.validate(req.body);
    if (error){
        let errMsg = error.details.map((el)=> el.message).join(",");
        throw new ExpressError(400, error);
    }else{
        next();
    }
}

//Index Route.
app.get("/listing", wrapAsync(async (req, res)=>{

    const allListings = await Listing.find({});
    res.render("./listings/index.ejs",{ allListings });

}))

//Create new route
app.get("/listing/new", (req, res)=>{
    res.render("./listings/new.ejs")
})

//show route
app.get("/listing/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;

    const listing = await Listing.findById(id);
    const Allreviews  = await Review.find({});
    
    res.render("./listings/show.ejs", { listing, Allreviews })
}))

//Create Route
app.post("/listing", validateListing, wrapAsync(async (req, res, next)=>{
        let newListing = new Listing(req.body.listing);
        await newListing.save();
        res.redirect("/listing")
        
}))

//Edit route
app.get("/listing/:id/edit", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    const listing =  await Listing.findById(id);
    res.render("./listings/edit.ejs", {listing})
}))

//Update
app.put("/listing/:id", validateListing, wrapAsync(async(req, res)=>{

    let {id} = req.params;
    
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listing");
}))

//Delete Route
app.delete("/listing/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
}))

//Reviews
//Post route
app.post("/listing/:id/reviews", validateReview, wrapAsync(async(req, res)=>{
    let listing = await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review)

    listing.reviews.push(newReview);

    await newReview.save();
    await listing.save();

    console.log("new review saved");
    res.redirect(`/listing/${listing._id}`);

}));


// app.get("/testListing", async (req, res)=>{
//     let sampleListing = new  Listing({
//         title: "My new Villa",
//         description: "By the beach",
//         price: 1200,
//         location: "Calangate, Goa",
//         country: "India"
//     })

//     await sampleListing.save();
//     console.log("sample saved");
//     res.send("successful Testing");
// })

app.all("*", (req, res, next)=>{
    next(new ExpressError(404, "Page Not Found!"));
})

app.use((err, req, res, next)=>{
    let {statusCode=500, message="Something went wrong!"} = err;
    res.status(statusCode).render("error.ejs", { message })
    // res.status(statusCode).send(message);
})

app.listen(8080, (req,res)=>{
    console.log("Server is listening to port 8080.")

})
