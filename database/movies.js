const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
    title: String,
    actor: String,
    image_url: String
});

const moviesModel = mongoose.model("movies", moviesSchema);

module.exports = moviesModel;