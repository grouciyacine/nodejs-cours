const express=require('express')
const routes=express.Router()
const {getAllJobs,
    UpdateJob,
    createJob,
    deleteJob,
    getJob} =require('../controllers/jobs')

    routes.route('/').post(createJob).get(getAllJobs)
    routes.route('/:id').get(getJob).delete(deleteJob).patch(UpdateJob)
    module.exports=routes