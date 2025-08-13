import React from 'react'
import { DoctorContext } from '../../context/DoctorContext';
import { use } from 'react';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../context/AppContext';
import { AdminContext } from '../../context/AdminContext';
import { assets } from '../../assets/assets';
const DoctorAppointment = () => {
    const {dToken,setAppointment,appointment,getAppointments,cancelAppointment,appointmentComplete} = useContext(DoctorContext);
    const{calculateAge} = useContext(AdminContext);
    const {slotDateFormat,currency} = useContext(AppContext);
    useEffect(() => {
        if(dToken) {
            getAppointments();
        } 
    }, [dToken]);
  return (
    <div className='w-full max-w-6xl m-5'>
        <p className='mb-3 text-lg font-medium'>All Appointment</p>
        <div className='bg-white border-white text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
            <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] py-3 px-6 border-b'>
                <p>#</p>
                <p>Patient</p>
                <p>Payment</p>
                <p>Patient Age</p>
                <p>Date and Time</p>
                <p>Fees</p>
                <p> Action</p>
            </div>
            {
                appointment.map((item,index)=>(
                    <div key={index} className='flex flex-wrap justify-between grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr]  items-center text-gray-500  py-3 px-6 border-b sm:flex-row'>
                        <p className='max-sm:hidden'>{index + 1}
                            
                        </p>
                        <div className='flex items-center gap-2  '>
                            <img className='w-8  rounded-full' src={item.userData.image} alt="" />
                            <p>{item.userData.name}</p>
                        </div>
                        
                        
                        <p className='text-xs px-4 rounded-full'>{item.payment ? <span className='text-green-500'>Online</span> : <span className='text-yellow-500'>Cash</span>}</p>
                        <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                        <p className='flex flex-cols'>{slotDateFormat(item.slotDate)}   {item.slotTime }</p>
                        <p >{currency}{item.amount}</p>
                        {
                            !item.isCompeleted && item.cancelled ? (
                                <p className='text-red-500'>Cancelled</p>
                            ) : item.isCompeleted && !item.cancelled ?   <p className='text-green-500'>Accepted</p> : (
                                <div className='flex'>
                                    <img className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                                    <img className='w-10 cursor-pointer' onClick={() => appointmentComplete(item._id)} src={assets.tick_icon} alt="" />
                                </div>
                            )
                        }

                        
                        
                    </div>
                ))
            }
        </div>
      
    </div>
  )
}

export default DoctorAppointment

