const Task=require('../models/Tasks')
const asyncWrapper=require('../middleware/async')
const {createCustomError}=require('../errors/custoum-error')
const getTasks=asyncWrapper( async(req,res)=>{
    const tasks=await Task.find({})
    res.status(200).json({tasks})
})
const getTask=asyncWrapper(async(req,res,next)=>{
    const {id:taskID}=req.params
    const task=await Task.findOne({_id:taskID});
if(!task){
    return next(createCustomError(`no task with id ${taskID}`,404))
    
}
    res.status(200).json({task})
})
const updateTask=asyncWrapper(async(req,res,next)=>{
    const {id:taskID}=req.params
    const task=await Task.findOneAndUpdate({_id:taskID},req.body,{
    new:true,
    runValidators:true,
    //run validator if i run and i don't enter name will be error
})
if(!task){
    return next(createCustomError(`no task with id ${taskID}`,404))
}
res.status(200).json({task})

})
const deleteTask=asyncWrapper( async(req,res,next)=>{
    const {id:taskID}=req.params
    const task=await Task.findOneAndDelete({_id:taskID})
if(!task){
    return next(createCustomError(`no task with id ${taskID}`,404))
}
res.status(200).json({task})
})
const addTask=asyncWrapper( async(req,res)=>{
    const task=await Task.create(req.body)
    res.status(200).json({task})

//we use try and catche for get our required in our schema maxlength and name is required
//we use async for sync our data and await to wait one we create our find our findOne
})

module.exports={getTask,addTask,deleteTask,getTasks,updateTask}
//1:25
//2:15