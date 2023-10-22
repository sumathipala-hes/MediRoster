import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Header } from "../components";

const Preferences = () => {
  const [clickedDate, setClickedDate] = useState(new Date());
  const [preferences, setPreferences] = useState({});

  const handleDateChange = (date) => {
    setClickedDate(date);
  };

  const handlePreference = (date, preferenceType) => {
    // Copy the current preferences
    const updatedPreferences = { ...preferences };

    // Update the preference for the selected date
    updatedPreferences[date.toISOString().split("T")[0]] = preferenceType;

    // Set the updated preferences in state
    setPreferences(updatedPreferences);
  };

  const tileClassName = ({ date }) => {
    const dateString = date.toISOString().split("T")[0];
    const preference = preferences[dateString];

    if (preference === "prefer") {
      return "prefer-date";
    } else if (preference === "not prefer") {
      return "not-prefer-date";
    } else if (preference === "default" || !preference) {
      return "default-date";
    }

    return "";
  };

  return (
    <div className="m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Doctor" title="Preferences" />
      <div className="bg-gray-100 min-h-[60vh] py-8 flex justify-center items-center">
        <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-full lg:w-4/5 h-[your-value]">
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0 mb-4 md:mb-0 ">
              <Calendar
                onChange={handleDateChange}
                value={clickedDate}
                tileClassName={tileClassName}
                className="w-full h-full p-4 rounded-lg" // Increase the size of the calendar
              />
            </div>
            <div className="w-full ml-4 md:w-1/2 lg:w-2/3 mt-4 md:mt-0">
              <h2 className="text-2xl mb-2 font-bold">
                Preferences for {clickedDate.toISOString().split("T")[0]}
              </h2>
              <ul className="space-y-4">
                <li className="flex justify-center">
                  <button
                    className={`preference-button w-32 h-12 ${
                      preferences[clickedDate.toISOString().split("T")[0]] === "prefer"
                        ? "bg-green-500"
                        : "bg-gray-300"
                    } text-white px-2 py-1 rounded-full`}
                    onClick={() => handlePreference(clickedDate, "prefer")}
                  >
                    Prefer
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    className={`preference-button w-32 h-12 ${
                      preferences[clickedDate.toISOString().split("T")[0]] === "not prefer"
                        ? "bg-red-500"
                        : "bg-gray-300"
                    } text-white px-2 py-1 rounded-full`}
                    onClick={() => handlePreference(clickedDate, "not prefer")}
                  >
                    Not Prefer
                  </button>
                </li>
                <li className="flex justify-center">
                  <button
                    className={`preference-button w-32 h-12 ${
                      preferences[clickedDate.toISOString().split("T")[0]] === "default"
                        ? "bg-blue-500"
                        : "bg-gray-300"
                    } text-white px-2 py-1 rounded-full`}
                    onClick={() => handlePreference(clickedDate, "default")}
                  >
                    Default
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preferences;
