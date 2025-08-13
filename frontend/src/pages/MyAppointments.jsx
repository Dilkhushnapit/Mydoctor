import React, { use, useContext, useState,useEffect } from 'react'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const MyAppointments = () => {
const {backendUrl,token,getDoctorsData} = useContext(AppContext)
const [appointments, setAppointments] = useState([])

const navigate=useNavigate([])
const months= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const slotDateFormat = (slotDate) => {
  const dateArray=slotDate.split('_');
  return dateArray[0]+' '+months[Number(dateArray[1])-1]+' '+dateArray[2];
}


const getUserAppointments = async () => {
  try {
    const {data}= await axios.get( backendUrl+ '/api/user/appointments', {headers: {token}})
    if(data.success){
      setAppointments(data.appointments.reverse())
      console.log(data.appointments)
    }

    
  } catch (error) {
      console.log(error)
      toast.error(error.message)
    
  }
}
useEffect(() =>{
  if(token){
    getUserAppointments()
  }

},[token])

const cancelAppointment=async(appointmentId)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/user/cancel-appointment',{appointmentId},{headers:{token}})
    if(data.success)
     {
    toast.success(data.message);
    
    getUserAppointments()
    getDoctorsData();

 }
    else
    {
      console.log(data.message)
      toast.error(data.message);
    }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
    
  }

}
const initPay=(order)=>{
  const options={
    key:import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount:order.amount,
    currency:order.currency,
    name:'Appointment Payement',
    description:'Appointment Payement',
    order_id:order.id,
    receipt:order.receipt,
    handler:async (response)=>{
      console.log(response);
      try {
        const {data}=await axios.post(backendUrl+'/api/user/verify-razorpay',response,{headers:{token}})
        if(data.success){
          getUserAppointments();
          navigate('/my-appointments');
        }
        else{
          toast.error(data.message);
        }

      } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
      }
    }

  }
  const rzp = new window.Razorpay(options)
  rzp.open(); 

}
const appointmentRazorpay=async(appointmentId)=>{
  try {
    const {data}=await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
  if(data.success){
    console.log(data.order)
    initPay(data.order)

  }
  else{
    console.log(data.message)
    toast.error(data.message);
  }
    
  } catch (error) {
    console.log(error)
    toast.error(error.message);
    
  }
}





  return (
    <div>
      <p className='pb-3 mt-2 font-medium text-zinc-800 border-b'>MY Appointment</p>
      <div>
        {appointments.map((item,index)=>(
          <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b border-gray-200 py-2' key={index}>
            <div>
              <img className=' w-32 bg-indigo-50' src={item.docData.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-800'>
              <p className='text-neutral-800 font-semibold'>{item.docData.name}</p>
              <p>{item.docData.speciality  }</p>
              <p className='text-zinc-700 font-medium mt-1 '>Address:</p>
              <p className='text-xs '>{item.docData.address.line1}</p>
              <p className='text-xs '>{item.docData.address.line2}</p>
              <p><span className='text-xs mt-1   '>Date&Time: </span   > <span  className='text-xs mt-1 text-neutral-700 font-medium '> {slotDateFormat(item.slotDate)}| {item.slotTime} </span> </p>
            </div>
            <div>
              {/* for resopnsive */}
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              {!item.cancelled && !item.payment && !item.isCompeleted && <button onClick={() => appointmentRazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-84 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300'>Pay Online</button>}
              {!item.cancelled && item.payment && !item.isCompeleted && <button className='text-sm text-stone-500 text-center sm:min-w-84 py-2 border rounded bg-blue-200 font-bold '>Paid</button>}

              {!item.cancelled && !item.isCompeleted && <button onClick={() => cancelAppointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-84 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel appointment</button>}
              {item.cancelled && !item.isCompeleted && <button className='text-sm  text-center sm:min-w-84 py-2 border rounded bg-white text-red-500'>Cancelled Appointment</button>}
              {item.isCompeleted && <button className='text-sm  text-center sm:min-w-84 py-2 border rounded bg-white text-green-500'>Appointment Completed</button>}
            </div>


          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
