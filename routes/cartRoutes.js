const router=require('express').Router()
const Cart= require('../models/Cart')


router.get('/',async (req,res,next)=>{
	try {
		const carts = await Cart.find()
		return res.status(200).json(carts)
	} catch (error) {
		next(error)
	}
})

router.post('/',async(req, res, next)=>{
	try {
		const data=req.body
		const cart = await Cart.create(data)
		return res.status(201).json(cart)
	} catch (error) {
		next(error)
	}
})

router.get('/:userId',async(req,res,next)=>{
	try {
		const cart=await Cart.findOne({userId:req.params.userId})
		if(cart) return res.status(200).json(cart)
		return res.status(404).json({'error':'not found'})
	} catch (error) {
		next(error)      
	}
})

router.delete('/:userId', async (req,res,next)=>{
	try {
		const cart=await Cart.findOneAndDelete({userId:req.params.userId})
		if(cart) return res.status(204).json(cart)
		return res.status(404).json({'error':'not found'})
	} catch (error) {
		next(error)
	}
})

router.put('/:userId', async(req,res, next)=>{
	try {
		const data=req.body
		const cart=await Cart.findOneAndUpdate(
			{userId:req.params.userId},
			data,
			{new:true}
		)
		if (cart) return res.status(200).json(cart)
		return res.status(400).json({'error':'bad request'})
	} catch (error) {
		next(error)      
	}
})

module.exports=router

