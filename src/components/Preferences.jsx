import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Header } from "../components";

const Preference = () => {
  const [clickedDate, setClickedDate] = useState(new Date());
  const [preferences, setPreferences] = useState({}); // Initialize with empty preferences

  // Sample schedule data (replace with your data)
  const sampleScheduleData = [
    // Replace this with your schedule data...
  ];

  const handleDateChange = (date) => {
    setClickedDate(date);
  };

  const handlePreference = (preference) => {
    // Update the preference for the selected date
    const dateKey = clickedDate.toISOString().split("T")[0];
    setPreferences({ ...preferences, [dateKey]: preference });
  };

  const getPreferenceButtonClass = (preference) => {
    const dateKey = clickedDate.toISOString().split("T")[0];
    const selectedPreference = preferences[dateKey];

    // Set the button color based on the selected preference
    if (selectedPreference === preference) {
      if (preference === "prefer") {
        return "bg-green-500 text-white";
      } else if (preference === "not-prefer") {
        return "bg-red-500 text-white";
      } else {
        return "bg-blue-500 text-white"; // Default preference
      }
    } else {
      return "bg-gray-300 text-gray-800"; // Unselected
    }
  };

  return (
    <div className="m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Doctor" title="Preferences" />
      <div className="bg-gray-100 min-h-[60vh] py-8 flex justify-center items-center">
        <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-full lg-w-4/5">
          <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 lg:w-1/3 p-4">
              <Calendar
                onChange={handleDateChange}
                value={clickedDate}
                className="w-full h-full p-4 rounded-lg"
              />
            </div>
            <div className="w-full md:w-1/2 lg:w-2/3 p-4">
              <h2 className="text-2xl mb-2 font-bold">
                Preferences for {clickedDate.toISOString().split("T")[0]}
              </h2>
              <div className="flex flex-col space-y-2">
                <button
                  className={`preference-button ${getPreferenceButtonClass(
                    "prefer"
                  )}`}
                  onClick={() => handlePreference("prefer")}
                >
                  Prefer
                </button>
                <button
                  className={`preference-button ${getPreferenceButtonClass(
                    "not-prefer"
                  )}`}
                  onClick={() => handlePreference("not-prefer")}
                >
                  Not Prefer
                </button>
                <button
                  className={`preference-button ${getPreferenceButtonClass(
                    "default"
                  )}`}
                  onClick={() => handlePreference("default")}
                >
                  Default
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preference;
