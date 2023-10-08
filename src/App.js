import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Adminlinks } from "./data/dummy.js";
import {
  Overview,
  Wards,
  Calendar,
  Doctors,
  Consultants,
  Login,
  DoctorPage,
  ConsultantPage,
  AdminPage,
  AddDoctor,
  ProfilePage,
  AddConsultant,
  Schedule,
  LeaveRequest,
  SwapShift,
  SwapRequestsPage,
  AddPreferences,
  AddWard,
  ConsultantShedule,
  ConsultantAcceptRequest,
  ViewWards,
  ViewDoctors,
  ShiftManagement,
  CreateSchedule,
} from "./pages";

import "./App.css";
import { useStateContext } from "./contexts/ContextProvider";
import Home from "./pages/Home";
import { Consultantlinks, Doctorlinks } from "./data/dummy.js";

const App = () => {
  const { user } = useStateContext();
  let array=[];
  
 

    console.log(user)
  
    if(user){
      if (user.role === "consultant") {
        array=Consultantlinks;
      } else if (user.role === "admin") {
        array=Adminlinks;
        console.log(array);
      } else if (user.role === "doctor") {
        array=Doctorlinks;
      }
    }
      
    
 
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home Links={array}/>} />
        <Route path="/overview" element={<Overview Links={array}/>} />
        <Route path="/wards" element={<Wards Links={array} />} />
        <Route path="/consultant" element={<Consultants Links={array} />} />
        <Route path="/doctors" element={<Doctors Links={array} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctorPage" element={<DoctorPage Links={array}/>} />
        <Route path="/consultantPage" element={<ConsultantPage Links={array}/>} />
        <Route path="/adminPage" element={<AdminPage Links={array}/>} />
        <Route path="/addDoctors" element={<AddDoctor Links={array}/>} />
        <Route path="/addConsultant" element={<AddConsultant Links={array}/>} />
        <Route path="/profilepage" element={<ProfilePage Links={array}/>} />
        <Route path="/schedule" element={<Schedule Links={array}/>} />
        <Route path="/leaveRequest" element={<LeaveRequest Links={array}/>} />
        <Route path="/swapShifts" element={<SwapShift Links={array}/>} />
        <Route path="/addPreferences" element={<AddPreferences Links={array}/>} />
        <Route path="/swapRequests" element={<SwapRequestsPage Links={array}/>} />
        <Route path="/addWards" element={<AddWard Links={array}/>} />
        <Route path="/consultantSchedule" element={<ConsultantShedule Links={array}/>} />
        <Route path="/viewWards" element={<ViewWards Links={array}/>} />
        <Route path="/viewDoctors" element={<ViewDoctors Links={array}/>} />
        <Route path="/shiftManagement" element={<ShiftManagement Links={array}/>} />
        <Route path="/createSchedule" element={<CreateSchedule Links={array}/>} />
        <Route
          path="/consultantAcceptRequest"
          element={<ConsultantAcceptRequest Links={array}/>}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
