import React from "react";
import Doctors from "./pages/Doctors";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import MyAppointments from "./pages/MyAppointments";
import { Route, Routes } from "react-router-dom";
import Myprofile from "./pages/Myprofile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import "./index.css";
import Footer from "./components/Footer";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
      <ToastContainer/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:speciality" element={<Doctors />} />

        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/my-appointments" element={<MyAppointments />} />
        <Route path="/appointments/:docId" element={<Appointment />} />
        <Route path="/my-profile" element={<Myprofile />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
