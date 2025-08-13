import {createContext} from 'react'
export const DoctorContext=createContext();
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useEffect } from 'react';
import { get, set } from 'mongoose';
const DoctorContextProvider=(props)=>{
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [dToken,setDToken] =  useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );

    const [appointment,setAppointment] = useState([]);
    const [dashData,setDashData]=useState(false);
    const [profileData,setProfileData]=useState(false);

    const getProfileData=async()=>{
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/profile',{headers:{dToken}})
            if(data.success)
            {
                setProfileData(data.doctor);
                console.log(data.doctor);
            }
            else
            {
                toast.error(data.message);
                console.log(data.message)
            }
        } catch (error) {
            console.log(error) 
            toast.error(error.message)

        }
    }

    const getDashData=async()=>{   
        try {
            const {data} = await axios.get(backendUrl+'/api/doctor/dashboard',{headers:{dToken}})   
            if(data.success)
            {
                console.log(data);
                setDashData(data.dashboardData)
                console.log(data.dashboardData)
            }
            else
            {
                toast.error(data.message);
                console.log(data.message)
            }
            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }
    }



    const appointmentComplete=async(appointmentId)=>
    {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/appointment-complete', { appointmentId }, { headers: { dToken } });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axios.post(backendUrl + '/api/doctor/appointment-cancel', { appointmentId }, { headers: { dToken } });
            if (data.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);

            
        }
    }
    const getAppointments=async()=>{
        try {
            const {data}= await axios.get(backendUrl+'/api/doctor/appointments',{headers:{dToken}})
            if(data.success)
            {
                setAppointment(data.appointment)
                console.log(data)
            }
            else
            {
                toast.error(data.message);
                console.log(data.message)
            }
        } catch (error) {
            console.log(error)  
            toast.error(error.message)
        }
    }
    useEffect(()=>{
    },[appointment])

    const value ={
        backendUrl,
        dToken,
        setDToken,
        setAppointment,
        appointment,
        getAppointments,
        cancelAppointment,
        appointmentComplete,
        getDashData,
        setDashData,
        dashData,
        profileData,
        setProfileData,
        getProfileData
    }
    return (
        <DoctorContext.Provider value={value}>
            {
                props.children
            }

        </DoctorContext.Provider>
    )

}

export default DoctorContextProvider;