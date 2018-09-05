let express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    Restaurant    = require("./models/restaurant"),
    Comment       = require("./models/comment"),
    // User       = require("./models/user"),
    seedDB        = require("./seeds");
    


// Use express middle-ware to serve public files.
app.use(express.static("public"));
// Use body-parser to fetch incoming data in req.body
app.use(bodyParser.urlencoded({ extended: true}));
// Set DB. mongoose.connect("mongodb://localhost/database_name");
mongoose.connect("mongodb://localhost/restaurant");

app.set("view engine", "ejs");
// Initiallize DB
seedDB();

//Landing page
app.get("/", function(req, res){
    res.render("landing");
});

//Page for adding new restaurant's info
app.get("/new", function(req, res){
    res.render("restaurant/new");
});

//Index route. Page for dispalying all avaiable restaurants' info
app.get("/restaurant", function(req, res){
    Restaurant.find({}, function(err, foundRestaurants){
        err? console.log("Something wrong with the database") : res.render("restaurant/index", {restaurants: foundRestaurants});
    });
});

//Receive new data and update restaurants' array, then display all restaurants info
app.post("/restaurant", function(req, res){
    // let newRestaurant = {name: req.body.name, image: req.body.image};
    // restaurants.push(newRestaurant);
    // console.log(req.body); => { name: '123', image: '456' }
    Restaurant.create(req.body, function(err, createdRestaurant){
        err? console.log("Something wrong with the database") : res.redirect("/restaurant");
    });
});

// Show route. To display a specific restaurant's detailed info
app.get("/restaurant/:id", function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        err? console.log("Something wrong with the database") : res.render("restaurant/show", {restaurant: foundRestaurant});
    });
});

//============================================================
// Comments Routes
app.get("/restaurant/:id/comments/new", function(req, res){
    Restaurant.findById(req.params.id).populate("comments").exec(function(err, foundRestaurant){
        err? console.log("Something wrong with the database") : res.render("comments/new", {restaurant: foundRestaurant});
    });
});

app.post("/restaurant/:id/comments", function(req, res){
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

// Handle unknown routes
app.get("*", function(req, res){
    res.send("Page Not Found!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Restaurants NYC started!!!");
});
