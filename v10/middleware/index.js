let Restaurant = require("../models/restaurant"),
    Comment    = require("../models/comment");
    
function checkOwnership(req, res, next, databaseName, dataIdToBeFound){
    if(req.isAuthenticated()){
        databaseName.findById(dataIdToBeFound, function(err, foundData){
            if(err){
                console.log("Error 7", err);
                res.redirect("back");
            } else {
                // In the following code, id is an object while _id is a string, even though they have the same output through console.log()
                // So == or === is not applicable here.
                foundData.author.id.equals(req.user._id)? next() : res.redirect("back");
            }
        });
    } else {
        res.redirect("/login");
    }
}

const middlewareObj = {
    isLoggedIn: function(req, res, next){
        req.isAuthenticated()? next() : res.redirect("/login");
    },
                
    checkRestaurantOwnership: function(req, res, next){
        checkOwnership(req, res, next, Restaurant, req.params.id);
    },
                
    checkCommentOwnership: function(req, res, next){
        checkOwnership(req, res, next, Comment, req.params.comment_id);   
    }
};

module.exports = middlewareObj;

// const middlewareObj = {
//     isLoggedIn: function(req, res, next){
//                     req.isAuthenticated()? next() : res.redirect("/login");
//                 },
                
//     checkRestaurantOwnership: function(req, res, next){
//                     if(req.isAuthenticated()){
//                         Restaurant.findById(req.params.id, function(err, foundRestaurant){
//                             if(err){
//                                 console.log("Error 7", err);
//                                 res.redirect("back");
//                             } else {
//                                 // In the following code, id is an object while _id is a string, even though they have the same output through console.log()
//                                 // So == or === is not applicable here.
//                                 foundRestaurant.author.id.equals(req.user._id)? next() : res.redirect("back");
//                             }
//                         });
//                     } else {
//                         res.redirect("/login");
//                     }
//                 },
                
//     checkCommentOwnership: function(req, res, next){
//                     if(req.isAuthenticated()){
//                         Comment.findById(req.params.comment_id, function(err, foundComment){
//                             if(err){
//                                 console.log("Error 8", err);
//                                 res.redirect("back");
//                             } else {
//                                 foundComment.author.id.equals(req.user._id)? next() : res.redirect("back");
//                             }
//                         });
//                     } else {
//                         res.redirect("/login");
//                     }
//                 }
// };