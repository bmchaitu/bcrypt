
const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
	name:{
	       type:String,
	       minlength:2,
	       maxlength:255,
	       required:true
	},
	email:{
	       type:String,
	       required:true,
	       minlength:2,
	       maxlength:255,
	       unique:true
	     },
	password:{
	          type:String,
	          required:true,
	          minlength:3,
	          maxlength:255
    
	}
});

module.exports = mongoose.model("User",userSchema);