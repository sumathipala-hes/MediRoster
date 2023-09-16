import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Header } from "../components";

const SchedulePage = () => {
  const [clickedDate, setClickedDate] = useState(new Date());
  const [preferences, setPreferences] = useState({}); // Store doctor's preferences
    console.log(preferences)
  // Sample schedule data (replace with your data)
  const scheduleData = [
    { date: "2023-09-14", time: "08:00 - 12:00", schedule: "Ward 09" },
    { date: "2023-09-15", time: "08:00 - 12:00", schedule: "Ward 09" },
    { date: "2023-09-15", time: "13:00 - 17:00", schedule: "Ward 09" },
    { date: "2023-09-16", time: "08:00 - 10:00", schedule: "Ward 09" },
    { date: "2023-09-17", time: "13:00 - 16:00", schedule: "Ward 09" },
    // Add more schedule data here...
  ];

  // Filter schedule data for the clicked date
  const filteredSchedule = scheduleData.filter(
    (item) =>
      item.date ===
      clickedDate.toISOString().split("T")[0].split("-")[0] +
        "-" +
        clickedDate.toISOString().split("T")[0].split("-")[1] +
        "-" +
        (parseInt(clickedDate.toISOString().split("T")[0].split("-")[2]) + 1)
  );

  const handleDateChange = (date) => {
    setClickedDate(date);
  };

  const handlePreference = (date, isPreferred) => {
    // Copy the current preferences
    const updatedPreferences = { ...preferences };

    // Update the preference for the selected date
    updatedPreferences[date] = isPreferred;

    // Set the updated preferences in state
    setPreferences(updatedPreferences);
  };

  const tileClassName = ({ date }) => {
    const dateString = date
      .toISOString()
      .split("T")[0]
      .split("-")
      .join("-");
    const preference = preferences[dateString];
    if (preference === true) {
      return "preferred-date";
    } else if (preference === false) {
      return "not-preferred-date";
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
                Preferences for{" "}
                {clickedDate.toISOString().split("T")[0].split("-")[0] +
                  "-" +
                  clickedDate.toISOString().split("T")[0].split("-")[1] +
                  "-" +
                  (parseInt(
                    clickedDate.toISOString().split("T")[0].split("-")[2]
                  ) + 1)}
              </h2>
              {filteredSchedule.length === 0 ? (
                <p>No schedule for this date.</p>
              ) : (
                <ul className="space-y-4">
                  {filteredSchedule.map((item, index) => (
                    <li
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md"
                    >
                      <div className="text-lg font-bold">{item.time}</div>
                      <div className="text-gray-700">{item.schedule}</div>
                      <div className="mt-2 flex space-x-4">
                        <button
                          className={`${
                            preferences[
                                item.date +
                                  " " +
                                  item.time.split(" ")[0] +
                                  "-" +
                                  item.time.split(" ")[2]
                              ]
                              
                              ? "bg-green-500"
                              : "bg-gray-300"
                          } text-white px-2 py-1 rounded-full`}
                          onClick={() =>
                            
                            handlePreference(
                              item.date +
                                " " +
                                item.time.split(" ")[0] +
                                "-" +
                                item.time.split(" ")[2],
                              true
                            )
                     
                          }
                        >
                          Preferred
                        </button>
                        <button
                          className={`${
                            preferences[
                              item.date +
                                " " +
                                item.time.split(" ")[0] +
                                "-" +
                                item.time.split(" ")[2]
                            ]
                              ? "bg-gray-300"
                              : "bg-red-500"
                          } text-white px-2 py-1 rounded-full`}
                          onClick={() =>
                            handlePreference(
                              item.date +
                                " " +
                                item.time.split(" ")[0] +
                                "-" +
                                item.time.split(" ")[2],
                              false
                            )
                          }
                        >
                          Not Preferred
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SchedulePage;
