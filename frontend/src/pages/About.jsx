import React from 'react'
import { assets } from '../assets/assets'

const about = () => {
  return (
    <div>
      <div>
    <div className='text-center text-2xl text-gray-500 '>
      <p className='item-center'>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
    </div>
    <div className='mt-10 flex flex-col md:flex-row gap-12  '>
      <img className='w-full md:max-w-[360px] ' src={assets.about_image } alt="" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-500 '>
        <p>Welcome to MediConnect – your trusted partner in finding 
          the right healthcare professional with ease and confidence.</p>
        <p>At MediConnect, we believe that healthcare should be accessible, convenient, and transparent for everyone. That’s why we’ve built a smart, user-friendly platform that helps you discover top-rated doctors,
             book appointments, and get personalized care without the stress and long waiting times.</p>
        <p className=' text-gray-800 '>Our Mission</p>
        <p>To make healthcare more accessible, efficient, and patient-centered by
           connecting people with the right medical professionals at the right time.</p>

    </div>
    </div>
   
  
    <p className=' py-4 text-xl  text-gray-500 '>WHY <span className='text-gray-800 font-semibold'>CHOOSE US</span> </p>
    </div  >
       <div className='flex flex-col py-2 gap-4 md:flex-row mb-20 '>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5 text-5px hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Trusted and Verified Doctors</b>
          <p>We list only experienced, qualified, and verified medical professionals so you can book with confidence.</p>
        </div>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5 text-5px hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Hassle-Free Booking</b>
          <p>Book appointments instantly — no waiting, no unnecessary paperwork. Just a few clicks and you're done.</p>
        </div>
        <div className='border px-10 md:px-14 py-8 sm:py-16 flex flex-col gap-5 text-5px hover:bg-blue-500 hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Nearby Specialists</b>
          <p>Search by location and find top-rated doctors near you, from general physicians to specialists.</p>
        </div>
      </div>
    </div>

  )
}

export default about
