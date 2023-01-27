require('dotenv').config()
require('../database/conn')
const bcrypt=require('bcrypt')
const User=require('../models/User')
const mongoose=require('mongoose')


const users=[
	{
		name:'hakki rabah',
		email:'rabah@gmail.com',
		password:'rabah'
	},
	{
		name:'hakki soufiane',
		email:'soufiane@gmail.com',
		password:'soufiane'
	},
	{
		name:'hakki youcef',
		email:'youcef@gmail.com',
		password:'youcef'
	},
	{
		name:'hakki yassine',
		email:'yassine@gmail.com',
		password:'yassine'
	},
	{
		name:'hakki widad',
		email:'widad@gmail.com',
		password:'widad'
	}
]
 
const deleteAll=async ()=>{
	await User.deleteMany()
}

const createUser=async ()=>{
	for (let index = 0; index < users.length; index++) {
		const{name, email, password}=users[index]
		const hashedPassword=await bcrypt.hash(password,12)
		await User.create({name, email, password:hashedPassword})
		console.log('creted element', index)
	}    
}


deleteAll()
createUser()

mongoose.connection.close()