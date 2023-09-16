// SchedulePage.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import Modal from "react-responsive-modal";
import { Header } from "../components";

const SchedulePage = () => {
  const [clickedDate, setClickedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sample schedule data (replace with your data)
  const scheduleData = [
    { date: "2023-09-14", time: "08:00 - 12:00",  schedule: "Ward 09" },
    { date: "2023-09-15", time: "08:00 - 12:00", schedule: "Ward 09" },
    { date: "2023-09-15", time: "13:00 - 17:00", schedule: "Ward 09" },
    { date: "2023-09-16", time: "08:00 - 10:00", schedule: "Ward 09" },
    { date: "2023-09-17", time: "13:00 - 16:00", schedule: "Ward 09" },
    // Add more schedule data here...
  ];

  // Filter schedule data for the clicked date
  const filteredSchedule = scheduleData.filter(
    (item) => item.date === clickedDate.toISOString().split("T")[0].split("-")[0] + '-' + clickedDate.toISOString().split("T")[0].split("-")[1] + '-' +(parseInt(clickedDate.toISOString().split("T")[0].split("-")[2]) + 1)
  );

  const handleDateChange = (date) => {
    setClickedDate(date);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Doctor" title="Schedule" />
      <div className="bg-gray-100 min-h-[60vh] py-8 flex justify-center items-center">
        <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-full lg:w-4/5 h-[your-value]">
          <div className="flex flex-col md:flex-row h-full">
            <div className="w-full md:w-1/2 lg:w-1/3 mt-4 md:mt-0 mb-4 md:mb-0 ">
              <Calendar
                onChange={handleDateChange}
                value={clickedDate}
                tileClassName={({ date }) =>
                  date.toISOString().split("T")[0].split("-")[0]+date.toISOString().split("T")[0].split("-")[1]+ (parseInt(date.toISOString().split("T")[0].split("-")[2]) + 1)===
                   clickedDate.toISOString().split("T")[0].split("-")[0] + clickedDate.toISOString().split("T")[0].split("-")[1] +(parseInt(clickedDate.toISOString().split("T")[0].split("-")[2]) + 1)
                    ? "bg-blue-500 text-white rounded-full"
                    : ""
                }
                className="w-full h-full p-4 rounded-lg" // Increase the size of the calendar
              />
            </div>
            <div className="w-full ml-4 md:w-1/2 lg:w-2/3 mt-4 md:mt-0">
              <h2 className="text-2xl mb-2 font-bold">
                Schedule for {clickedDate.toISOString().split("T")[0].split("-")[0] + '-' + clickedDate.toISOString().split("T")[0].split("-")[1] + '-' +(parseInt(clickedDate.toISOString().split("T")[0].split("-")[2]) + 1)}
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
                      <div className="text-lg font-bold">
                        {item.time}
                      </div>
                      <div className="text-gray-700">
                        {item.schedule}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <Modal open={isModalOpen} onClose={closeModal} center>
            {/* Add a form or input fields for adding schedule */}
            <h2 className="text-2xl mb-4">Add Schedule</h2>
            {/* Add form elements here */}
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
            >
              Close
            </button>
          </Modal>
        </div>
      </div>
    </div>
  ); 
};

export default SchedulePage;
