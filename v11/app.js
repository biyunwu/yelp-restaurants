let express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    mongoose      = require("mongoose"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    Restaurant    = require("./models/restaurant"),
    Comment       = require("./models/comment"),
    User          = require("./models/user"),
    flash         = require("connect-flash"),
    seedDB        = require("./seeds");
    
let restaurantRoutes = require("./routes/restaurants"),
    commentRoutes    = require("./routes/comments"),
    indexRoutes      = require("./routes/index");
    

// Set DB. mongoose.connect("mongodb://localhost/database_name");
mongoose.connect("mongodb://localhost/restaurant");
// Use express middle-ware to serve public files.
app.use(express.static("public"));
// Use body-parser to fetch incoming data in req.body
app.use(bodyParser.urlencoded({ extended: true}));
// Set up view engine
app.set("view engine", "ejs");
// For update and destroy routes
app.use(methodOverride("_method"));
// Flash configuration must come before passport configuration.
app.use(flash());

// Initiallize DB
// seedDB();

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

// Middleware for storing custumized info.
app.use(function(req, res, next){
    // Store user's info
    res.locals.currUser = req.user;
    // Store flash messages
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/", indexRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/restaurant/:id/comments", commentRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Restaurants NYC started!!!");
});