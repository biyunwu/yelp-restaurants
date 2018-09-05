let mongoose = require("mongoose");

// Create DB Schema
let restaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            // Get the comment's ID in Comment database.
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// Campground data model
module.exports = mongoose.model("Restaurant", restaurantSchema);