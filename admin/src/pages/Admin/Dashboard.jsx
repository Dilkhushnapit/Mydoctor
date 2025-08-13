import React from "react";
import { AdminContext } from "../../context/AdminContext";
import { useEffect } from "react";
import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
const Dashboard = () => {
  const { dashData, getDashData, aToken, cancelAppointment } =
    useContext(AdminContext);
  const { slotDateFormat } = useContext(AppContext);
  useEffect(() => {
    if (aToken) {
      getDashData();
    }
  }, [aToken]);
  return (
    dashData && (
      <div>
        <div className="flex flex-wrap gap-3">
          <div className="flex item-center gap-2 bg-white p-4 min-w-52 rounded border-2 cursor-pointer hover:scale-105 transition-all  ">
            <img className="w-14 h-12" src={assets.doctor_icon} alt="" />
            <div>
              <p className="text-xl font-semibold text-gray-600 ">
                {dashData.doctors}
              </p>
              <p className="text-gray-500">Doctors</p>
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
            {dashData.latestAppointments.map((item, index) => (
              <div
                key={index}
                className="flex item-center justify-between  px-4 py-2 border-b"
              >
                <img
                  className="w-10 h-10 bg-gray-400 border rounded-full"
                  src={item.docData.image}
                  alt=""
                />
                <p>{item.docData.name}</p>
                <p>{slotDateFormat(item.slotDate)}</p>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium"> Cancelled</p>
                ) : item.isCompeleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <img
                    onClick={() => cancelAppointment(item._id)}
                    className="w-10 cursor-pointer"
                    src={assets.cancel_icon}
                    alt=""
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default Dashboard;
