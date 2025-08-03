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
const App = () => {

  const {aToken} = useContext(AdminContext)
  return aToken?(
    <div className='bg-[#F8F9FD]' >
     <ToastContainer/>
     <Navbar/>
     <div className='flex itmes-start'>
      <Sidebar/>
      <Routes>
        <Route path='/' element={<></>}/>
        <Route path='/admin-dashboard' element={<Dashboard/>}/>
        <Route path='/doctor-list' element={<DoctorsList/>}/>
        <Route path='/all-apointment' element={<AllApointment/>}/>
        <Route path='/add-doctor' element={<AddDoctor/>}/>
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
