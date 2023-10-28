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
    width: "80%",
    maxWidth: "400px",
  },
};

const AddShiftPopup = ({ isOpen, onRequestClose, onAddShift }) => {
  const [shiftData, setShiftData] = useState({
    name: "",
    startTime: "",
    endTime: "",
    doctors: 0,
  });

  const handleAddShift = () => {
    onAddShift(shiftData);
    setShiftData({ name: "", startTime: "", endTime: "", doctors: 0 });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Add Shift Popup"
      style={customStyles}
    >
      <h2 className="text-2xl font-bold mb-4">Add Shift</h2>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Shift Name</label>
        <input
          type="text"
          value={shiftData.name}
          onChange={(e) => setShiftData({ ...shiftData, name: e.target.value })}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Start Time</label>
        <input
          type="text"
          value={shiftData.startTime}
          onChange={(e) => setShiftData({ ...shiftData, startTime: e.target.value })}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">End Time</label>
        <input
          type="text"
          value={shiftData.endTime}
          onChange={(e) => setShiftData({ ...shiftData, endTime: e.target.value })}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-600 mb-2">Number of Doctors</label>
        <input
          type="number"
          value={shiftData.doctors}
          onChange={(e) => setShiftData({ ...shiftData, doctors: e.target.value })}
          className="border rounded w-full py-2 px-3"
        />
      </div>
      <button
        onClick={handleAddShift}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
      >
        Add Shift
      </button>
    </Modal>
  );
};

export default AddShiftPopup;
