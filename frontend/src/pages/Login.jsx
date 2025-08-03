import React, { useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import {toast} from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {
  const {backendUrl,token,setToken} =useContext(AppContext)
  const [state,setState]=useState('Sign Up')
  const [name,setName]=useState('')
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const navigate = useNavigate()
   const onSubmitHandler = async(event)=>{
    event.preventDefault()
    try {
      if (state=='Sign Up') {
        const {data}=await axios.post(backendUrl+'/api/user/register',{name,password,email})
        if(data.success)
        {
          localStorage.setItem('token',data.token)
          setToken(data.token)

        }
        else
        {
          toast.error(data.message)
        }
      } else {
        const {data}=await axios.post(backendUrl+'/api/user/login',{password,email})
        if(data.success)
        {
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }
        else
        {
          toast.error(data.message)
        }
        
      }
      
    } catch (error) {
      toast.error(error.message)
      
    }
   }
   useEffect(()=>{
    if(token)
    {
      navigate('/')
    }

   },[token])


  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80hv] flex items-center '>
      <div className='flex flex-col gap-3 m-auto item-start p-8 min-w-[340px] sm:min-w-96 border border rounded text-zinc-600 text-sm shadow-lg   '>
        <p className='text-2xl font-semibold'>
          {state==='Sign Up'? "Create Account": 'LogIn'}
        </p>
        <p>Please {state==='Sign Up'? "Sign Up": 'log in' }  to book an appointment</p>
        {
          state === 'Sign Up' &&   <div> 
          <p className='w-full'>Full Name</p>
          <input className='border border-zinc-500 rounded w-full p-2 mt-1' type="text" onChange={(e)=>{setName(e.target.value)}} value={name} required/>
        </div>
        }
      
        <div>
          <p className='w-full'>Email</p>
          <input className='border border-zinc-500 rounded w-full p-2 mt-1' type="email" onChange={(e)=>{setEmail(e.target.value)}} value={email} required/>
        </div>
        <div>
          <p className='w-full'>Password</p>
          <input className='border border-zinc-500 rounded w-full p-2 mt-1' type="password" onChange={(e)=>{setPassword(e.target.value)}} value={password} required/>
        </div>
        
        <button type='submit' className='w-full bg-black text-white py-2 rounded-md text-base cursor-pointer hover:bg-blue-500 hover:text-white active:scale-95 transition-transform duration-100 '>  {state==='Sign Up'? "Create Account": 'LogIn'}</button>
        {
          state==='Sign Up'
          ?
          <p className='cursor-pointer text-blue ' onClick={()=>{setState('Log in')}}>Alredy have an account? <span className='text-blue-500 underline font-semibold'>login Here</span></p>
          :<p className='cursor-pointer' onClick={()=>{setState('Sign Up')}} >Create An account <span className='text-blue-500 underline font-semibold'>Click Here</span> </p>
        }

      </div>
    </form>
  )
}

export default Login
