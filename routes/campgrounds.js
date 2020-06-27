var express= require("express");
var router=express.Router();
var camp= require("../models/campgrounds");
var middleware = require("../middleware");
require('dotenv').config();
var multer = require('multer');
//  Upload image
var storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});
var imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter})

var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'dwdpell1m', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});





//INDEX
//INDEX - show all campgrounds
router.get("/", function(req, res){
    var noMatch = null;
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        // Get all campgrounds from DB
        camp.find({name: regex}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              if(allCampgrounds.length < 1) {
                  noMatch = "No campgrounds match that query, please try again.";
              }
              res.render("campground/index",{campg:allCampgrounds, noMatch: noMatch});
           }
        });
    } else {
        // Get all campgrounds from DB
        camp.find({}, function(err, allCampgrounds){
           if(err){
               console.log(err);
           } else {
              res.render("campground/index",{campg:allCampgrounds, noMatch: noMatch});
           }
        });
    }
}); 

//CREATE
router.post("/", middleware.isLoggedIn, upload.single('image'), function(req, res) {
    cloudinary.v2.uploader.upload(req.file.path, function(err, result) {
      if(err) {
        req.flash('error', err.message);
        return res.redirect('back');
      }
      // add cloudinary url for the image to the campground object under image property
      req.body.campground.image = result.secure_url;
      // add image's public_id to campground object
      req.body.campground.imageId = result.public_id;
      // add author to campground
      req.body.campground.author = {
        id: req.user._id,
        username: req.user.username
      }
        camp.create(req.body.campground, function (err, newlycreated){
            if( !err){
                //redirect back to camp page
                req.flash("success", "Successfully Created a Campground");
                res.redirect("/campground");
            }
            else{
                console.log(err);
            }
        });
    });
});


//NEW
router.get("/new",middleware.isLoggedIn, function(req,res){
   res.render("campground/new"); 
});

//SHOW
router.get("/:id",function(req, res) {
    //search camp by id and show its details
    camp.findById(req.params.id).populate("comment").exec(function(err, foundCamp){
        if(err){
            console.log(err);
        }else{
            
            res.render("campground/show",{campg: foundCamp});
        }
    });
});

//Edit route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
    camp.findById(req.params.id, function(err, foundCamp){
        if(err){
            console.log(err);
            res.redirect("/");
        }else{
            res.render("campground/edit", {campg:foundCamp});
        }
    });
});

//Update route
router.put("/:id", upload.single('image'), function(req, res){
    camp.findById(req.params.id, async function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            if (req.file) {
              try {
                  await cloudinary.v2.uploader.destroy(campground.imageId);
                  var result = await cloudinary.v2.uploader.upload(req.file.path);
                  campground.imageId = result.public_id;
                  campground.image = result.secure_url;
              } catch(err) {
                  req.flash("error", err.message);
                  return res.redirect("back");
              }
            }
            campground.name = req.body.campground.name;
            campground.description = req.body.campground.description;
            campground.save();
            req.flash("success","Successfully Updated!");
            res.redirect("/campground/" + req.params.id);
        }
    });
});

//Destroy Route
router.delete('/:id', function(req, res) {
    camp.findById(req.params.id, async function(err, campground) {
      if(err) {
        req.flash("error", err.message);
        return res.redirect("back");
      }
      try {
          await cloudinary.v2.uploader.destroy(campground.imageId);
          campground.remove();
          req.flash('success', 'Campground deleted successfully!');
          res.redirect('/campground');
      } catch(err) {
          if(err) {
            req.flash("error", err.message);
            return res.redirect("back");
          }
      }
    });
  });

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports = router;