import mongoose from 'mongoose'

const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    }, 
    description:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    },
    state:{
        type:String,
        required:true
    },
    project:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    }
},{
    timestamps:true
});
export default mongoose.model('Task',taskSchema);