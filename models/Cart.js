const mongoose=require('mongoose')

const cartSchema=mongoose.Schema({
	userId:{
		type:String,
		required:true
	},
	products:[
		{
			productId:{
				type:String,
				required:true
			},
			quantity:{
				type:Number,
				required:true,
				default:1
			}
		}
	],
	dateCart:{
		type:Date,
		default:new Date()
	}
},
{timestamps:true}
)

module.exports=mongoose.model('Cart',cartSchema)