require('dotenv').config()
//async errors
const express=require('express');
require('express-async-errors')
const app=express()
const connectDb=require('./db/connect')
const notFound=require('./middleware/not-found')
const errorhandler=require('./middleware/error-handler');
const connectDB = require('./db/connect');
const ProductsRouter=require('./routes/products')
//midleware
app.use(express.json())
//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1><a href="/api/products">products routes</a>')
})
app.use('/api/v1/products',ProductsRouter)
//products routes
app.use(notFound)
app.use(errorhandler)
const port=process.env.PORT || 5000
const start=async()=>{
    try{
//connect db
await connectDB(process.env.MONGO_URI)
app.listen(port,console.log(`Port Listen In Port ${port}....`))
    }catch(err){
console.log(err)
    }
}
start()
//3:27