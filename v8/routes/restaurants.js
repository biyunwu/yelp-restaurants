let express = require("express");
let router = express.Router();
let Restaurant = require("../models/restaurant");


//restaurants route. Page for dispalying all avaiable restaurants' info
router.get("/", function(req, res){
    Restaurant.find({}, function(err, foundRestaurants){
        err? console.log("Something wrong with the database 1") : res.render("restaurant/index", {restaurants: foundRestaurants});
    });
});

//Receive new data and update restaurants' array, then display all restaurants info
router.post("/", function(req, res){
    // let newRestaurant = {name: req.body.name, image: req.body.image};
    // restaurants.push(newRestaurant);
    // console.log(req.body); => { name: '123', image: '456' }
    Restaurant.create(req.body, function(err, createdRestaurant){
        err? console.log("Something wrong with the database 2") : res.redirect("/restaurant");
    });
});

//Page for adding new restaurant's info
router.get("/new", function(req, res){
    res.render("restaurant/new");
});

// Show route. To display a specific restaurant's detailed info
router.get("/:id", function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        err? console.log("Something wrong with the database 3") : res.render("restaurant/show", {restaurant: foundRestaurant});
    });
});

module.exports = router;