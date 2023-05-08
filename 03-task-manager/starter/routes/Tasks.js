const express=require('express')
const routes=express.Router()
const Tasks=require('../controllers/Tasks')
routes.route('/').get(Tasks.getTasks).post(Tasks.addTask)
routes.route('/:id').get(Tasks.getTask).delete(Tasks.deleteTask).patch(Tasks.updateTask)

module.exports=routes
