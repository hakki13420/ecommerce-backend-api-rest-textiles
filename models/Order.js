const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
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
				default:1
			}
		}
	],
	amount:{
		type:Number,
		required:true
	},
	adresse:{
		type:String,
		required:true
	},
	status:{
		type:String,
		default:'pending'
	},
	dateOrder:{
		type:Date,
		default:new Date()
	}
},
{timestamps:true}
)

module.exports=mongoose.model('Order',orderSchema)

