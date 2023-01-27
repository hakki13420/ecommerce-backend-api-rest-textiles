const mongoose=require('mongoose')

mongoose.set('strictQuery', false)
mongoose.connect(process.env.URI_DB,
	{
		useUnifiedTopology: true,
		useNewUrlParser: true,
		//useCreateIndex: true, //make this true
		autoIndex: true, //make this also true
	})
	.then(()=>console.log('connected to DB'))
	.catch(err=>console.log(err))