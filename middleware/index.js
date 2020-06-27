var camp = require("../models/campgrounds");
var Comment = require("../models/comments");
var middlewareObj={};

middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //check if campgrounf id present
        camp.findById(req.params.id, function(err, foundCamp) {
           //if campground is present see if user is same...
            if(err){
                req.flash("error", "Campground not found");
                res.redirect("back");
            }else{
                 if(foundCamp.author.id.equals(req.user._id) || req.user.isAdmin){
                     next();
                 }else{
                     req.flash("error", "You don't have permission to do that");
                     res.redirect("back")
                 }
           }
        });
    }else{
        req.flash("error", "You need to be Logged In to do that");
        res.redirect("back");
    }
}

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        //check if campgrounf id present
        Comment.findById(req.params.comment_id, function(err, foundCom) {
           //if campground is present see if user is same...
            if(err){
                req.flash("error", "Comment not found");
                res.redirect("back");
            }else{
                 if(foundCom.author.id.equals(req.user._id) || req.user.isAdmin){
                     next();
                 }else{
                    req.flash("error", "You don't have permission to do that");
                     res.redirect("back")
                 }
           }
        });
    }else{
        req.flash("error", "You need to be Logged In to do that");
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash("error", "You need to be Logged In to do that");
        res.redirect("/login");
    }
}

module.exports= middlewareObj;