import express from 'express'
import { appointmentCancel, appointmentsDoctor, completeAppointment, doctorDashboard, doctorList, DoctorLogin, doctorProfile, updateDoctorProfile } from '../controllers/doctorController.js'
import authDoctor from '../middlewares/authDoctor.js'
const doctorRouter=express.Router() 

doctorRouter.get('/list',doctorList)
doctorRouter.post('/login',DoctorLogin)
doctorRouter.get('/appointments',authDoctor,appointmentsDoctor)
doctorRouter.post('/appointment-cancel',authDoctor,appointmentCancel)
doctorRouter.post('/appointment-complete',authDoctor,completeAppointment)
doctorRouter.get('/dashboard',authDoctor,doctorDashboard)
doctorRouter.get('/profile',authDoctor,doctorProfile)
doctorRouter.post('/update-profile',authDoctor,updateDoctorProfile)

export default doctorRouter