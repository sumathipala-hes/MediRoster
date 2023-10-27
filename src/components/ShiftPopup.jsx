import React, { useState } from "react";
import Modal from "react-modal";

const ShiftPopup = ({ wardName, shifts, isOpen, onRequestClose }) => {
  const [newShift, setNewShift] = useState({ name: "", startTime: "", endTime: "", doctors: 0 });

  const handleCreateSchedule = () => {
    // Handle creating a schedule here
  };

  const handleAddShift = () => {
    // Handle adding a new shift here
  };

  const handleDeleteShift = (index) => {
    // Handle deleting a shift at the specified index here
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Shift Popup"
      className="modal"
    >
      <h2>Create Schedule for {wardName}</h2>
      <table>
        <thead>
          <tr>
            <th>Shift Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Number of Doctors</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => (
            <tr key={index}>
              <td>{shift.name}</td>
              <td>{shift.startTime}</td>
              <td>{shift.endTime}</td>
              <td>{shift.doctors}</td>
              <td>
                <span
                  onClick={() => handleDeleteShift(index)}
                  className="cursor-pointer"
                >
                  ⋮
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCreateSchedule}>Create Schedule</button>
      <h3>Add New Shift</h3>
      <input
        type="text"
        placeholder="Shift Name"
        value={newShift.name}
        onChange={(e) => setNewShift({ ...newShift, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Start Time"
        value={newShift.startTime}
        onChange={(e) => setNewShift({ ...newShift, startTime: e.target.value })}
      />
      <input
        type="text"
        placeholder="End Time"
        value={newShift.endTime}
        onChange={(e) => setNewShift({ ...newShift, endTime: e.target.value })}
      />
      <input
        type="number"
        placeholder="Number of Doctors"
        value={newShift.doctors}
        onChange={(e) => setNewShift({ ...newShift, doctors: e.target.value })}
      />
      <button onClick={handleAddShift}>Add Shift</button>
    </Modal>
  );
};

export default ShiftPopup;
