let Restaurant = require("../models/restaurant"),
    Comment    = require("../models/comment");

// const middlewareObj = {
//     // Administrator's username
//     admin: "administrator",
    
//     isLoggedIn: function(req, res, next){
//         if(req.isAuthenticated()){
//             return next();
//         } else {
//             // The flash code comes before redirection. 
//             // Once the redirecting succeeds, the falsh message shows up.
//             // Parameters: key and value
//             req.flash("error", "Please log in to continue!"); 
//             res.redirect("/login");
//             // return false;
//         }
//     },
                
//     checkRestaurantOwnership: function(req, res, next){
//         middlewareObj.checkOwnership(req, res, next, Restaurant, req.params.id);
//     },
                
//     checkCommentOwnership: function(req, res, next){
//         middlewareObj.checkOwnership(req, res, next, Comment, req.params.comment_id);   
//     },
    
//     checkOwnership: function(req, res, next, databaseName, dataIdToBeFound){
//         if(req.isAuthenticated()){
//             databaseName.findById(dataIdToBeFound, function(err, foundData){
//                 if(err || !foundData){
//                     console.log("Error 7", err);
//                     req.flash("error", "Not found!");
//                     res.redirect("back");
//                 } else {
//                     // In the following code, id is an object while _id is a string, even though they have the same output through console.log()
//                     // So == or === is not applicable here.
//                     if (foundData.author.id.equals(req.user._id) || req.user.username === middlewareObj.admin){
//                         next();
//                     } else {
//                         req.flash("error", "No permission!");
//                         res.redirect("/restaurant/" + req.params.id);
//                     }
//                 }
//             });
//         } else {
//             req.flash("error", "Please log in to continue!"); 
//             res.redirect("/login");
//         }
//     }
// };

// Admin's username
const admin = "administrator";

function isLoggedIn(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            // The flash code comes before redirection. 
            // Once the redirecting succeeds, the falsh message shows up.
            // Parameters: key and value
            req.flash("error", "Please log in to continue!"); 
            res.redirect("/login");
            // return false;
        }
}
    
function checkOwnership(req, res, next, databaseName, dataIdToBeFound){
        if(req.isAuthenticated()){
            databaseName.findById(dataIdToBeFound, function(err, foundData){
                if(err || !foundData){
                    console.log("Error 7", err);
                    req.flash("error", "Not found!");
                    res.redirect("back");
                } else {
                    // In the following code, id is an object while _id is a string, even though they have the same output through console.log()
                    // So == or === is not applicable here.
                    if (foundData.author.id.equals(req.user._id) || req.user.username === admin){
                        next();
                    } else {
                        req.flash("error", "No permission!");
                        res.redirect("/restaurant/" + req.params.id);
                    }
                }
            });
        } else {
            req.flash("error", "Please log in to continue!"); 
            res.redirect("/login");
        }
}
    
function checkRestaurantOwnership(req, res, next){
        checkOwnership(req, res, next, Restaurant, req.params.id);
}
                
function checkCommentOwnership(req, res, next){
        checkOwnership(req, res, next, Comment, req.params.comment_id);   
}

const middlewareObj = {
    admin,
    isLoggedIn,
    checkRestaurantOwnership,
    checkCommentOwnership,
    checkOwnership
};
    
// const middlewareObj = {
//     isLoggedIn: function(req, res, next){
//                     if(req.isAuthenticated()){
//                         return next();
//                     } else {
//                         // The flash code comes before redirection. 
//                         // Once the redirecting succeeds, the falsh message shows up.
//                         // Parameters: key and value
//                         req.flash("error", "Please log in to continue!"); 
//                         res.redirect("/login");
//                     }
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
//                                 if(foundRestaurant.author.id.equals(req.user._id)){
//                                     next();
//                                 } else {
//                                     req.flash("error", "No permission!");
//                                     res.redirect("back");
//                                 }
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
//                                 if(foundComment.author.id.equals(req.user._id)){
//                                     next();
//                                 } else {
//                                     req.flash("error", "No permission!");
//                                     res.redirect("back");
//                                 }
//                             }
//                         });
//                     } else {
//                         res.redirect("/login");
//                     }
//                 }
// };

module.exports = middlewareObj;

