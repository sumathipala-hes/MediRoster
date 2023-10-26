import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { useStateContext } from "../contexts/ContextProvider";
import axios from 'axios'
const SwapRequestsPage = () => {
  // Define your state to store swap requests received from other doctors
  const{user}=useStateContext();
  const [swapRequestsReceived, setSwapRequestsReceived] = useState([
    // Add more swap requests received here...
  ]);

  // Function to accept a swap request
  const acceptRequest = (index) => {
    // Handle accepting the swap request, e.g., update the status
    const updatedRequests = [...swapRequestsReceived];
    updatedRequests[index].status = "Accepted";
    setSwapRequestsReceived(updatedRequests);
    updateAccept("Accepted",index)
    
  };

  // Function to reject a swap request
  const rejectRequest = (index) => {
    // Handle rejecting the swap request, e.g., update the status
    const updatedRequests = [...swapRequestsReceived];
    updatedRequests[index].status = "Rejected";
    setSwapRequestsReceived(updatedRequests);
    updateAccept("Rejected",index)
   
  };
  const updateAccept=async(status,index)=>{
    const updatedRequests = [...swapRequestsReceived];
    const id= updatedRequests[index]._id
    await axios.put(`/api/swap/acceptswapreq/${id}`,{
      status:status
    },
  {
    headers:{
      authorization: `Bearer ${user.token}`
  }
}
    )
  }
useEffect(()=>{
  const fetchrequest=async()=>{
    const {data}=await axios.get(`/api/swap/getswaprequest`,{
      headers:{
        authorization: `Bearer ${user.token}`
      }
    })
    setSwapRequestsReceived(data)
  };
  fetchrequest();
},[])
  return (
    <div className="relative m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
      
      <Header category={user && user.role==='doctor'?"Doctor" : "Consultant"} title="Swap Shifts" />
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
                    <p className="font-semibold">Date: { request.date && request.date.substring(0, 10)}</p>
                    <p>Shift From: {request.timePeriodfrom}</p>
                    <p>Shift To: {request.timePeriodto}</p>
                    <p>Sender: {request.senderName}</p>
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
