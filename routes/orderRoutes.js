const router=require('express').Router()
const Order= require('../models/Order')


router.get('/',async (req,res,next)=>{
	try {
		const orders = await Order.find()
		return res.status(200).json(orders)
	} catch (error) {
		next(error)
	}
})

router.post('/',async(req, res, next)=>{
	try {
		const data=req.body
		const order = await Order.create(data)
		return res.status(201).json(order)
	} catch (error) {
		next(error)
	}
})

router.get('/find/:userId',async(req,res,next)=>{
	try {
		console.log('user id', req.params.userId)
		const order=await Order.findOne({userId:req.params.userId})
		if(order) return res.status(200).json(order)
		return res.status(404).json({'error':'not found'})
	} catch (error) {
		next(error)      
	}
})

router.delete('/:userId', async (req,res,next)=>{
	try {
		const order=await Order.findOneAndDelete({userId:req.params.userId})
		if(order) return res.status(204).json(order)
		return res.status(404).json({'error':'not found'})
	} catch (error) {
		next(error)
	}
})

router.put('/:userId', async(req,res, next)=>{
	try {
		const data=req.body
		const order=await Order.findOneAndUpdate(
			{userId:req.params.userId},
			data,
			{new:true}
		)
		if (order) return res.status(200).json(order)
		return res.status(400).json({'error':'bad request'})
	} catch (error) {
		next(error)      
	}
})

//icomings

router.get('/income',async(req,res, next)=>{
	const date=new Date()
	const lastMonth=new Date(date.setMonth(date.getMonth()-1))
	const previousMonth=new Date(date.setMonth(lastMonth.getMonth()-1))
	try {
		const orders=await Order.aggregate([
			{
				$match:{createdAt:{$gte:previousMonth}}
			},
			{
				$project:{
					month:{$month:'$createdAt'},
					sales:'$amount'
				}
			},
			{
				$group:{
					_id:'$month',
					total:{$sum:'$sales'}
				}
			}
		])
		return res.status(200).json(orders)
	} catch (error) {
		next(error)
	}
	
	res.status(200).json(previousMonth)
})

module.exports=router