const express=require('express')
const app=express()
const Tasks=require('./routes/Tasks')
const connectDb=require('./db/Mongodb')
const notFound=require('./middleware/not-found')
const errorHandler=require('./middleware/error-handler')
require('dotenv').config()
app.use(express.json())
app.use(express.static('./public'))

//app.get('/first',(req,res)=>{
//    res.send('Hello World')
//})
app.use('/api/v1/tasks',Tasks)
app.use(notFound)
app.use(errorHandler)
const start=async()=>{
    try{
await connectDb(process.env.MONGO_URI)
app.listen(process.env.PORT||5000 ,console.log('port listening on port 5000'))    
}
    catch(err){
console.log(err)
    }
}
start()

//3:07
