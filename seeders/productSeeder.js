require('dotenv').config()
require('../database/conn')

const Product=require('../models/Product')


const products=[
	{
		title:'Chaussure',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		categories:[],		
		size:'M',
		color:'red',
		price:307,
		qte:400,
	},
	{
		title:'Chaussure',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		categories:[],		
		size:'S',
		color:'green',
		price:307,
		qte:305
	},
	{
		title:'Chaussure women',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		categories:[],		
		size:'S',
		color:'black',
		price:37,
		qte:40
	},
	{
		title:'Chaussure women',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		categories:[],		
		size:'S',
		color:'blue',
		price:37,
		qte:40
	},
	{
		title:'Soulier',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		categories:[],		
		size:'S',
		color:'black',
		price:37,
		qte:499
	},
	{
		title:'jeans',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		categories:[],		
		size:'L',
		color:'black',
		price:37,
		qte:499
	},
	{
		title:'jeans',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		categories:[],		
		size:'M',
		color:'blue',
		price:37,
		qte:499
	},
]
 
const deleteAll=async ()=>{
	await Product.deleteMany()
}

const createProduct=async ()=>{
	for (let index = 0; index < products.length; index++) {
		const{title, description, size, color, price, qte}=products[index]
		await Product.create({title, description, size, color, price, qte})
		console.log('creted element', index)
	}    
}


deleteAll()
createProduct()

