import React from 'react'
import { assets } from '../assets/assets'

const contact = () => {
  return (
    <div>
      <p className='text-center text-gray-500 text-xl '>CONTACT <span className='text-gray-800 font-semibold'>US</span></p>
      <div className='flex flex-col md:flex-row gap-6 py-10 mb-10 text-sm justify-center'>
        <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
        <div className='flex flex-col gap-4 item-start justify-center '>
          <p className=' text-gray-600 font-semibold text-lg '>OUR OFFICE</p>
          <p className='test-gray-400 text-sm '>Near Landmark City  Kota, Rajasthan - 324005  India</p>
          <p className='test-gray-400 text-sm '>Tel:+9123894</p>
          <p className='test-gray-400 text-sm '>Email:napitdilkhush07@gmail.com</p>
          <p className='test-gray-600 text-medium  text-lg'>Career At My Doctor</p>
          <p className='test-gray-400 text-sm '>Lear More About are Teams and Jobs Openings.</p>
          <button className='border border-gray-600 px-2 py-2  text-sm hover:bg-black hover:text-white transition-all duration-500 cursor-pointer'>Explore Jobs</button>
        </div>
        
      </div>
      
    </div>
  )
}

export default contact
