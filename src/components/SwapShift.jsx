import React, { useState } from "react";
import { Header } from "../components";
import { RiPencilFill, RiDeleteBin6Fill } from "react-icons/ri"; // Import edit and delete icons

const SwapShiftsPage = () => {
  const [swapRequests, setSwapRequests] = useState([
    {
      date: "2023-09-16",
      timePeriod: "08:00-16:00",
      selectedDoctor: "Dr. Sirimal",
      status: "Pending",
    },
    {
      date: "2023-09-18",
      timePeriod: "16:00-00:00",
      selectedDoctor: "Dr. Nadeesha",
      status: "Accepted",
    },
    {
      date: "2023-09-20",
      timePeriod: "00:00-08:00",
      selectedDoctor: "Dr. Nuwan",
      status: "Rejected",
    },
    // Add more swap requests here...
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [swapRequestData, setSwapRequestData] = useState({
    date: "",
    timePeriod: "08:00-16:00", // Initialize with the first shift
    selectedDoctor: "", // Initialize with an empty value
  });

  const shifts = ["08:00-16:00", "16:00-00:00", "00:00-08:00"];

  const doctorsByShift = {
    "08:00-16:00": ["Dr. Sirimal", "Dr. Nadeesha", "Dr. Kamala"],
    "16:00-00:00": ["Dr. Sithum", "Dr. Asith", "Dr. Thisara"],
    "00:00-08:00": ["Dr. Rathnadeepa", "Dr. Mudiyanse", "Dr. Nanayakkara"],
  };

  const initiateSwap = () => {
    setIsModalOpen(true);
  };

  const closeSwapModal = () => {
    setIsModalOpen(false);
  };

  const editRequest = (index) => {
    // Handle editing a swap shift request
  };

  const deleteRequest = (index) => {
    // Handle deleting a swap shift request
    const updatedRequests = [...swapRequests];
    updatedRequests.splice(index, 1);
    setSwapRequests(updatedRequests);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSwapRequestData({
      ...swapRequestData,
      [name]: value,
    });
  };

  const submitSwapRequest = () => {
    // Handle swap shift request submission
    // You can add validation and API call here
    // Once submitted, update the swapRequests state with the new request
    setSwapRequests([...swapRequests, swapRequestData]);
    setIsModalOpen(false); // Close the modal after submission
  };

  return (
    <div className="m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Doctor" title="Swap Shifts" />
      <div className="bg-gray-100 min-h-[60vh] py-8 flex justify-center items-center">
        <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-full lg:w-4/5">
          <div className="w-full">
            <button
              className="bg-[#55aed4] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full mb-4"
              onClick={initiateSwap}
            >
              Swap A Shift
            </button>
          </div>
          <div className="w-full">
            <h2 className="text-2xl mb-4">Your Requests</h2>
            <div className="space-y-4">
              {swapRequests.map((request, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg shadow-md flex items-center justify-between ${
                    request.status === "Accepted"
                      ? "bg-green-100"
                      : request.status === "Pending"
                      ? "bg-yellow-100"
                      : request.status === "Rejected"
                      ? "bg-red-100"
                      : ""
                  }`}
                >
                  <div>
                    <p className="font-semibold">Date: {request.date}</p>
                    <p>Shift: {request.timePeriod}</p>
                    <p>Doctor: {request.selectedDoctor}</p>
                    <span>Status:</span>
                    <span
                      className={`font-bold ${
                        request.status === "Accepted"
                          ? "text-green-900"
                          : request.status === "Pending"
                          ? "text-yellow-900"
                          : request.status === "Rejected"
                          ? "text-red-900"
                          : ""
                      }`}
                    >
                      {" "}
                      {request.status}
                    </span>
                  </div>
                  <div>
                    <button
                      className="text-blue-500 mr-2"
                      onClick={() => editRequest(index)}
                    >
                      <RiPencilFill size={24} />
                    </button>
                    <button
                      className="text-red-500"
                      onClick={() => deleteRequest(index)}
                    >
                      <RiDeleteBin6Fill size={24} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop div for blur effect */}
      {isModalOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={closeSwapModal}
          ></div>
        )}
      {/* Swap Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
            <div className="modal-content py-4 text-left px-6">
              {/* Modal Header */}
              <div className="flex justify-between items-center pb-3">
                <p className="text-2xl font-bold">Swap Shift Request</p>
                <button className="modal-close" onClick={closeSwapModal}>
                  <span>&times;</span>
                </button>
              </div>

              {/* Modal Body (Swap Request Form) */}
              <form>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Date:
                  </label>
                  {/* Add a date picker here */}
                  <input
                    type="date"
                    name="date"
                    value={swapRequestData.date}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Select date"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Shift:
                  </label>
                  {/* Add a shift dropdown here */}
                  <select
                    name="timePeriod"
                    value={swapRequestData.timePeriod}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {shifts.map((shift, index) => (
                      <option key={index} value={shift}>
                        {shift}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Doctor:
                  </label>
                  {/* Add a doctor dropdown here based on the selected shift */}
                  <select
                    name="selectedDoctor"
                    value={swapRequestData.selectedDoctor}
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a doctor</option>
                    {doctorsByShift[swapRequestData.timePeriod]?.map(
                      (doctor, index) => (
                        <option key={index} value={doctor}>
                          {doctor}
                        </option>
                      )
                    )}
                  </select>
                </div>
                <div className="mb-4 text-center">
                  <button
                    type="button"
                    onClick={submitSwapRequest}
                    className="bg-[#55aed4] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full"
                  >
                    Submit Request
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapShiftsPage;
