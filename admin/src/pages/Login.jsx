import React from 'react'
import { assets } from '../../../frontend/src/assets/assets'
import { useState } from 'react'
import { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
function Login() {

    const [state,setstate]= useState('Admin')
    const [email,setEmail]= useState('')
    const [password,setPassword]= useState('')


    const {setAToken,backendUrl}=useContext(AdminContext)

    const onSubmitHandler=async(event)=>{
        event.preventDefault(); 
        try {
            if (state === 'Admin') {
                const {data} =await axios.post(backendUrl+'/api/admin/login',{email,password})
                console.log(data)
                if(data.success)
                { 
                   localStorage.setItem('aToken',data.token)
                   setAToken(data.token)
                }
            else {
               
                toast.error(data.message);
                
            }
        }
        else{

        }
        } catch (error) {
            
        }

    }
    
  return (
<div className="flex justify-center itmes-center h-screen">
        <form onSubmit={(onSubmitHandler)} className=' min-h-[80h] flex itmes-center'>
            <div className=' flex flex-col  gap-3 m-auto  p-8 min-w-[340px] sm:min-w-96 border rounded text-zinc-600 text-sm shadow-lg  '>
                <p className='text-2xl font-semibold'><span className='text-blue-500'>{state}</span> Login</p>
                <div>
                    <p className='w-full'>Email</p>
                    <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-zinc-500 rounded w-full p-2 mt-1' type="email" id="email" autoComplete="email" name="email"  required />
                </div>
                <div>
                    <p className='w-full'>Password</p>
                    <input onChange={(e)=>setPassword(e.target.value)} value={password}  id="password" name="password" type="password"   autoComplete="current-password"  className='border border-zinc-500 rounded w-full p-2 mt-1'  required />
                </div>
                <button className='w-full bg-blue-500 text-white py-2 rounded-md text-base cursor-pointer'>Login</button>
                {
                    state==='Admin'
                    ?
                    <p>Doctor Login ? <span className=' text-blue-500 test-sm cursor-pointer underline' onClick={()=>{setstate('Doctor')}} >Click Here</span></p>
                    :
                    <p>
                        Admin Login ?<span className=' text-blue-500 test-sm cursor-pointer underline' onClick={()=>{setstate('Admin')}}>Click Here</span>
                    </p>
                   
                }
            </div>

        </form>
        </div>

  )
}

export default Login
