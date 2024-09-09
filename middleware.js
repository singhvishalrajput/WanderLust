module.exports.isLoggedIn = (req, res, next)=>{
    // console.log(req.path, "....", req.originalUrl);
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
        req.loccals.redirectUrl = req.session.redirectUrl;
    }
    next();
}