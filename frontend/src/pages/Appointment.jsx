import React, { useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/Appcontext'
import { useState } from 'react'
import { assets } from '../assets/assets'
import RelatedDoctors from '../components/RelatedDoctors'
import { toast } from 'react-toastify'
import axios from 'axios'
const Appointment = () => {
  const {docId}=useParams()
  const { doctors,currencySymbol,backendUrl,token,getDoctorsData }=useContext(AppContext)
  const daysOfWeek=['SUN','MON','TUS','WED','THU','FRI','SAT']

  const [docInfo,setDocInfo]=useState(null)
  const[docSlots,setDocSlots]=useState([])
  const [slotIndex,setSlotIndex]=useState(0)
  const [slotTime,setSlotTime]=useState(' ')
  const navigate=useNavigate()


  const fetchDocInfo = async() =>{
     const docInfo= doctors.find(doc=> doc._id== docId)
     setDocInfo(docInfo)
  }

const getAvailableSort = async()=>{

  setDocSlots([]);
  let today=new Date();
  for(let i=0;i<7;i++)
  {
    let currentDate=new Date(today)
    currentDate.setDate(today.getDate()+i)


    let endTime=new Date()
    endTime.setDate(today.getDate()+i)
    endTime.setHours(21,0,0,0)

//setting hours
    if(today.getDate() === currentDate.getDate())
    {
      currentDate.setHours(currentDate.getHours()>10?currentDate.getHours()+1 : 10)
      currentDate.setMinutes(currentDate.getMinutes()>30 ? 30 : 0)
    }
    else{

      currentDate.setHours(10)
      currentDate.setMinutes(0)
    }

    let timeSlot=[]
    while(currentDate < endTime)
    {
      let formattedTime=currentDate.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})

      //add slot to array
      timeSlot.push(
        {
          dateTime: new Date(currentDate),
          time: formattedTime
        }
       
      )

       //incrememt time by 30 miniutes
        currentDate.setMinutes(currentDate.getMinutes()+30)
    }
    setDocSlots(prev => ([...prev,timeSlot]))

  }
}

const bookAppointment=async()=>{
  if(!token)
  {
    toast.warn('login to Book Appointment')
    return navigate('/login')
  }
  try {
    const date=docSlots[slotIndex][0].dateTime
    console.log(date)
    
    let day=date.getDate()
    let month=date.getMonth()+1
    let year=date.getFullYear()
    const slotDate=day+"_"+month+"_"+year
    const{data}=await axios.post(backendUrl+'/api/user/book-appointment',{docId,slotDate,slotTime},{headers:{token}})
    if(data.success){
      toast.success(data.message)
      getDoctorsData()
      console.log('check')
      navigate('/my-appointments')
    }
    else{
      console.log('check')
      toast.error(data.message)
    }

    
    
  } catch (error) {
    console.log(error)
    toast.error(error.message)
  }
}

useEffect(()=>{
getAvailableSort()
},[docInfo])


  useEffect(()=>{
    fetchDocInfo()
  },[doctors,docId])


  useEffect(()=>{

  },[docSlots])


  return  docInfo && (
    <div>
      <div className='flex flex-col flex-row gap-4'>
        <div>
         <img className='bg-blue-500 w-full sm:max-w-74 rounded-lg ' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80] sm:mt-0' >
          {/*   docters information   */}
          <p className='flex item-center gap-2 text-2xl font-medium  text-gray-900'>
            {docInfo.name} <img  className='w-5' src={assets.verified_icon} alt="" /></p>
          <div className='flex item-center gap-2 text-sm mt-1 text-gray -600   '>
            <p>{docInfo.degree}-{docInfo.speciality}</p>
            <button className='py-0.5 px-2  border text-xs rounded-full '>{docInfo.experience}</button>
          </div>
              {/*   docters about  */}
          <div>

            <p className='flex item-center gap-1 text-sm font-medium text-gray-900 mt-3 '>
              About
              <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1 '>
              {docInfo.about}
            </p>

          </div>
          <p className='text-gray-500 font-medium mt-4'>Appointment Fees: <span className='text-gray-600'>   { currencySymbol}{docInfo.fees}</span></p>
        


        </div>
      </div>

      {/*booking slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-600 '>
        <p>
          Booking Slots
        </p>
        <div className='flex gap-3 item-center w-full overflow-x-scroll mt-4 '>
          {
            docSlots.length && docSlots.map((item,index)=>(
              <div onClick={()=>(setSlotIndex(index))} key={index} className={`text-center py-6  min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-blue-500 text-white ': ' border border-gray-600'}`}>
                <p>{item[0]&& daysOfWeek[item[0].dateTime.getDay()]}</p>
                <p>{item[0] && item[0].dateTime.getDate()}</p>


              </div>
            ))
          }
        </div>
        <div className='flex item-center w-full gap-3 overflow-x-scroll mt-4 '>

          {docSlots.length && docSlots[slotIndex].map((item,index)=>
          <p onClick={()=>(setSlotTime(item.time))} className={`text-sm font-light flex-shrink -0 px-5 py-2 rounded-full cursor-pointer ${ item.time === slotTime ? 'bg-blue-500 text-white' : 'text-gray-400 border border-gray-300'}`} key={index}>
            {item.time.toLowerCase()}

          </p>
          )}
        </div>
        <button onClick={bookAppointment} className='bg-blue-500 text-white text-sm font-light px-14 py-3 rounded-full my-6 cursor-pointer '>
          Book An Appointment
        </button>

      </div>
      {/** Listed related docters */}
     
      


      
    </div>
  )
}

export default Appointment
