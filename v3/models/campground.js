let mongoose = require("mongoose");

// Create DB Schema
let campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    comments: [
        {
            // Get the comment's ID in Comment database.
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Campground data model
module.exports = mongoose.model("Campground", campgroundSchema);