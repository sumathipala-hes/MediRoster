import React, { useEffect, useState } from "react";
import { Navbar, Footer, Sidebars } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import WardCard from "../components/WardCard"; // Import the WardCard component

const ConsultantPage = (props) => {
  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    user,
  } = useStateContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    
  }, [user, navigate]);

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
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
            {/* Include WardCard components here */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-4">
              <WardCard wardName="Ward A" wardNumber="01" />
              <WardCard wardName="Ward B" wardNumber="02" />
              <WardCard wardName="Ward C" wardNumber="03" />
              <WardCard wardName="Ward D" wardNumber="04" />
              <WardCard wardName="Ward E" wardNumber="05" />
              {/* You can add more WardCard components as needed */}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ConsultantPage;
