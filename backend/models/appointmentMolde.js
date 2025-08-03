import mongoose from "mongoose";
const appointmentSchema= new mongoose.Schema(
    {
        userId:{type:String, required:true },
        docId:{type:String,required:true},
        slotData:{type:String,require:true},
        slotTime:{type:String,require:true},
        userData:{type:Object,require:true},
        docData:{type:Object,require:true},
        amount:{type:Number,require:true},
        data:{type:Number,require:true},
        cancelled:{type:Boolean,default:false},
        payment:{type:Boolean,default:false},
        isCompeleted:{type:Boolean,default:false}


    }
)
const appointmentModel=mongoose.model.appointment || mongoose.model('appointment',appointmentSchema)
export default appointmentModel