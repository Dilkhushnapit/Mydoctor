import { useState } from 'react'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/Appcontext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Myprofile = () => {
    // const [userData,setUserData]=useState({
    //     name:'dilkhush',
    //     image:assets.profile_pic,
    //     email:'napitdilkhsuh@gamil.com',
    //     phone:'+919988334454',
    //     address:{
    //         line1:'solt lake ',
    //         line2:'kolkata bengol'
    //     },
    //     gender:'Male',
    //     dob:'2005-06-24'

    // })
    const {userData,setUserData,token,backendUrl,loadUserProfileData}=useContext(AppContext)
    const [isEdit,setIsEdit]=useState(false)
    const [image,setImage]=useState(false)
    const updateUserProfileData=async()=>{
        try {
            const formData= new FormData()
            formData.append('name',userData.name)
            formData.append('phone',userData.phone)
            formData.append('address',JSON.stringify(userData.address))
            formData.append('gender',userData.gender)
            formData.append('dob',userData.dob)

            image && formData.append('image',image)

            const {data}= await axios.post(backendUrl+'/api/user/update-profile',formData,{headers:{token}})
            if(data.success)
            {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            }
            else
            {
                toast.error(data.message)
            }

            
        } catch (error) {
            console.log(error)
            toast.error(error.message)
            
        }


    }


  return userData && (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
        {
            isEdit?
            <label  htmlFor="image">
                <div className=' inline-box relative cursor-pointer'>
                    <img className='w-36 rounded opacity-75' src={image? URL.createObjectURL(image):userData.image} alt="" />
                    <img className='w-10 abolute bottom-10 right-12' src={image? '':assets.upload_icon} alt="" />
                </div>
                <input onChange={(e)=>setImage(e.target.files[0])} type="file" id='image' hidden />
            </label>
            :
            <img  className='w-36 boder-radius  ' src={userData.image} alt="" />
            

        }
        
        {
            isEdit ?
            <input className='bg-gray-100 text-2xl font-medium  max-w-60 mt-4 boder-gray-800' type="text" value={userData.name} onChange={e=>setUserData(prev=>({...prev,name:e.target.value}))} />
            :<p className='font-medim text-3xl text-neural-800 mt-4'>{userData.name}</p>
            

        }
        <hr className='bg-zinc-400 bg-none h-[1px]'/>
        <div>
            <p className='text-xl text-gray-600 font-medium underline  '>CONTACT INFORMATION</p>
            <div className='  grid grid-cols-[1fr_3fr] gap-y-2.5 mt-top text-neural-500'>
                <p className='font-medium'>
                    Email Id:
                </p>
                <p className='text-blue-500 '>{userData.email}</p>
                <p className='font-medium'>Phone:</p>
                {
                isEdit ?
                <input className='bg-gray-50 font-small  max-w-40 boder-gray-800' type="text" value={userData.phone} onChange={e=>setUserData(prev=>({...prev,phone:e.target.value}))} />
                :<p>{userData.phone}</p>
                }
                <p className='font-medium'>Address:</p>
                 {
                isEdit ?
               <p>
                <input className='bg-gray-50' type="text" value={userData.address.line1} onChange={(e)=>{setUserData(prev=>({...prev,address:{...prev.address,line1:e.target.value }}))}} />
                <br />
                <input className='bg-gray-50' type="text" value={userData.address.line2} onChange={(e)=>{setUserData(prev=>({...prev,address:{...prev.address,line2:e.target.value }}))}} />
               </p>

                :<p className='text-gray-800 '>{userData.address.line1} <br /> <p>{userData.address.line2}</p></p>
                }
            </div>
            <div>
                <p  className='text-xl text-gray-600 font-medium underline  '>Basic Informationa</p>
            <div className='  grid grid-cols-[1fr_3fr] gap-y-1 mt-top text-neural-500 max-w-60 gap-20 '>
                     <p className='font-medium'>Gender:</p>
                     {
                isEdit ?
                <select className='max-w-20 bg-gray-100' onChange={(e)=>{setUserData(prev=>({...prev,gender:e.target.value}))}} value={userData.gender }>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
                :<p className='font-medium text-gray-700'>{userData.gender}</p>
                }

                <p className='font-medium'>Brith Day</p>
                {
                    isEdit ?
                    <input className='max-w-28 bg-gray-100' type="Date" onChange={(e)=>{setUserData(prev=>({...prev,dob:e.target.value}))}} value={userData.dob} />
                    
                    :
                    <p className='text-gray-700'>{userData.dob}</p>
                }
                
                

                </div>
            </div>
        </div>
        <div className='mt-10'>
            {
                isEdit?
                <button className='border border--blue-500 px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition all duration-200' onClick={updateUserProfileData}>Save Information</button>
                 :
                <button className='border border--blue-500 px-5 py-2 rounded-full hover:bg-blue-500 hover:text-white transition all duration-200' onClick={()=>setIsEdit(true)}>Edit</button>
            }
        </div>
      
    </div>
  )
}

export default Myprofile
