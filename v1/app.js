let express = require("express");
let app = express();
let bodyParser = require("body-parser");

app.set("view engine", "ejs");
// Use express middle-ware to serve public files.
app.use(express.static("public"));
// Use body-parser to fetch incoming data in req.body
app.use(bodyParser.urlencoded({ extended: true}));

let camps = [
    {name: "Yellow Stone", image: "https://www.yellowstonenationalparklodges.com/content/uploads/2017/04/madison-campground-1024x768.jpg"},
    {name: "Everest", image: "https://media.gadventures.com/media-server/cache/d1/be/d1bec9a83895567bd5682efe61f52a91.jpg"},
    {name: "Brokeback Mountain", image: "http://images5.fanpop.com/image/photos/31800000/Brokeback-Mountain-Promotional-Stills-brokeback-mountain-31873908-500-337.jpg"},
    {name: "Rocky Mountain", image: "https://i.pinimg.com/originals/5d/18/35/5d18352cfe7bb75aed878532051ba98b.jpg"},
    {name: "Everest", image: "https://media.gadventures.com/media-server/cache/d1/be/d1bec9a83895567bd5682efe61f52a91.jpg"},
    {name: "Rocky Mountain", image: "https://i.pinimg.com/originals/5d/18/35/5d18352cfe7bb75aed878532051ba98b.jpg"},
    {name: "Brokeback Mountain", image: "http://images5.fanpop.com/image/photos/31800000/Brokeback-Mountain-Promotional-Stills-brokeback-mountain-31873908-500-337.jpg"},
    {name: "Yellow Stone", image: "https://www.yellowstonenationalparklodges.com/content/uploads/2017/04/madison-campground-1024x768.jpg"},
    {name: "Rocky Mountain", image: "https://i.pinimg.com/originals/5d/18/35/5d18352cfe7bb75aed878532051ba98b.jpg"},
    {name: "Everest", image: "https://media.gadventures.com/media-server/cache/d1/be/d1bec9a83895567bd5682efe61f52a91.jpg"},
    {name: "Brokeback Mountain", image: "http://images5.fanpop.com/image/photos/31800000/Brokeback-Mountain-Promotional-Stills-brokeback-mountain-31873908-500-337.jpg"},
    {name: "Yellow Stone", image: "https://www.yellowstonenationalparklodges.com/content/uploads/2017/04/madison-campground-1024x768.jpg"},
    {name: "Rocky Mountain", image: "https://i.pinimg.com/originals/5d/18/35/5d18352cfe7bb75aed878532051ba98b.jpg"},
    {name: "Everest", image: "https://media.gadventures.com/media-server/cache/d1/be/d1bec9a83895567bd5682efe61f52a91.jpg"},
    {name: "Rocky Mountain", image: "https://i.pinimg.com/originals/5d/18/35/5d18352cfe7bb75aed878532051ba98b.jpg"},
    {name: "Brokeback Mountain", image: "http://images5.fanpop.com/image/photos/31800000/Brokeback-Mountain-Promotional-Stills-brokeback-mountain-31873908-500-337.jpg"},
    {name: "Yellow Stone", image: "https://www.yellowstonenationalparklodges.com/content/uploads/2017/04/madison-campground-1024x768.jpg"}
    
];

//Landing page
app.get("/", function(req, res){
    res.render("landing");
});

//Page for adding new camp info
app.get("/new", function(req, res){
    res.render("new");
});

//Page for dispalying all avaiable camps' info
app.get("/campground", function(req, res){
    res.render("campground", {camps: camps});
});

//Receive new data and update camps array, then display all camp info
app.post("/campground", function(req, res){
    // let newCamp = {name: req.body.name, image: req.body.image};
    // camps.push(newCamp);
    // console.log(req.body); => { name: '123', image: '456' }
    camps.push(req.body);
    res.redirect("/campground");
});

app.get("*", function(req, res){
    res.send("Page Not Found!");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Yelp App started!!!");
});