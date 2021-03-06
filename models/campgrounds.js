var mongoose=require("mongoose");
//creating schema
var campSchema= new mongoose.Schema({
   name: String,
   price:String,
   image: String,
   imageId:String,
   description: String,
   createdAt: {type: Date, default: Date.now},
   author:{
     id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
     },
     username:String
   },
   comment:[{
         type:mongoose.Schema.Types.ObjectId,
         ref:"Comment"
   }]
});

//make model
module.exports= mongoose.model("camp", campSchema);