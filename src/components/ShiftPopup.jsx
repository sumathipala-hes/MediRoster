import React, { useState } from "react";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";
import ScheduleDatePopup from "./ScheduleDatePopup"; // Import the new component

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: "600px",
  },
};

const ShiftPopup = ({ wardName, isOpen, onRequestClose }) => {
  const [shifts, setShifts] = useState([
    { name: "Morning", startTime: "08:00 AM", endTime: "12:00 PM", doctors: 2 },
    { name: "Afternoon", startTime: "01:00 PM", endTime: "05:00 PM", doctors: 3 },
    { name: "Night", startTime: "06:00 PM", endTime: "10:00 PM", doctors: 2 },
  ]);

  const [deleteIndex, setDeleteIndex] = useState(null);
  const [scheduleDatePopupOpen, setScheduleDatePopupOpen] = useState(false); // State to manage the date selection popup

  const handleCreateSchedule = () => {
    // Open the date selection popup when "Create Schedule" is clicked
    setScheduleDatePopupOpen(true);
  };

  const handleDeleteShift = (index) => {
    // Open the delete button for the selected shift
    setDeleteIndex(index);
  };

  const handleCancelDelete = () => {
    // Cancel deleting the shift and close the delete button
    setDeleteIndex(null);
  };

  const handleConfirmDelete = () => {
    // Handle deleting the shift and close the delete button
    if (deleteIndex !== null) {
      const updatedShifts = [...shifts];
      updatedShifts.splice(deleteIndex, 1);
      setShifts(updatedShifts);
      setDeleteIndex(null);
    }
  };

  // Function to handle submitting selected dates
  const handleScheduleDateSubmit = (startDate, endDate) => {
    // Handle the selected dates, e.g., create a schedule
    console.log("Selected Start Date:", startDate);
    console.log("Selected End Date:", endDate);
    setScheduleDatePopupOpen(false); // Close the date selection popup
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Shift Popup"
      style={customStyles}
    >
      <h2 className="text-2xl font-bold mb-4">Create Schedule for {wardName}</h2>
      <table className="w-full border-collapse border border-gray-300 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-gray-300">Shift Name</th>
            <th className="py-2 px-4 border border-gray-300">Start Time</th>
            <th className="py-2 px-4 border border-gray-300">End Time</th>
            <th className="py-2 px-4 border border-gray-300">Number of Doctors</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-gray-300 relative">
                {deleteIndex === index && (
                  <div className="flex">
                    <button
                      onClick={handleConfirmDelete}
                      className="cursor-pointer text-gray-500 hover:text-gray-700 p-2"
                    >
                      <FaTrash />
                    </button>
                    <button
                      onClick={handleCancelDelete}
                      className="cursor-pointer text-gray-500 hover:text-gray-700 p-2"
                    >
                      Cancel
                    </button>
                  </div>
                )}
                {deleteIndex !== index && (
                  <button
                    onClick={() => handleDeleteShift(index)}
                    className="cursor-pointer text-gray-500 hover:text-gray-700 p-2"
                  >
                    <FaTrash />
                  </button>
                )}
                {shift.name}
              </td>
              <td className="py-2 px-4 border border-gray-300">{shift.startTime}</td>
              <td className="py-2 px-4 border border-gray-300">{shift.endTime}</td>
              <td className="py-2 px-4 border border-gray-300">{shift.doctors}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleCreateSchedule}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
      >
        Create Schedule
      </button>
      <button
        onClick={() => setScheduleDatePopupOpen(true)}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Add Shift
      </button>
      {scheduleDatePopupOpen && (
        <ScheduleDatePopup
          isOpen={scheduleDatePopupOpen}
          onRequestClose={() => setScheduleDatePopupOpen(false)}
          onSubmit={handleScheduleDateSubmit}
        />
      )}
    </Modal>
  );
};

export default ShiftPopup;
