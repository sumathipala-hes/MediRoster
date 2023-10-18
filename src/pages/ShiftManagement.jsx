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
            <div>Shift Management</div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ConsultantPage;
