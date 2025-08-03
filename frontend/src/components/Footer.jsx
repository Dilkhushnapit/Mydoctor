import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className='md:mx-10'>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                {/*left  */}
                <img className='mb-5 w-40' src={assets.logo} alt="" />
                <p className='w-full md:w-2/3 text-gray-600 leading-6'>
                    I have worked on several innovative projects focused on real-world problem solving.
                     My key projects include a personal finance tracker with real-time monitoring and SMS alerts, 
                   ation, and digital design, showcasing both practical skills and creative thinking.
                </p>

            </div>
            <div>
                {/*center  */}
                <p className='text-xl font-medium mb-5'>COMPANY</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>HOME</li>
                    <li>ABOUT US</li>
                    <li>CONTACT US</li>
                    <li>Privacy policy</li>
                </ul>


            </div>
            <div>
                {/*right  */}
                <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
                <ul className='flex flex-col gap-2 text-gray-600'>
                    <li>+918890438714</li>
                    <li>napitdilkhush07@gmail.com</li>
                </ul>


            </div>
        </div>
        {/*    */}
        <div>
        <hr />
        <p className='py-5 text-sm text-center '> 
            Copyright 2025@ MYdoctor- All Rights Reserved

        </p>
        </div>
      
    </div>
  )
}

export default Footer
