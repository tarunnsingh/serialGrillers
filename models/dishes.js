var mongoose = require("mongoose");

var dishSchema = new mongoose.Schema({
	name: String,
	price: String,
	description: String,
	mealtype: String,
	image: String,
	ingr: String
});

module.exports = mongoose.model("Dish",dishSchema);