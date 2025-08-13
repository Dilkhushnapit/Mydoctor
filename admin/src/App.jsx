import React, { useContext } from 'react'
import Login from './pages/Login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext.jsx';
import Navbar from './components/Navbar.jsx';
import Sidebar from './components/Sidebar.jsx';
import { Routes,Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard.jsx';
import AllApointment from './pages/Admin/AllApointment.jsx';
import DoctorsList from './pages/Admin/DoctorsList.jsx';
import AddDoctor from './pages/Admin/AddDoctor.jsx';
import { DoctorContext } from './context/DoctorContext.jsx';
import DoctorDashboard from './pages/Doctor/DoctorDashboard.jsx';
import DoctorProfile from './pages/Doctor/DoctorProfile.jsx';
import DoctorAppointment from './pages/Doctor/DoctorAppointment.jsx';
const App = () => {

  const {aToken} = useContext(AdminContext)
  const {dToken} = useContext(DoctorContext);
  return aToken || dToken ? (
    <div className='bg-[#F8F9FD]' >
     <ToastContainer/>
     <Navbar/>
     <div className='flex itmes-start'>
      <Sidebar/>
      <Routes>
        {/**Admin Routes */}
        <Route path='/' element={<Dashboard/>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/doctor-list' element={<DoctorsList/>}/>
        <Route path='/all-apointment' element={<AllApointment/>}/>
        <Route path='/add-doctor' element={<AddDoctor/>}/>
        {/**Doctor Routes */}
        <Route path='/doctor-dashboard' element={<DoctorDashboard/>}/>
        <Route path='/doctor-profile' element={<DoctorProfile/>}/>
        <Route path='/doctor-appointment' element={<DoctorAppointment/>}/>
      </Routes>
     </div>

    </div>
  )
  :
  (
    <>
    <Login/>
     <ToastContainer/>
    </>
  )
}

export default App
