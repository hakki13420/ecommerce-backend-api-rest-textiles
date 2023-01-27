const jwt =require('jsonwebtoken')


module.exports.unknow=(req,res)=>{
	res.status(404).send('404')
}


module.exports.errorHandler=(error, req,res, next)=>{

	if(error.name==='ValidationError'){
		return res.status(400).json({'error': error.message})
	}else if (error.name==='CastError'){
		return res.status(400).json({'error': error.message})
	}else if (error.name==='JsonWebTokenError'){
		return res.status(403).json({'error': error.message})
	}
	next(error)
}

module.exports.isAuthenticate=(req,res,next)=>{
	const authorization=req.headers.authorization
	if(authorization){
		const token=req.headers.authorization.split(' ')[1]	
		jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
			if(!user) return next(err)
			req.user=user
			return next()
		})
	}
	return res.status(401).json({'error':'you are not authenticated'})
}

module.exports.isAuthenticateAndAdmin=(req,res,next)=>{
	if(req.user){
		if(req.user.isAdmin) return next()
		res.status(403).json({'error':'you havent autaurisation'})
	}else return res.status(403).json({'error':'you ara not authenticated'})
}