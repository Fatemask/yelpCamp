var exp                = require("express"),
 app                   = exp(),
 bodyParser            = require("body-parser"),
 mongoose              = require("mongoose"),
 methodOverride        = require("method-override"),
 flash                 = require("connect-flash"),
 ejss                  = require("ejs-lint"),
 camp                  = require("./models/campgrounds"),
 seedDB                = require("./seeds"),
 Comment               = require("./models/comments"),
 User                  = require("./models/users"),
 passport              = require("passport"),
 localStrategy         = require("passport-local"),
 passportLocalMongoose = require("passport-local-mongoose");
 require('dotenv').config();

var commentRoute = require("./routes/comments"),
    campRoute     = require("./routes/campgrounds"),
    indexRoute    = require("./routes/index");


mongoose.connect("mongodb://localhost/yelp_camp_v7",{ useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(exp.static(__dirname + "/public"));
console.log(__dirname);
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //commenting for now

//passport configuration
app.use(require("express-session")({
   secret:"best person is lee jong suk",
   resave: false,
   saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//gives details of user in var currentUser
app.use(function(req, res, next){
   res.locals.currentUser = req.user; 
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});
app.locals.moment= require("moment");
app.use(indexRoute);
app.use("/campground", campRoute);
app.use("/campground/:id/comment", commentRoute);


app.listen(5000, function(){
    console.log("Yelp Camp Server !!!");
})