import validator from 'validator'

import bcrypt from "bcrypt"

import {v2 as cloudinary} from "cloudinary"
import { json } from 'express' 
import doctorModel from '../models/doctorModel.js'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentMolde.js'
import userModel from '../models/userModel.js'
//api for adding doctors 
const addDoctor=async(req,res)=>{
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address}=req.body 
        const imageFile=req.file
        if(!name || !email || !password || !speciality || !degree || !experience || ! about || !fees || !address)
        {
            return res.json({success:false ,message:"Missing Details"})
        }
        if(!validator.isEmail(email))
        {
            return res.json({success:false ,message:"please enter a valid email"})
        }
        if(password.length < 8)
        {
            return res.json({success:false ,message:"please enter a strong password"})
        }
        //hasing doctor password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword =await bcrypt.hash(password,salt)
        /// upload iamge to cloudnary
        const imageUpload= await cloudinary.uploader.upload(imageFile.path,{resource_type:"image"})
        const imageUrl = imageUpload.secure_url

        const doctorData ={
            name,
            email,
            image:imageUrl,
            password:hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date:Date.now()
        }
        const newDoctor =new doctorModel(doctorData)
        await newDoctor.save()
        res.json({success:true,message:"Doctor added"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
        
    }

}
const loginAdmin = async(req,res) =>{
    try {
        const {email,password}= req.body
        console.log(email+password)
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD)
        {
            const token= jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else
        {
            res.json({success:false,message:"invalid admin"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }

}
const allDoctors= async(req,res)=>{
    try {
        const doctors=await doctorModel.find({}).select('-password')
        res.json({success:true,doctors})
        
    } catch (error) {
         console.log(error)
        res.json({success:false,message:error.message})
        
    }
}
// api to get all apointment list
const appointmentsAdmin=async(req,res)=>{
   try {
     const appointments=await appointmentModel.find({});
     res.json({success:true,appointments})

    
   } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
    
   }
}
//api for appointment cancilation
const appointmentCancel = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointment = await appointmentModel.findById(appointmentId);
   
    await appointmentModel.findByIdAndUpdate(appointmentId, {
      cancelled: true,
    });
    //reasing doctorslot
    const { docId, slotDate, slotTime } = appointment;
    const docData = await doctorModel.findById(docId);
    const slots_booked = docData.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (e) => e !== slotTime
    );
    await doctorModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({ success: true, message: "Appointment cancelled successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};
//api to get Dash boar data for admin portal
const adminDashboard=async(req,res)=>{
    try {
        const doctors = await doctorModel.find({});
        const user=await userModel.find({});
        const appointments=await appointmentModel.find({});
        const dashData={
            doctors:doctors.length,
            appointments:appointments.length,
            patients:user.length,
            latestAppointments:appointments.reverse().slice(0,5)

        }
        res.json({success:true,dashData})

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}
export {addDoctor,loginAdmin,allDoctors,appointmentsAdmin,appointmentCancel,adminDashboard}