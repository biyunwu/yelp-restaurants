let express = require("express"),
    router = express.Router({mergeParams: true}),
    Restaurant = require("../models/restaurant"),
    Comment = require("../models/comment"),
    middlewareObj = require("../middleware");

// Show comment page
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        err? console.log("Something wrong with the database 4") : res.render("comments/new", {restaurant: foundRestaurant});
    });
});

// Create new comment
router.post("/", middlewareObj.isLoggedIn, function(req, res){
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
                    // Write data to DBs
                    createdComment.author.id = req.user._id;
                    createdComment.author.username = req.user.username;
                    createdComment.save();
                    foundRestaurant.comments.push(createdComment); 
                    foundRestaurant.save();
                }
            });
            res.redirect("/restaurant/" + req.params.id);
        }
    });
});

// Edit route
router.get("/:comment_id/edit", middlewareObj.checkCommentOwnership, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant) {
        if(err){
            console.log("Error 9", err);
            res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if(err){
                    console.log("Error 10", err);
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {restaurant: foundRestaurant, comment: foundComment});
                }
            });
        }
    });
});

// Update route
router.put("/:comment_id/", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, foundComment){
        if(err){
            console.log("Error 11", err);
            res.redirect("back");
        } else {
            res.redirect("/restaurant/" + req.params.id);
        }
    });
});

//Destroy route
router.delete("/:comment_id/", middlewareObj.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log("Error 12", err);
            res.redirect("back");
        } else {
            res.redirect("/restaurant/" + req.params.id);
        }
    });
});

module.exports = router;

