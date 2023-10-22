import React, { useState,useEffect } from "react";
import { Navbar, Footer, Sidebars, Doctors } from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ConsultantPage = (props) => {
  const { setCurrentColor, setCurrentMode, currentMode, activeMenu ,user} =
    useStateContext();

  const navigate= useNavigate();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
    
    if(!user){
    navigate('/login')
   }
  }, [user,navigate]);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebars links={props.Links} />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebars links={props.Links} />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
            <div className="p-4">
  <h1 className="text-2xl font-semibold">Shift Management</h1>

  {/* Shift Management Table or List */}
  <div className="bg-white p-4 mt-4 rounded shadow">
    <h2 className="text-lg font-semibold">Current Shifts</h2>
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Shift Name</th>
          <th className="px-4 py-2">Shift Start Time</th>
          <th className="px-4 py-2">Shift End Time</th>
          {/* Add more table headers as needed */}
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="px-4 py-2">Morning Shift</td>
          <td className="px-4 py-2">8:00 AM</td>
          <td className="px-4 py-2">12:00 PM</td>
          {/* Add more rows for each shift */}
        </tr>
      </tbody>
    </table>
  </div>

  {/* Add Shift Management Actions or Forms */}
  <div className="bg-white p-4 mt-4 rounded shadow">
    <h2 className="text-lg font-semibold">Add New Shift</h2>
    <form>
      <div className="mb-4">
        <label htmlFor="shiftName" className="block text-sm font-medium text-gray-700">
          Shift Name
        </label>
        <input
          type="text"
          id="shiftName"
          name="shiftName"
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
          // Add your state management and event handling for input
        />
      </div>
      {/* Add more form fields for shift details, such as start time and end time */}
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Add Shift
      </button>
    </form>
  </div>
</div>

          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ConsultantPage;
