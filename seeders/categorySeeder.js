require('dotenv').config()
require('../database/conn')
const Category=require('../models/Category')



const categories=[
	{
		title:'shoes',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		products:[],		
	},
	{
		title:'TShirt',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		products:[],		
	},
	{
		title:'Jeans',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		products:[],		
	},
	{
		title:'Jackets',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		products:[],		
	},
	{
		title:'Pantallons',
		description:'cette categore est une sort de prodtuis qui forme des produits qui forment cette categore',
		products:[],		
	}
]
 
const deleteAll=async ()=>{
	await Category.deleteMany()
}

const createCategory=async ()=>{
	for (let index = 0; index < categories.length; index++) {
		const {title, description, products}=categories[index]
		await Category.create({title, description, products})
		console.log('creted element', index)
	}    
}


deleteAll()
createCategory()
