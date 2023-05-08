const Job=require('../models/Job')
const  {StatusCodes} =require('http-status-codes')
const  {BadRequestError,NotFoundError}=require('../errors')
const getAllJobs = async (req, res) => {
    const jobs=await Job.find({createdBy:req.user.userId}).sort('createdAt')
    res.status(StatusCodes.OK).json({jobs})
};
const getJob = async (req, res) => {
    const {user:{userId},params:{id:jobId}}=req
    const job=await Job.findOne({
        _id:jobId,       // const{id:JobId}=req.params
        createdBy:userId //or req.user.userId
    })
    if(!job){
        throw new NotFoundError(`No Job with id ${jobId}`)
    }
    res.status(StatusCodes.OK).json({job})
};
const createJob = async (req, res) => {
    req.body.createdBy=req.user.userId
    const job=await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
};
const UpdateJob = async (req, res) => {
    const {id:jobId}=req.params
    const userId=req.user.userId
    const {company,position}=req.body
    if(company==='' || position==='' ){
        throw new BadRequestError('Company or position Cannot be Empty')
    }
    const job=await Job.findOneAndUpdate({_id:jobId},req.body,{
        new:true,
        runValidators:true
    })
    if(!job){
        throw new NotFoundError('No Job with id'+jobId)
    }
    res.status(StatusCodes.OK).json({job})
};
const deleteJob = async (req, res) => {
    const {id:JobId}=req.params
    const userId=req.user.userId
    const job=await Job.findOneAndDelete({_id:JobId,createdBy:userId})
    if(!job){
        throw new NotFoundError(`no job withid ${JobId} exist`)

    }
    res.status(StatusCodes.OK).json(`delete successfully`)

};
module.exports={
    getAllJobs,
    createJob,
    getJob,
    UpdateJob,
    deleteJob
}
//8h:49m