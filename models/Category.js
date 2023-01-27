const mongoose=require('mongoose')

const categorySchema=mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	products:{
		type:Array,
		required:true,
		default:[]
	}
},
{timestamps:true}
)

module.exports=mongoose.model('Category',categorySchema)