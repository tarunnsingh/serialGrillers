var express = require("express");
	app = express();
	bodyParser = require("body-parser");
	mongoose = require("mongoose");

var Dish = require("./models/dishes");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/serial_grillers_v1",{ useNewUrlParser: true });

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));




//Landing Page Route
app.get("/", function(req, res){
	res.render("landing");
});

app.get("/menu",function(req, res){
	
	Dish.find({}, function(err, foundAllDish){
		if(err){
			console.log(err);
		} else {
			res.render("menu/menu",{dishes: foundAllDish});
		}
	});

});

app.get("/menu/new", function(req, res){
	res.render("menu/new")
});

app.post("/menu", function(req, res){
	console.log("Body of submit : ", req.body)
	var name = req.body.name;
	var price = req.body.price;
	var desc = req.body.description;
	var mealtype = req.body.mealtype;
	var img = req.body.image;
	var ingredents = req.body.ingr;

	var newDish = {name : name, image:img, price : price, description: desc, mealtype: mealtype, ingr: ingredents};
	Dish.create(newDish, function(err, dish){
		if(err){
			console.log(err);
		} else {
			res.redirect("/menu");
		}
	})
})



app.get("/menu/:id",function(req, res){
	Dish.findById(req.params.id,function(err, foundDish){
		if(err){
			console.log(err);
		} else{
			console.log(foundDish);
			res.render("menu/show",{dish: foundDish});
		}
	});
	
});








//Listen to Port
app.listen("3000",function(){
	console.log("Server Started!");
});