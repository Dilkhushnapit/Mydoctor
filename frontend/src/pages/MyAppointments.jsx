import React, { use, useContext, useState,useEffect } from 'react'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'
const MyAppointments = () => {
const {backendUrl,token} = useContext(AppContext)
const [appointments, setAppointments] = useState([])
const months= ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const slotDateFormat = (dateString) => {

  
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
              <p><span className='text-xs mt-1   '>Date&Time: </span   > <span  className='text-xs mt-1 text-neutral-700 font-medium '> {item.slotDate}| {item.slotTime} </span> </p>
            </div>
            <div>
              {/* for resopnsive */}
            </div>
            <div className='flex flex-col gap-2 justify-end'>
              <button className='text-sm text-stone-500 text-center sm:min-w-84 py-2 border rounded hover:bg-blue-500 hover:text-white transition-all duration-300'>Pay Online</button>
              <button className='text-sm text-stone-500 text-center sm:min-w-84 py-2 border rounded hover:bg-red-500 hover:text-white transition-all duration-300'>Cancel appointment</button>
            </div>


          </div>
        ))}
      </div>
    </div>
  )
}

export default MyAppointments
