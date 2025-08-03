import React,{useState} from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import contact from '../pages/Contact';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
const Navbar = () => {
    const navigate=useNavigate();
    const [showMenu,setshowMenu]=useState(false);
    const {token,setToken,userData}=useContext(AppContext)//for login
    const logout=()=>
    {
        setToken(false)
        localStorage.removeItem('token')
    }

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-grey-400'>

        
        <img onClick={()=>{navigate('/')}} className={`w-44 cursor-pointer ` } src={assets.logo} alt="" />
        <ul className=' hidden md:flex items-start gap-5 font-medium'>
            <NavLink to='/'>
                <li   className='py-1'>HOME</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/doctors' >
                <li  className='py-1'>ALL DOCOTORS</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/about'>
                <li  className='py-1'>ABOUT</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
            <NavLink to='/contact'>
                <li  className='py-1'>CONTACTS</li>
                <hr className='border-none outline-none h-0.5 bg-blue-500 w-3/5 m-auto hidden'/>
            </NavLink>
          
        </ul>
        <div className='flex item-center gap-4'>
           { 
           token && userData?
           <div className='flex item-center gap-2 cursor-pointer group relative'>
            <img className='w-8 rounded-full' src={userData.image} alt="" />
            <img className='w-2.8' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base front-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4'>
                    <p onClick={()=>{navigate('my-profile')}} className='hover:text-black cursor-pointer'>Myprofile</p>
                    <p onClick={()=>{navigate('my-appointments')}}  className='hover:text-black cursor-pointer' >MyAppointment</p>
                    <p onClick={logout} className='hover:text-black cursor-pointer'>LogOut</p>
                </div>
               
            </div>
           </div>:<button onClick={()=>{navigate('/login')}} className='bg-blue-500 text-white px-8 py-3 rounded-full front-light hidden md:block'>Create accout</button>
            }
            <img onClick={()=>setshowMenu(true)} className='w-6 md:hidden ' src={assets.menu_icon} alt="" />
            {/**mobile menu */}
            <div className={`${showMenu? 'fixed w-full h-full ':'h-0 w-0 '} md:hidden right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all `}>
                <div className='flex item-center justify-between px-5 py-5'>
                    <img className=' w-36'src={assets.logo} />
                    <img className='w-7' onClick={()=>setshowMenu(false)} src={assets.cross_icon} />
                </div>
                <ul  className='flex flex-col itme-center justify-center  gap-2 mt-5 px-5 text-lg font-medium '>
                <NavLink className='py-2 px-4 rounded-full inline-block' onClick={()=>{setshowMenu(false)}} to={'/'}><p>HOME</p></NavLink>
                <NavLink className='py-2 px-4 rounded-full inline-block' onClick={()=>{setshowMenu(false)}} to={'doctors'}><p>ALL DOCTORS</p> </NavLink>
                <NavLink className='py-2 px-4 rounded-full inline-block' onClick={()=>{setshowMenu(false)}}to={'/about '}><p>ABOUT</p></NavLink>
                <NavLink className='py-2 px-4 rounded-full inline-block' onClick={()=>{setshowMenu(false)}}to={'/contact'}><p>CONTACTS</p></NavLink>
            </ul>
            </div>
            

        </div>
      
    </div>
  )
}

export default Navbar
