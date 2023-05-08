const CustomAPIError=require('../errors/custom-error')
const jwt=require("jsonwebtoken")
const login=async(req,res)=>{
    const {username,password}=req.body
    //mongo
    //joi
    //check in the controller
    if(!username || !password){
throw new CustomAPIError('please enter a username',400)
    }
    //just for demo 
    const id=new Date().getDate()
const token=jwt.sign({id,username},process.env.JWT_SECRET,{expiresIn:'30d'})
res.status(200).json({msg:'user created',token})
    console.log(username,password)
    
}
const dashboard=async(req,res)=>{
    console.log(req.headers)
    console.log(req.user)
            const luckNumber=Math.floor(Math.random()*100)
            res.status(200).
            json({msg:`Hello ${req.user.username}`,secret:`Here is your authorized data ,yor luck number is ${luckNumber}`})
}
module.exports={login,dashboard}
//6H:12m