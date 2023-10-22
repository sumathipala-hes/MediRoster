import React, { useEffect } from "react";
import { Navbar, Footer, Sidebars,Preferences} from "../components";

import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";

const AddPreferencesPage = (props) => {
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
      <div className="flex relative ">
        {activeMenu ? (
          <div className="w-72 fixed sidebar ">
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
              ? " min-h-screen md:ml-72 w-full  "
              : " w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static navbar w-full ">
            <Navbar />
            <Preferences/>
            
          </div>
          <Footer />
        </div>
      </div>
    </div>
   
  );
};

export default AddPreferencesPage;
