import React, { useEffect } from "react";
import { Navbar, Footer, Sidebars} from "../components";
import { Calendar } from "../pages";

import {BrowserRouter, Routes, Route } from "react-router-dom";

import { useStateContext } from "../contexts/ContextProvider";

const ConsultantPage = (props) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,

  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed Sidebar dark:bg-secondary-dark-bg bg-white ">
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
            <Routes>
            
              <Route path="/Schedule" element={<Calendar/>} />
              {/* <Route path="/leaves" component={Leaves} />
              <Route path="/swap-shifts" component={SwapShifts} />
              <Route path="/preferences" component={Preferences} /> */}
            
            </Routes>
            
          </div>
          <Footer />
        </div>
      </div>
    </div>
   
  );
};

export default ConsultantPage;