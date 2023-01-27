const router=require('express').Router()
const Category =require('../models/Category')

router.get('/',async (req,res,next)=>{
	try {
		const categories= await Category.find()
		res.status(200).json(categories)
	} catch (error) {
		next(error)
	}
})

router.post('/',async (req,res,next)=>{
	try {
		const data=req.body
		const category=await Category.create({...data})
		if(category) return res.status(201).json(category)
		return res.status(400).json({'error':'bad request'})
	} catch (error) {
		next(error)
	}
})

router.get('/:id',async (req,res,next)=>{
	try {
		const category=await Category.findById(req.params.id)
		if (category) return res.status(200).json(category)
		return res.status(404).json({'error':'category not found'})
	} catch (error) {
		next(error)    
	}
})

router.delete('/:id',async (req,res,next)=>{
	try {
		const category=await Category.findByIdAndRemove(req.params.id)
		if (category) return res.status(204).json(category)
		return res.status(404).json({'error':'category not found'})
	} catch (error) {
		next(error)    
	}
})

router.put('/:id',async (req,res,next)=>{
	try {
		const data=req.body
		const category=await Category.findByIdAndUpdate(
			req.params.id,
			{...data},
			{new:true}
		)
		if (category) return res.status(200).json(category)
		return res.status(404).json({'error':'category not found'})
	} catch (error) {
		next(error)    
	}
})

module.exports=router