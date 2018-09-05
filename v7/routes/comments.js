let express = require("express");
let router = express.Router({mergeParams: true});
let Restaurant = require("../models/restaurant");
let Comment = require("../models/comment");


//============================================================
// Comments Routes
router.get("/new", isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        err? console.log("Something wrong with the database 4") : res.render("comments/new", {restaurant: foundRestaurant});
    });
});

router.post("/", isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        if (err){
            console.log(err);
            res.render("/restaurant");
        } else {
            // Add comment to DB
            Comment.create(req.body.comment, function(err, createdComment){
                if (err) {
                    console.log(err);
                } else {
                    // Link DBs
                    foundRestaurant.comments.push(createdComment); 
                    foundRestaurant.save();
                }
            });
            res.redirect("/restaurant/" + req.params.id);
        }
    });
});
//============================================================

// Middleware
function isLoggedIn(req, res, next){
    req.isAuthenticated()? next() : res.redirect("/login");
}

module.exports = router;