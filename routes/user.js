const express = require("express");
const router = express.Router({});
const User =  require("../models/user.js")
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");


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

router.get("/login", (req, res)=>{
    res.render("../views/users/login.ejs");
})

router.post("/login", passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), async(req, res)=>{
    req.flash("success","welcome back to WanderLust!");
    res.redirect("/listing");
})

router.get("/logout",  (req, res, next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success", "You are successfully logout!");
        res.redirect("/listing");
    })
})


module.exports = router;