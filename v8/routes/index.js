let express = require("express");
let router = express.Router();
let User = require("../models/user");
let passport = require("passport");

//Landing page
router.get("/", function(req, res){
    res.render("landing");
});


// ========================
// AUTH ROUTES
// Show register form
router.get("/register", function(req, res){
    res.render("register");
});

router.post("/register", function(req, res){
    let newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if (err){
            console.log(err); 
            return res.render("register");
        } 
        passport.authenticate("local")(req, res, function(){
             res.redirect("/restaurant");   
        });
    });
});

// Show log in form
router.get("/login", function(req, res){
    res. render("login");
});

router.post(
    "/login", 
    // Middleware: authentication
    passport.authenticate(
        "local", 
        {successRedirect: "/restaurant", failureRedirect: "/login"}
    ), 
    // Callback
    function(req, res){
});

// Logout route
router.get("/logout", function(req, res){
    req.logout();
    res.redirect("/restaurant");
});
// ========================

module.exports = router;