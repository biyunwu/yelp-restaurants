let express = require("express"),
    router = express.Router(),
    Restaurant = require("../models/restaurant"),
    middlewareObj = require("../middleware"); // No need to specify the file's name of "index.js"
    


//restaurants route. Page for dispalying all avaiable restaurants' info
router.get("/", function(req, res){
    Restaurant.find({}, function(err, foundRestaurants){
        err? console.log("Error 1", err) : res.render("restaurant/index", {restaurants: foundRestaurants});
    });
});

//Receive new data and update restaurants' array, then display all restaurants info
router.post("/", middlewareObj.isLoggedIn, function(req, res){
    let author = {id: req.user._id, username: req.user.username};
    let newRestaurant = {name: req.body.name, image: req.body.image, description: req.body.description, author: author};
    Restaurant.create(newRestaurant, function(err, createdRestaurant){
        err? console.log("Error 2", err) : res.redirect("/restaurant");
    });
});

//Page for adding new restaurant's info
router.get("/new", middlewareObj.isLoggedIn, function(req, res){
    res.render("restaurant/new");
});

// Show route. To display a specific restaurant's detailed info
router.get("/:id", function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        err? console.log("Error 3", err) : res.render("restaurant/show", {restaurant: foundRestaurant});
    });
});

// Edit route
router.get("/:id/edit", middlewareObj.checkRestaurantOwnership, function(req, res){
    Restaurant.findById(req.params.id, function(err, foundRestaurant){
        err? console.log("Error 4", err) : res.render("restaurant/edit", {restaurant: foundRestaurant});
    });
});

// Update route
router.put("/:id", middlewareObj.checkRestaurantOwnership, function(req, res){
    let updatedDate = req.body.restaurant;
    Restaurant.findByIdAndUpdate(req.params.id, updatedDate, function(err, updatedRestaurant){
        err? console.log("Error 5", err) : res.redirect("/restaurant/" + req.params.id);
    });
});

// Destroy route
router.delete("/:id", middlewareObj.checkRestaurantOwnership, function(req, res){
    Restaurant.findByIdAndRemove(req.params.id, function(err){
        err? console.log("Error 6", err) : res.redirect("/restaurant");
    });
});

module.exports = router;