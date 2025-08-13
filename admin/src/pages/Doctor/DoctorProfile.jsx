import React from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { useEffect,useContext,useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
const DoctorProfile = () => {
  const {dToken, profileData, getProfileData, setProfileData,backendUrl } = useContext(DoctorContext)
  const { currency } = useContext(AppContext)
  const [isEdit, setIsEdit] = useState(false);
  const updateProfile = async () => {
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available
      }
      const {data} = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, { headers: { dToken } });
      if(data.success) {
        toast.success(data.message);
        setIsEdit(false);
        getProfileData(); //for geting updated data
      }
      else{
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };
  useEffect(() => {
    if(dToken) {
      getProfileData();
    }
  }, [dToken]);
  return profileData&&(
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-blue-500/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
        </div>
        <div className='flex-1 border-stone-100 rounded-lg p-8 py-7 bg-white'>
          {/*profile data**/}
          <p className='flex item-center gap-2 text-2xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 text-gray-500'>
            <p>{profileData.degree}-{profileData.speciality}</p>
            <button className='py-0.2 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>
          {/**Doctor About */}
          <div>
            <p className='flex item-center gap-2 text-2xl font-medium text-gray-700'>About</p>
            <p className='text-sm  text-gray-500'>{profileData.about}</p>
          </div>
          <p className='text-gray-500'>Appointment fees : <span className='text-gray-800'>{currency}{isEdit ? <input type="number" value={profileData.fees} onChange={(e) => setProfileData(prev=>({...prev, fees: e.target.value}))} /> : profileData.fees}</span></p>
        <div className='flex  gap-2 py-2'>

          <p>Address:</p>
          <p className='text-sm'>
            { isEdit ? <input type="text" value={profileData.address.line1} onChange={(e) => setProfileData(prev=>({...prev, address: {...prev.address, line1: e.target.value}}))} /> : profileData.address.line1}<br />
          { isEdit ? <input type="text" value={profileData.address.line2} onChange={(e) => setProfileData(prev=>({...prev, address: {...prev.address, line2: e.target.value}}))} /> : profileData.address.line2}</p>
        </div>

        <div className='flex pt-2 gap-2'>
          <input onChange={()=>isEdit && setProfileData(prev=>({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" />
          <label>Available</label>
        </div>
        {

          isEdit
          ?
                  <button onClick={updateProfile} className='px-4 py-1 border border-blue-500 rounded-md mt-5 hover:bg-blue-500 hover:text-white'>Save</button>

          :
                  <button onClick={() => setIsEdit(true)} className='px-4 py-1 border border-blue-500 rounded-md mt-5 hover:bg-blue-500 hover:text-white'>Edit</button>

        }

        </div>

        

      </div>
    </div>
  )
}

export default DoctorProfile
