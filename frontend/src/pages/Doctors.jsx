import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom'
const Doctors = () => {
  const {speciality}=useParams()
  const {doctors}=useContext(AppContext)
  const [filterDoc,setfilterDoc]=useState([]);
  const [showFilter,setShoFilter]=useState(false)

  const navigate = useNavigate()




  const applyFilter=()=>{
    if(speciality)
    {
      setfilterDoc(doctors.filter(doc => doc.speciality === speciality))
    }
    else{
      setfilterDoc(doctors)

    }

  }
  useEffect(()=>{
    applyFilter()

  },[doctors,speciality])
  return (

    <div>
      <p className='text-gray-600'>Browse through the Doctors Specialist.</p>
       <div className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
        <button className={`sm:hidden py-1 px-3 border border-radius rounded-full cursor-pointer ${showFilter? ' bg-blue-500 text-white ':'' }`} onClick={()=>setShoFilter(prev=>!prev)}>Filters</button>
        <div className={`flex flex-col text-gray-600 gap-4 text-sm ${showFilter?'hidden':''}`}>
          <p onClick={()=>speciality === 'General physician'? navigate('/doctors'): navigate('/doctors/General physician')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "General physician"? "bg-indigo-100 text-black ":" "}`}>General physician</p>
          <p onClick={()=>speciality === 'Gynecologist'? navigate('/doctors'): navigate('/doctors/Gynecologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Gynecologist"? "bg-indigo-100 text-black ":" "}`}>Gynecologist</p>
          <p onClick={()=>speciality === 'Dermatologist'? navigate('/doctors'): navigate('/doctors/Dermatologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Dermatologist"? "bg-indigo-100 text-black ":" "}`}>Dermatologist</p>
          <p onClick={()=>speciality === 'Pediatricians'? navigate('/doctors'): navigate('/doctors/Pediatricians')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Pediatricians"? "bg-indigo-100 text-black ":" "}`}>Pediatricians</p>
          <p onClick={()=>speciality === 'Neurologist'? navigate('/doctors'): navigate('/doctors/Neurologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Neurologist"? "bg-indigo-100 text-black ":" "}`}>Neurologist</p>
          <p onClick={()=>speciality === 'Gastroenterologist'? navigate('/doctors'): navigate('/doctors/Gastroenterologist')}  className={`w-[94vw] sm:w-auto pl-3 py-1.5 border border-gray-300 rounded transition-all cursor-pointer  ${speciality === "Gastroenterologist"? "bg-indigo-100 text-black ":" "}`}>Gastroenterologist</p>
        </div>
        
<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {filterDoc.map((item,index)=>{
               return( 
               <div onClick={()=>navigate(`/appointments/${item._id}`)} key={index} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500'>
                    <img className='bg-blue-50' src={item.image} alt="" />
                    <div className='p-4'>
                        <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : 'text-gray-500'}`}>
                            <p className={`w-2 h-2 ${item.available ? 'bg-green-600' : 'bg-gray-600'} rounded-full`}></p><p>{item.available ? 'Available' : 'Unavailable'}</p>
                        </div>
                        <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                        <p className='text-gray-900 text-sm '>{item.speciality}</p>
                    </div>
                </div>)
            })}
          
        </div>
       </div>
      
      
    </div>
  )
}

export default Doctors
