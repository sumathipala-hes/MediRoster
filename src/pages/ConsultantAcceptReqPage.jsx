import React, { useEffect } from "react";
import { Navbar, Footer, Sidebars,ConsultantAccept} from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const ConsultantSchedule = (props) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    user
  } = useStateContext();
const navigate=useNavigate();
  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if(!user){
      navigate('/login')
    }
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
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
            <ConsultantAccept />
            
            
          </div>
          <Footer />
        </div>
      </div>
    </div>
   
  );
};

export default ConsultantSchedule;
