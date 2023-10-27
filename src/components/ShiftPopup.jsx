import React, { useState } from "react";
import Modal from "react-modal";
import { FaTrash } from "react-icons/fa";

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

  const handleCreateSchedule = () => {
    // Handle creating a schedule here
  };

  const handleDeleteShift = (index) => {
    // Show the delete button for the specified row
    setDeleteIndex(index);
  };

  const confirmDelete = (index) => {
    // Handle deleting the shift at the specified index here
    const updatedShifts = [...shifts];
    updatedShifts.splice(index, 1);
    setShifts(updatedShifts);
    setDeleteIndex(null); // Reset deleteIndex
  };

  const handleClosePopup = () => {
    setDeleteIndex(null); // Reset deleteIndex when closing the popup
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Shift Popup"
      style={customStyles}
    >
      <button
        onClick={handleClosePopup}
        className="absolute top-2 right-2 cursor-pointer text-gray-600 hover:text-gray-800"
      >
        X
      </button>
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
                <div className="flex items-center">
                  {deleteIndex === index ? (
                    <>
                      <button
                        onClick={() => confirmDelete(index)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <FaTrash size={18} />
                      </button>
                      <button
                        onClick={() => setDeleteIndex(null)}
                        className="bg-gray-200 text-gray-500 py-1 px-2 rounded-md hover:bg-gray-300 ml-1"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => handleDeleteShift(index)}
                      className="text-gray-500 hover:text-gray-700"
                    >
                      <FaTrash size={18} />
                    </button>
                  )}
                  <span className="ml-2">{shift.name}</span>
                </div>
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
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover-bg-blue-600 mr-2"
      >
        Create Schedule
      </button>
      <button
        onClick={handleCreateSchedule}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover-bg-green-600"
      >
        Add Shift
      </button>
    </Modal>
  );
};

export default ShiftPopup;
