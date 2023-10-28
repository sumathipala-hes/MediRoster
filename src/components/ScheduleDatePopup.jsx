// ScheduleDatePopup.jsx
import React, { useState } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    maxWidth: "400px",
  },
};

const ScheduleDatePopup = ({ isOpen, onRequestClose, onSubmit }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = () => {
    // Handle submitting the selected dates
    onSubmit(startDate, endDate);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Schedule Date Popup"
      style={customStyles}
    >
      <h2 className="text-2xl font-bold mb-4">Select Schedule Dates</h2>
      <div className="mb-4">
        <label htmlFor="startDate">Start Date</label>
        <input
          type="date"
          id="startDate"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border border-gray-300 rounded p-2 w-full"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 mr-2"
      >
        Submit
      </button>
    </Modal>
  );
};

export default ScheduleDatePopup;
