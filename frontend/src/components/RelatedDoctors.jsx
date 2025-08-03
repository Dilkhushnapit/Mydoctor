import React, { useContext, useEffect } from 'react'
import { AppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'



const RelatedDoctors = ({speciality,docId} ) => {
const {doctors} =useContext(AppContext)
const [relDoc,setRelDoc]=useState([ ])
const navigate=useNavigate()

console.log(docdata)
useEffect(()=>{
     if(doctors.length>0 && speciality)
     {
        const doctorsData  = doctors.filter((doc)=>doc.speciality === speciality && doc._id !== docId)
        setRelDoc(doctorsData)
     }

}
,[doctors,speciality,docId])
console.log(relDoc)



  return (
    
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10 '>
        <h1 className='text-3xl font-medium'>Top Doctors</h1>
        <p className='sm:w-l/3 text-center text-sm'>Simple browser through our extensive list of trusted Doctors</p>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'  style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
            {relDoc.slice(0,5).map((item,index)=>{
               return( 
               <div onClick={()=>{navigate(`/appointments/${item._id}`); scrollTo(0,0)}} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                            <p className='w-2 h-2 bg-green-600 rounded-full'></p><p>Available</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-900 text-sm '>{item.speciality}</p>
                    </div>
                </div>)
            })}
        </div>
      <button onClick={()=>{navigate('/doctors'); scroll(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer'>More</button>
    </div>  ) 
}

export default RelatedDoctors
