const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
	name:{
		type:String,
		minLength:5,
		trim:true,
		unique:true,
		required:true
	},
	email:{
		type:String,
		unique:true,
		required:true
	},
	password:{
		type:String,
		required:true
	},
	isAdmin:{
		type:Boolean,
		default:false
	}
},
{timestamps:true}
)

const User=mongoose.model('User',userSchema)

module.exports=User