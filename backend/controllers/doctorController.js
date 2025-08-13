import doctorModel from '../models/doctorModel.js'
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import appointmentModel from '../models/appointmentMolde.js';
const changeAvailablity=async(req,res)=>{
    try {
        const {docId}=req.body
        const docData=await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId,{available:!docData.available})
        res.json({success:true,message:'Availablity changed '})


        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
const doctorList=async(req,res)=>{
    try {
        const doctors =await doctorModel.find({}).select(['-password','-email'])
        res.json({success:true,doctors})
        
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}
// api for log in
const DoctorLogin = async (req, res) => {
    try {
        const{email,password}=req.body;
        const doctor =await doctorModel.findOne({email})
        if(!doctor)
        {
            return res.json({success:false,message:"Invalid email "  })
        }
         const isMatch = await bcrypt.compare(password, doctor.password);
            if (isMatch) {
              const token = jwt.sign({ id:doctor._id }, process.env.JWT_SECRET);
              res.json({ success: true, token });
            } else {
              res.json({ success: false, message: "Invalid Password" });
            }
        

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

    }
}
//api for doctor appointment
const appointmentsDoctor=async(req,res)=>{
    try {
        const docId=req.docId
        const appointment=await appointmentModel.find({ docId: docId });
        res.json({success:true,appointment})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})

        
    }

}
// Api for completeing the appointmetn
const completeAppointment = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId=req.docId
        const appointmentData = await appointmentModel.findByIdAndUpdate(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompeleted: true });
            res.json({ success: true, message: 'Appointment completed successfully' });
        } else {
            res.json({ success: true, message: 'Appointment completed successfully' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api for canecelation
const appointmentCancel = async (req, res) => {
    try {
        const { appointmentId } = req.body;
        const docId=req.docId
        const appointmentData = await appointmentModel.findByIdAndUpdate(appointmentId);
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true });
            res.json({ success: true, message: 'Appointment cancelled successfully' });
        } else {
            res.json({ success: true, message: 'Appointment cancelled failed' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api for ger data for doctor dashbord
const doctorDashboard=async(req,res)=>{

    try {
        const docId=req.docId
        const appointment=await appointmentModel.find({ docId: docId });
        let earning=0;

        appointment.map((item)=>{
            if(item.isCompeleted|| item.payment) {
                earning+=item.amount
            } 
        })
        let patients=[]
        appointment.map((item)=>{
            if(!patients.includes(item.userId))
            {
                patients.push(item.userId)
            }
        })  
        const dashboardData = {
            earning,
            appointments: appointment.length,
            patients:patients.length,
            latestAppointment: appointment.reverse().slice(0, 5),

        }
        res.json({ success: true, dashboardData });

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }
}
//Api for getting Doctor Profile
const doctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const doctor = await doctorModel.findById(docId).select('-password  ');
        if (!doctor) {
            return res.json({ success: false, message: "Doctor not found" });
        }
        res.json({ success: true, doctor });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
//Api for update Doctor's Profile
const updateDoctorProfile = async (req, res) => {
    try {
        const docId = req.docId;
        const {fees,address,available} = req.body;
         await doctorModel.findByIdAndUpdate(docId, {fees,address,available});
        res.json({ success: true,message: "Profile updated successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export {changeAvailablity,doctorList,DoctorLogin,appointmentsDoctor,completeAppointment,appointmentCancel,doctorDashboard,updateDoctorProfile,doctorProfile}