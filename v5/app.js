let express    = require("express"),
    app        = express(),
    bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    Campground = require("./models/campground"),
    Comment    = require("./models/comment"),
    // User       = require("./models/user");
    seedDB     = require("./seeds");
    


// Use express middle-ware to serve public files.
app.use(express.static("public"));
// Use body-parser to fetch incoming data in req.body
app.use(bodyParser.urlencoded({ extended: true}));
// Set DB. mongoose.connect("mongodb://localhost/database_name");
mongoose.connect("mongodb://localhost/yelp_camp");

app.set("view engine", "ejs");
// Initiallize DB
seedDB();

//Landing page
app.get("/", function(req, res){
    res.render("landing");
});

//Page for adding new camp info
app.get("/new", function(req, res){
    res.render("campground/new");
});

//Index route. Page for dispalying all avaiable camps' info
app.get("/campground", function(req, res){
    Campground.find({}, function(err, foundCamps){
        err? console.log("Something wrong with the database") : res.render("campground/index", {camps: foundCamps});
    });
});

//Receive new data and update camps array, then display all camp info
app.post("/campground", function(req, res){
    // let newCamp = {name: req.body.name, image: req.body.image};
    // camps.push(newCamp);
    // console.log(req.body); => { name: '123', image: '456' }
    Campground.create(req.body, function(err, createdCamp){
        err? console.log("Something wrong with the database") : res.redirect("/campground");
    });
});

// Show route. To display a specific campground's detailed info
app.get("/campground/:id", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        err? console.log("Something wrong with the database") : res.render("campground/show", {camp: foundCamp});
    });
});

//============================================================
// Comments Routes
app.get("/campground/:id/comments/new", function(req, res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCamp){
        err? console.log("Something wrong with the database") : res.render("comments/new", {camp: foundCamp});
    });
});

app.post("/campground/:id/comments", function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp){
        if (err){
            console.log(err);
            res.render("/campground");
        } else {
            // Add comment to DB
            Comment.create(req.body.comment, function(err, createdComment){
                if (err) {
                    console.log(err);
                } else {
                    // Link DBs
                    foundCamp.comments.push(createdComment); 
                    foundCamp.save();
                }
            });
            res.redirect("/campground/" + req.params.id);
        }
    });
});
//============================================================

// Handle unknown routes
app.get("*", function(req, res){
    res.send("Page Not Found!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp App started!!!");
});
