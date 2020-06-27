var mongoose= require("mongoose");
var camp= require("./models/campgrounds");
var Comment= require("./models/comments");

var data=[
    {
        name:"Skate into Love",
        image:"https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg",
        description:"blah vlah blha"
    },
    {
        name:"Love of Aurora",
        image:"https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg",
        description:"blah vlah blha"
    },
    {
        name:"Romance is a bonus Book",
        image:"https://s3.amazonaws.com/imagescloud/images/cards/camping/camping-tente.jpg",
        description:"blah vlah blha"
    }
]

function seedDB(){
     //delete all campgrounds
     camp.remove({} , function(err){
        if(err){
            console.log(err);
        }
            console.log("cmapground Deleted!");
        
        //create a new campground
        // data.forEach(function(seed){
        //     camp.create(seed, function(err , data){
        //         if(err){
        //             console.log(err);
        //         }else{
        //             console.log("added a cmapground !");
        //             //add a comment
        //             Comment.create({
        //                 text:"NO internet",
        //                 author:"The brightest star in the sky"
        //             }, function(err, comment){
        //                 if(err){
        //                     console.log(err);
        //                 }else{
        //                     data.comment.push(comment);
        //                     data.save();
        //                     console.log("new comment");
        //                 }
        //             })
        //         }
        //     });
        // });
    });   
}

//add comments
module.exports= seedDB;


// var mongoose = require("mongoose");
// var Campground = require("./models/campground");
// var Comment   = require("./models/comment");
 
// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     },
//     {
//         name: "Canyon Floor", 
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
//     }
// ]
 
// function seedDB(){
//   //Remove all campgrounds
//   Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }
 
//module.exports = seedDB;


// <div class="container">
//     <% if(error && error.length > 0) %>
//     <div class="alert alert-danger" role="alert">
//         <%=error%>
//     </div>
//     <% } %>
//     <% if(success && success.length > 0)%>
//     <div class="alert alert-success" role="alert">
//         <%=success%>
//     </div>
//     <% } %>
// </div>