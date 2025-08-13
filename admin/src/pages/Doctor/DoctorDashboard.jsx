import React from 'react'
import { useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { useContext } from 'react';
import { assets } from '../../assets/assets.js';
import { AppContext } from '../../context/AppContext.jsx';
const DoctorDashboard = () => {
  const {dToken, dashData, getDashData ,setDashData,cancelAppointment,appointmentComplete} = useContext(DoctorContext);
  const {currency,slotDateFormat}=useContext(AppContext)
  useEffect(() => {
    if(dToken)
   { getDashData();}
  }, [dToken]);
  return (
    <div>
      <h1 className='text-xl font-semibold py-2'>Doctor Dashboard</h1>
      {dashData ? (
        <div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all  ">
                    <img className="w-14 h-12" src={assets.earning_icon} alt="" />
                    <div>
                      <p className="text-xl font-semibold text-gray-600 ">
                       {currency} {dashData.earning}
                      </p>
                      <p className="text-gray-500">Earnig</p>
                    </div>
                  </div>
        
                  <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all  ">
                    <img className="w-14 h-12" src={assets.appointments_icon} alt="" />
                    <div>
                      <p className="text-xl font-semibold text-gray-600 ">
                        {dashData.appointments}
                      </p>
                      <p className="text-gray-500">Appointments</p>
                    </div>
                  </div>
        
                  <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all  ">
                    <img className="w-14 h-12" src={assets.patients_icon} alt="" />
                    <div>
                      <p className="text-xl font-semibold text-gray-600 ">
                        {dashData.patients}
                      </p>
                      <p className="text-gray-500">patients</p>
                    </div>
                  </div>
                  
                  

                </div>
                <div className="bg-white">
                            <div className=" flex item-center gap-2 px-4 py-2 mt-6 rounded-t border">
                              <img src={assets.list_icon} alt="" />
                              <p className="font-semibold">Latest Booking</p>
                            </div>
                            <div className="pt-4 border-t-0">
                              {dashData.latestAppointment.map((item, index) => (
                                <div key={index} className="flex item-center justify-between  px-4 py-2 border-b">
                                  <img className="w-10 h-10 bg-gray-400 border rounded-full" src={item.userData.image} alt="" />
                                  <p>{item.userData.name}</p>
                                  <p>{slotDateFormat(item.slotDate)}</p>
                                  {
                                                              !item.isCompeleted && item.cancelled ? (
                                                                  <p className='text-red-500'>Cancelled</p>
                                                              ) : item.isCompeleted && !item.cancelled ?   <p className='text-green-500'>Accepted</p> : (
                                                                  <div className='flex'>
                                                                      <img className='w-10 cursor-pointer' onClick={() => cancelAppointment(item._id)} src={assets.cancel_icon} alt="" />
                                                                      <img className='w-10 cursor-pointer' onClick={() => appointmentComplete(item._id)} src={assets.tick_icon} alt="" />
                                                                  </div>
                                                              )
                                                          }
                                </div>
                              ))}
                            </div>
                          </div>

                
              </div>
      ) : (
        <p>No dashboard data available</p>
      )}
    </div>
  )
}

export default DoctorDashboard
