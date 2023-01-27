const router=require('express').Router()
const User=require('../models/User')
const { isAuthenticateAndAdmin}=require('../middlewares/middleware')

router.get('/', async(req,res,next)=>{
	try {
		const users=await User.find({})
		const {admin}=req.query
		const {noAdmin}=req.query
		if(admin){			
			const filtredUsers=users.filter(u=>u.isAdmin===true)
			return res.status(200).json(filtredUsers)				
		}else if(noAdmin) {
			const filtredUsers=users.filter(u=>u.isAdmin!==true)
			return res.status(200).json(filtredUsers)						
		}		
		return res.status(200).json(users)	
	} catch (error) {
		next(error)
	}	
})

router.post('/',isAuthenticateAndAdmin, async (req, res, next)=>{
	try {
		const {name, email, password}=req.body
		console.log(name, email, password)
		const user=await User.create({name,email,password})
		return res.status(200).json(user)
	} catch (error) {
		console.log('error in route block')
		next(error)
	}
})

router.delete('/:id', isAuthenticateAndAdmin, async (req,res,next)=>{
	try {
		console.log(req.params.id)
		const user= await User.findByIdAndDelete(req.params.id)
		if (user) return res.status(204).json(user)
		return res.status(404).json({'error':'user not found'})
	} catch (error) {
		next(error)
	}
})

router.put('/:id', isAuthenticateAndAdmin, async (req,res,next)=>{
	try {
		const updatedData=req.body
		//console.log('updatedData', updatedData)
		const user=await User.findByIdAndUpdate(
			req.params.id,
			updatedData,
			{
				new:true,
				runValidators: true,
				context: 'query'
			}
		)
		console.log('user', user)
		if(user) return res.status(200).json(user)
		return res.status(404).json({'error':'user not found'})
	} catch (error) {
		next(error)
	}
})

router.get('/find/:id', async (req, res, next)=>{	

	try {
		const user=await User.findById(req.params.id)
		if (user) return res.status(200).json(user)
		return res.status(404).json({'error':'user not found'})
	} catch (error) {
		next(error)	
	}
})

//statistics
router.get('/stat',async(req, res, next)=>{
	const date= new Date()
	const lastYear = new Date(date.setFullYear(date.getFullYear() - 1))
	console.log('last year', lastYear)

	try {
		const users=await User.aggregate([
			{
				$match:{createdAt:{$gte:lastYear}}
			},
			{
				$project:{
					month:{$month:'$createdAt'}
				}
			},
			{
				$group:{
					_id:'$month',
					total:{$sum:1}
				}
			}
		])

		res.status(200).json(users)
	} catch (error) {
		next(error)
	}
})

module.exports=router