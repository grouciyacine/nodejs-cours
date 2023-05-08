const mongoose=require('mongoose')

const TaskSchema=new mongoose.Schema({
name:{
type:String,
required:[true,'must provide a name'],//required
trim:true,
maxlength:[20,"name not be more than 20"],//max length
},
completed:{
    type:Boolean,
    default:false,
    
}
})

module.exports=mongoose.model('Task',TaskSchema)