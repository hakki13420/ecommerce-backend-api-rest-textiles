require('dotenv').config()
require('./database/conn')
const cors =require('cors')
const express= require('express')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const productRoutes=require('./routes/productRoutes')
const cartRoutes=require('./routes/cartRoutes')
const orderRoutes=require('./routes/orderRoutes')
const stripeRoutes=require('./routes/stripe')
const {unknow, errorHandler} = require ('./middlewares/middleware')


const app=express()

app.use(cors())
app.use(express.json())

//routes
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/categories',categoryRoutes)
app.use('/api/products', productRoutes)
app.use('/api/carts', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/checkout', stripeRoutes)

//errors and 404
app.use(unknow)
app.use(errorHandler)



const Port=process.env.PORT || 4000
app.listen(Port, ()=>console.log(`server running on the port ${Port}`))