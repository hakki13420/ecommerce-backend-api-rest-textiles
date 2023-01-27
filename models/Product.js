const mongoose=require('mongoose')

const productShema=mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	description:{
		type:String,
		required:true
	},
	Categories:{
		type:Array,
		required:true,
		default:[]
	},
	color:{
		type:String,
		required:true
	},
	size:{
		type:String,
		required:true
	},
	price:{
		type:Number,
		required:true
	},
	qte:{
		type:Number,
		required:true
	}
},
{timestamps:true}
)

const Product=mongoose.model('Product', productShema)

module.exports=Product