const express = require("express");
const router = express.Router({});
const User =  require("../models/user.js")
router.get("/signup", (req, res)=>{
    res.render("../views/users/signup.ejs");
})

router.post("/signup", async(req, res)=>{
    try{let {username, email, password} = req.body;
    const newUser = new User({email, username});
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);
    req.flash("success", "Welcome to WanderLust!");
    res.redirect("/listing");}
    catch(err){
        req.flash("error", "Username already exists");
        res.redirect("/signup");
    }
})

module.exports = router;