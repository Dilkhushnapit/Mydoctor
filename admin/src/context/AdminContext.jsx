import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
export const AdminContext = createContext();

const AdminContextProvider = (props) => {
  const [aToken, setAToken] = useState(
    localStorage.getItem("aToken") ? localStorage.getItem("aToken") : ""
  );
  const backendUrl = 'https://mydoctor-backend-1vlk.onrender.com';//   import.meta.env.VITE_BACKEND_URL
  const [allDoctors, setallDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
const [dashData, setDashData] = useState(false)
  const getAllDoctors = async () => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/all-doctors",
        {},
        { headers: { aToken } }
      );

      if (data.success) {
        setallDoctors(data.doctors);
        console.log(data.doctors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const changeAvailability = async (docId) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/admin/change-availability",
        { docId },
        { headers: { aToken } }
      );
      if (data.success) {
        toast.success(data.message);
        getAllDoctors();
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const getAllAppointments=async()=>{
    try {
       const {data}=await axios.get(backendUrl+'/api/admin/appointments',{headers:{aToken}})
         if(data.success)
         {
            console.log("check")

            setAppointments(data.appointments)
            console.log(data.appointments)
            
            
         }
         else{
            toast.error(data.message)
         }

        
    } catch (error) {
        console.log(error)  
        toast.error(error.message)
        
    }

  }
  const calculateAge=(dob)=>{
    const today=new Date();
    const birthDate=new Date(dob);
    let age=today.getFullYear()-birthDate.getFullYear();
    
    return age;
  }
  const cancelAppointment =async (appointmentId) => {

    try {
        const {data}= await axios.post(backendUrl+'/api/admin/cancel-appointment',{appointmentId},{headers:{aToken}})
        if(data.success)
        {
            toast.success(data.message);
        }
        else
        {
            toast.error(data.message);
            getAllAppointments();
        }

    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  }
const getDashData=async()=>{
    try {
        const { data } = await axios.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } });
        if (data.success) {
            setDashData(data.dashData);
            console.log(data.dashData);
        } else {
            toast.error(data.message);
        }
    } catch (error) {
        console.log(error);
        toast.error(error.message);
    }
}

  const value = {
    aToken,
    setAToken,
    backendUrl,
    allDoctors,
    getAllDoctors,
    changeAvailability,
    appointments,
    setAppointments,
    getAllAppointments,
    calculateAge,
    cancelAppointment,
    dashData,
    getDashData
  };
  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
