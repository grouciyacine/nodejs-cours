const CustomAPIError=require('../errors/custom-error')
const jwt=require("jsonwebtoken")
const authenticationMiddleware=async(req,res,next)=>{
    const authHeader=req.headers.authorization;
    if(!authHeader||!authHeader.startsWith('bearer ')){
        throw new CustomAPIError('please enter a bearer',401)
    }
    const token=authHeader.split(' ')[1]
    console.log(token)
    try{
            const decoded=jwt.verify(token,process.env.JWT_SECRET)
            console.log(decoded)
            const {id,username}=decoded
            req.user={id,username}
            next()
    }catch(err){
        throw new CustomAPIError('not authorized to access this route',401)
    }
    console.log(req.headers.authorized)
    
}
module.exports= authenticationMiddleware