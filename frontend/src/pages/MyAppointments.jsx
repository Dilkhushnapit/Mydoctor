import React, { useContext, useState } from 'react'
import { AppContext } from '../context/Appcontext'

const MyAppointments = () => {
const {doctors} = useContext(AppContext)

  return (
    <div>
      <p className='pb-3 mt-2 font-medium text-zinc-800 border-b'>MY Appointment</p>
      <div>
        {doctors.slice(0,5).map((item,index)=>(
          <div className='grid grid-col-[1fr_2fr] gap-4 sm:flex sm:gap-6 border-b border-gray-200 py-2' key={index}>
            <div>
              <img className=' w-32 bg-indigo-50' src={item.image} alt="" />
            </div>
            <div className='flex-1 text-sm text-zinc-800'>
              <p className='text-neutral-800 font-semibold'>{item.name}</p>
              <p>{item.speciality  }</p>
              <p className='text-zinc-700 font-medium mt-1 '>Address:</p>
              <p classname='text-xs '>{item.address.line1}</p>
              <p classname='text-xs '>{item.address.line2}</p>
              <p><span className='text-xs mt-1   '>Date&Time: </span   > <span  className='text-xs mt-1 text-neutral-700 font-medium '> 25,july,2025| 8:30 </span> </p>
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
