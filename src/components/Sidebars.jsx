import React from "react";
import { Link, NavLink } from "react-router-dom";
import { SiMastodon } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { useStateContext } from "../contexts/ContextProvider";

const Sidebars = (props) => {
  const { currentColor, activeMenu, setActiveMenu, screenSize } =
    useStateContext();

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white  text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-[#203d59] m-2";

  return (
    <div className="bg-gradient-to-r from-blue-950 to-blue-500 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10
    ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center ">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-white"
            >
              
            </Link>
            <div className="items-center gap-2 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-white">
            <SiMastodon className={` text-5xl ${!activeMenu && "rotate-90"} duration-1000 rounded-full float-left mr-2`} /> <span>MediRoster</span>
            </div>
            <TooltipComponent content="Menu " position="BottomCenter" > 
              <button
                type="button"
                onClick={() => setActiveMenu(!activeMenu)}
                style={{ color: currentColor }}
                className={`text-xl rounded-full p-3  transition ease-in-out delay-50 hover:-translate-y-1 mt-4 block md:hidden`}
                // Add hover:bg-[#9a683f] and hover:text-white to apply hover effects
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent> 
          </div>
          <div className="mt-10 ">
            {props.links.map((item) => (
              <div key={item.title}>
                <p className="text-white dark:text-white m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
          
                    to={`${link.path}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    style={({ isActive }) => ({
                      backgroundColor: isActive ? "black" : "",
                    })}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                    
                  >
                    <span style={{ color: 'white' }}>{link.icon}</span>
                    <span className="capitalize text-white">
                      {link.name}
                    </span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebars;
