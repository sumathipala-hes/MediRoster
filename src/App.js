import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Overview, Wards, Calendar, Doctors, Consultants,Login,DoctorPage,ConsultantPage,AdminPage, AddDoctor,ProfilePage, AddConsultant,Schedule,LeaveRequest,SwapShift,SwapRequestsPage,AddPreferences,AddWard,ConsultantShedule,ConsultantAcceptRequest } from "./pages";

import "./App.css";


const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/wards" element={<Wards />} />
        <Route path="/consultant" element={<Consultants />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctorPage" element={<DoctorPage/>} />
        <Route path="/consultantPage" element={<ConsultantPage/>} />
        <Route path="/adminPage" element={<AdminPage/>} />
        <Route path="/addDoctors" element={<AddDoctor/>} />
        <Route path="/addConsultant" element={<AddConsultant/>} />
        <Route path="/profilepage" element={<ProfilePage/>} />
        <Route path="/schedule" element={<Schedule/>} />
        <Route path="/leaveRequest" element={<LeaveRequest/>} />
        <Route path="/swapShifts" element={<SwapShift/>} />
        <Route path="/addPreferences" element={<AddPreferences/>} />
        <Route path="/swapRequests" element={<SwapRequestsPage/>} />
        <Route path="/addWards" element={<AddWard/>} />
        <Route path="/consultantSchedule" element={<ConsultantShedule/>} />
        <Route path="/consultantAcceptRequest" element={<ConsultantAcceptRequest/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
