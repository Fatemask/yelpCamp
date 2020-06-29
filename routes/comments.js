var express= require("express");
var router=express.Router({mergeParams:true});
var Comment= require("../models/comments");
var camp= require("../models/campgrounds");
var middleware = require("../middleware");
//**********************
//COMMENT ROUTES
//**********************

//NEW
router.get("/new", middleware.isLoggedIn, function(req, res) {
    camp.findById(req.params.id, function (err, campg) {
        if (err){
            console.log(err);
        }else{
            res.render("comment/new" , {camp :campg});      
        }
        
    });
});

//CREATE
router.post("/", middleware.isLoggedIn, function(req,res){
    req.body.comment.text= req.sanitize(req.body.comment.text);
    camp.findById(req.params.id, function(err, campg) {
       if(err){
           console.log(err);
       }else{
           Comment.create(req.body.comment, function(err , newcomment){
               if(err){
                   console.log(err);
               }else{
                   //give details to comment of user.
                   newcomment.author.id=req.user._id; 
                   newcomment.author.username=req.user.username;
                   //save it
                   newcomment.save();
                   //pushing it 
                   campg.comment.push(newcomment);
                   campg.save();
                   req.flash("success", "Successfully added a Comment !!");
                   res.redirect("/campground/"+campg._id);
               }
           });
       } 
    });
});

//edit route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundcom) {
        if(err){
            console.log(err)
        }else{
         res.render("comment/edit", {camp_id: req.params.id, comment:foundcom});
        }
    });
});

//update route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    req.body.comment.text= req.sanitize(req.body.comment.text);
   Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatecom){
     if(err){
         console.log(err);
     }else{
         req.flash("success", "Comment Edited Successfully");
         res.redirect("/campground/"+ req.params.id);
     }
   });
});

//destroy route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, deletecom){
        if(err){
            res.redirect("back");
        }else{
            req.flash("success", "Comment deleted");
            res.redirect("/campground/"+ req.params.id);
        }
    });    
});

module.exports= router;
