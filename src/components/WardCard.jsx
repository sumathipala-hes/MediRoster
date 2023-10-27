import React, { useState } from "react";
import ShiftPopup from "./ShiftPopup"; // Import the ShiftPopup component

const WardCard = ({ wardName, wardNumber }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [shifts, setShifts] = useState([]); // Replace with your actual shifts data

  const handleCreateSchedule = () => {
    setIsPopupOpen(true);
  };

  return (
    <div className="w-48 h-36 bg-white rounded-lg shadow-md p-4 flex flex-col justify-center items-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">{wardName}</h2>
        <p className="text-gray-500">Ward Number: {wardNumber}</p>
      </div>
      <button
        onClick={handleCreateSchedule}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Create Schedule
      </button>
      <ShiftPopup
        wardName={wardName}
        shifts={shifts}
        isOpen={isPopupOpen}
        onRequestClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default WardCard;
