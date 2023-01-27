const router=require('express').Router()
const User= require('../models/User')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')


router.post('/register',async (req, res, next)=>{
	try {
		const {name, email,password}=req.body
		const user=await User.findOne({email})
		console.log('user register', user)
		if(user) return res.status(400).json({'error':'email exist, try again'})
		const hashPassword=await bcrypt.hash(password,12)
		const newUser=await User.create({name,email,password:hashPassword})
		if(newUser) return res.status(201).json(newUser)
		return res.status(500).json({'error':'error server'})
	} catch (error) {
		next(error)
	}
})

router.post('/login',async (req, res, next)=>{
	try {
		const {email, password}= req.body
		const user = await User.findOne({email})
		if(!user) return res.status(400).json({'error':'credential error email'})
		const compare=await bcrypt.compare(password,user.password)
		if(!compare) return res.status(400).json({'error':'credential error password'})
		const token=jwt.sign(
			{id:user._id,name:user.name,email:user.email},
			process.env.JWT_SECRET
		)
		
		return res.status(200).json({
			id:user._id,
			name:user.name,
			email:user.email,
			token
		})
	} catch (error) {
		next(error)
	}


})

module.exports=router