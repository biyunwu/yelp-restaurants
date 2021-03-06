let express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    Restaurant    = require("./models/restaurant"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    seedDB        = require("./seeds");
    
let restaurantRoutes = require("./routes/restaurants"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");
    


// Use express middle-ware to serve public files.
app.use(express.static("public"));
// Use body-parser to fetch incoming data in req.body
app.use(bodyParser.urlencoded({ extended: true}));
// Set DB. mongoose.connect("mongodb://localhost/database_name");
mongoose.connect("mongodb://localhost/restaurant");

app.set("view engine", "ejs");
// Initiallize DB
seedDB();

// Passport configuration
app.use(require("express-session")({
    secret: "Reviews for Chinese restaurants in NYC",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Middleware for checking if any user is logged in.
app.use(function(req, res, next){
    res.locals.currUser = req.user;
    next();
});

app.use("/", indexRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/restaurant/:id/comments", commentRoutes);


// // Handle unknown routes
// app.get("*", function(req, res){
//     res.send("Page Not Found!");
// });

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Restaurants NYC started!!!");
});