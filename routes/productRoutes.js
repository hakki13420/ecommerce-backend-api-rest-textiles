const router=require('express').Router()
const Product=require('../models/Product')

router.get('/',async (req,res,next)=>{
	try {
		const products=await Product.find()
		return res.status(200).json(products)
	} catch (error) {
		next(error)
	}
})

router.post('/',async (req,res,next)=>{
	try {
		const productData=req.body
		const product=await Product.create(productData)
		if(product) return res.status(200).json(product)
	} catch (error) {
		next(error)
	}
})

router.get('/:id', async (req,res,next)=>{
	try {
		const product =await Product.findById(req.params.id)
		if(product) return res.status(200).json(product)
	} catch (error) {
		next(error)
	}
})

router.delete('/:id', async (req,res,next)=>{
	try {
		const product=await Product.findByIdAndRemove(req.params.id)
		if(product) return res.status(204).json(product)
	} catch (error) {
		next(error)
	}
})

router.put('/:id',async(req,res,next)=>{
	try {
		const data=req.body
		console.log(data)
		const product=await Product.findByIdAndUpdate(req.params.id,{...data},{new:true})
		if (product) return res.status(200).json(product)
	} catch (error) {
		next(error)
	}
})


module.exports=router