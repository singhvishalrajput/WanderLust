module.exports.isLoggedIn = (req, res, next)=>{
    console.log(req.user);
    if(!req.isAuthenticated()){
        req.flash("error", "Please login to perform the operation.")
        return res.redirect("/login");

    }
    next();


}