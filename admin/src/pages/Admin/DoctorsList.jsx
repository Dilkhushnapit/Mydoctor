import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorsList = () => {
  const{allDoctors,aToken,getAllDoctors,changeAvailability}=useContext(AdminContext)
    
  useEffect(()=>{
    if(aToken)
    {
      getAllDoctors()
    }
  },[aToken])
  return (
  
    <div className='m-5 max-h-[90vh] overflow-y-scroll '>
        <h1>All Doctors</h1>
<div className='w-full flex flex-wrap grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {allDoctors.map((item,index)=>{
            return(<div id={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer  '>
              <img className='bg-blue-50 hover:bg-blue-500 transition-all duration-500  ' src={item.image} alt="" />
              <div className='gap-3 px-3'>
                <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                <p className='text-gray-900 text-sm '>{item.speciality}</p>
                <div className=' flex gap-1 items-center '>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
                  <p>Available</p>
                </div>

              </div>
            </div>)

          })}
        </div>
      
      
    </div>
  
  )
}

export default DoctorsList
