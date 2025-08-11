import React from 'react'
import { useEffect } from 'react';

const AllApointment = () => {
  const {atoken,appointments,getAllAppointments,setAppointments}=useContext(AdminContext);
  useEffect(()=>{
    if(atoken)
    {
      getAllAppointments();
    }

  },[atoken])
  return ( 
    <div>
      <p>
        All Apointments
      </p>
      <div>
        <div>
          <p>#</p>

          <p>Patient</p>
          <p>Age</p>

          <p>Date & Time</p>
          <p> Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
      </div>

      
    </div>
  )
}

export default AllApointment
