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
    res.render("./listings/show.ejs", { listing })
}))

//Create Route
app.post("/listing", wrapAsync(async (req, res, next)=>{
        if(!req.body.listing){
            throw new ExpressError(400, "Send valid data for listing.")
        }
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
app.put("/listing/:id", wrapAsync(async(req, res)=>{
    let {id} = req.params;
    if(!req.body.listing){
        throw new ExpressError(400, "Send valid data for listing.")
    }
    await Listing.findByIdAndUpdate(id, {...req.body.listing});
    res.redirect("/listing");
}))

//Delete Route
app.delete("/listing/:id", wrapAsync(async (req, res)=>{
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listing");
}))

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
