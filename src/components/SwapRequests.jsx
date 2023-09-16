import React, { useState } from "react";
import { Header } from "../components";

const SwapRequestsPage = () => {
  // Define your state to store swap requests received from other doctors
  const [swapRequestsReceived, setSwapRequestsReceived] = useState([
    {
      date: "2023-09-25",
      timePeriod: "08:00-16:00",
      senderDoctor: "Dr. Sirimal",
      status: "Pending",
    },
    {
      date: "2023-09-26",
      timePeriod: "16:00-00:00",
      senderDoctor: "Dr. Nadeesha",
      status: "Accepted",
    },
    // Add more swap requests received here...
  ]);

  // Function to accept a swap request
  const acceptRequest = (index) => {
    // Handle accepting the swap request, e.g., update the status
    const updatedRequests = [...swapRequestsReceived];
    updatedRequests[index].status = "Accepted";
    setSwapRequestsReceived(updatedRequests);
  };

  // Function to reject a swap request
  const rejectRequest = (index) => {
    // Handle rejecting the swap request, e.g., update the status
    const updatedRequests = [...swapRequestsReceived];
    updatedRequests[index].status = "Rejected";
    setSwapRequestsReceived(updatedRequests);
  };

  return (
    <div className="relative m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
      <Header category="Doctor" title="Swap Requests" />
      <div className="bg-gray-100 min-h-[60vh] py-8 flex justify-center items-center">
        <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-full lg:w-4/5">
          <div className="w-full">
            <h2 className="text-2xl mb-4">Swap Requests Received</h2>
            <div className="space-y-4">
              {swapRequestsReceived.map((request, index) => (
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
                    <p>Sender: {request.senderDoctor}</p>
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
                    {request.status === "Pending" && (
                      <div>
                        <button
                          className="bg-[#55aed4] hover:bg-[#203d59] font-bold text-white px-2 py-1 rounded-full mr-2"
                          onClick={() => acceptRequest(index)}
                        >
                          Accept
                        </button>
                        <button
                          className="bg-red-500 hover:bg-red-900 font-bold text-white px-2 py-1 rounded-full"
                          onClick={() => rejectRequest(index)}
                        >
                          Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwapRequestsPage;
