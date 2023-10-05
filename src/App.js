import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const App = () => {
  const { user } = useStateContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/wards" element={<Wards />} />
        <Route path="/consultant" element={<Consultants />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctorPage" element={<DoctorPage />} />
        <Route path="/consultantPage" element={<ConsultantPage />} />
        <Route path="/adminPage" element={<AdminPage />} />
        <Route path="/addDoctors" element={<AddDoctor />} />
        <Route path="/addConsultant" element={<AddConsultant />} />
        <Route path="/profilepage" element={<ProfilePage />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/leaveRequest" element={<LeaveRequest />} />
        <Route path="/swapShifts" element={<SwapShift />} />
        <Route path="/addPreferences" element={<AddPreferences />} />
        <Route path="/swapRequests" element={<SwapRequestsPage />} />
        <Route path="/addWards" element={<AddWard />} />
        <Route path="/consultantSchedule" element={<ConsultantShedule />} />
        <Route path="/viewWards" element={<ViewWards />} />
        <Route path="/viewDoctors" element={<ViewDoctors />} />
        <Route path="/shiftManagement" element={<ShiftManagement />} />
        <Route path="/createSchedule" element={<CreateSchedule />} />
        <Route
          path="/consultantAcceptRequest"
          element={<ConsultantAcceptRequest />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
