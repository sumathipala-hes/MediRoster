
import React, { useState, useEffect } from "react";
 import { Header } from "../components";

import DatePicker from "react-datepicker";
import { RiEditLine ,RiDeleteBin5Line} from "react-icons/ri"; // Import the edit icon
 import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { AsyncSettings } from "@syncfusion/ej2-react-inputs";

const LeaveRequestsPage = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
 const {user}= useStateContext();
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  const[isEdit,setIsEdit]=useState(false);
  const[editIndex,seteditIndex]=useState();
  
  const [leaveRequestData, setLeaveRequestData] = useState({
    selectedDate: null, // Initialize with null for the date picker
    status: "Pending",
    date: null, // Initialize with null for the date picker
    reason: "",
    status:"Pending"
  });

  const openRequestModal = () => {
    setIsModalOpen(true);
  };

  const closeRequestModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLeaveRequestData({
      ...leaveRequestData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    console.log(date)
    
    setLeaveRequestData({
      ...leaveRequestData,
      date,
    });
  };
  const submitLeaveRequest =async () => {
     // Handle leave request submission here
      // You can add validation and API call here
     // Once submitted, update the leaveRequests state with the new request
     setIsModalOpen(false); // Close the modal after submission
    await  axios.post('/api/leave/addLeave',{
         leaveRequestData
       },{headers:{
         authorization:`Bearer ${user.token}`
       }}).then(res=>{
   
   const requests=[...leaveRequests,res.data]
  setLeaveRequests(requests);
  console.log(leaveRequests)
      })
    };
    const handleEdit = (index) => {
      setIsEdit(true);
      seteditIndex(index)
      setLeaveRequestData(leaveRequests[index])
      openRequestModal()
       };
    const handleDelete=async(index)=>{
       const id=leaveRequests[index]._id
       const existLeave=[...leaveRequests]
      existLeave.splice(index,1);
      setLeaveRequests(existLeave)
       try{
         await axios.delete(`/api/leave/deleteLeave/${id}`,{
         headers:{
             authorization:`Bearer ${user.token}`
        }
      })
       }
       catch(err){
     console.log(err)
         }
       };
        const updateStatusHandler = async (index,status) => {
          if(status){
                console.log(status); // Ensure status has been set correctly
             const id = leaveRequests[index]._id;
             const existLeave = [...leaveRequests];
             existLeave[index].status = status;
             setLeaveRequests(existLeave);
             await axios.put(`/api/leave/acceptLeave/${id}`, {
               status: status
             }, {
               headers: {
                 authorization: `Bearer ${user.token}`
               }
             });
             }
        
            };
  const updateHandler=async()=>{
     setIsEdit(false)
     closeRequestModal()
     const exist=[...leaveRequests]
     exist[editIndex]=leaveRequestData;
     setLeaveRequests(exist)
      const leaveId=leaveRequests[editIndex]._id
     await axios.put(`/api/leave/editLeave/${leaveId}`,
    {Leavedata:leaveRequestData},
        {headers:{
       authorization:`Bearer ${user.token}`
    }})
            };
 const cancelHandler=()=>{
        setIsEdit(false)
        closeRequestModal()
        seteditIndex()
         };
useEffect(()=>{
 const fecthLeave=async()=>{
  await axios.get('/api/leave/getLeave',{
   headers:{
    authorization:`Bearer ${user.token}`
   }
     })
.then(res=>{ setLeaveRequests(res.data) })
   }
const fecthLeaveForAdmin=async()=>{
 console.log('first')
await axios.get('/api/leave/getLeaveAdmin',{
  headers:{
authorization:`Bearer ${user.token}`
 }
})
 .then(res=>{
      setLeaveRequests(res.data)
     })
      }
if(user && user.role==='admin'){
 fecthLeaveForAdmin()
   }
   else if(user && user.role!=='admin'){
 fecthLeave();
  }
          
   },[])
  return (
    <div className="relative m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
     <Header category={user && user.role==="doctor"? "Doctor" :user.role==="admin" ? "Admin" : user.role==="consultant"?"Consultant":""} title="Leave Requests" />
     <h2>Leave Requests</h2>
      <div className="bg-gray-100 min-h-[60vh] py-8 flex justify-center items-center">
        <div className="bg-white shadow-md p-6 rounded-lg w-full md:w-full lg:w-4/5 relative">
          {user && user.role!=='admin'?(
             <div className="w-full">
             <button
               className="bg-[#55aed4] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full mb-4"
               onClick={openRequestModal}
             >
               Request A Leave
             </button>
           </div>
          ):(
            <></>
          )
          }
         
          <div className="w-full">
            <h2 className="text-2xl mb-4">Current Requests</h2>
            <div className="space-y-4">
              {leaveRequests.map((request, index) => (
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
                    {user && user.role==='admin'?(
                      <div>
                      <p>Name: {request.name}</p>
                      <p>Role: {request.role}</p>
                      </div>
                    ):(
                      <></>
                    )}
                    <p className="font-semibold">Date: {request.date}</p>
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
                    <p>Reason: {request.reason}</p>
                  </div>
                  {user && user.role!=='admin'?
                  (<div className="flex justify-end">
                  <button className="text-blue-500" onClick={()=>handleEdit(index)}>
                    <RiEditLine size={24} />
                  </button>
                  <button className="text-red-500" onClick={()=>handleDelete(index)}>
                  <RiDeleteBin5Line size={24} />
                  </button>
                 </div> ):
                 (
                  <div className="flex justify-end">
                      <button
                         type="button"
                         onClick={()=>updateStatusHandler(index,"Accepted")}
                         className="bg-[#3a5eba] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full">
                       Accept
                      </button>
                      <button
                      type="button"
                      onClick={()=>updateStatusHandler(index,"Rejected")}
                      className="bg-[#d64554] hover:bg-[#8d3468] text-white font-bold py-2 px-4 rounded-full">
                      Reject
                   </button>
                   </div>
                 )}
                  
              
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Backdrop div for blur effect */}
        {isModalOpen && (
          <div
            className="fixed inset-0 bg-black opacity-40 z-40"
            onClick={closeRequestModal}
          ></div>
        )}
        {/* Leave Request Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="modal-container bg-white w-full md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
              <div className="modal-content py-4 text-left px-6">
                {/* Modal Header */}
                <div className="flex justify-between items-center pb-3">
                  <p className="text-2xl font-bold">Leave Request</p>
                  <button className="modal-close" onClick={closeRequestModal}>
                    <span>&times;</span>
                  </button>
                </div>

                {/* Modal Body (Leave Request Form) */}
                <form>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Date:
                    </label>
                    <input
                  type="date"
                   value={leaveRequestData.date}
                    onChange={(e) => handleDateChange(e.target.value)}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Select date"
                />
                
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Reason:
                    </label>
                    <textarea
                      name="reason"
                     
                      value={leaveRequestData.reason}
                      onChange={(e)=>handleInputChange(e)}
                      className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      placeholder="Enter leave Reason"
                      rows="4" // You can adjust the number of rows as needed
                    />
                  </div>
                  <div className="mb-4 text-center">
                    {isEdit ?(
                      <div className="flex justify-around">
                      <button
                         type="button"
                         onClick={updateHandler}
                         className="bg-[#55aed4] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full">
                       Save
                      </button>
                      <button
                      type="button"
                      onClick={cancelHandler}
                      className="bg-[#d64554] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full">
                   Cancel
                   </button>
                   </div>
                    ):(
                      <button
                      type="button"
                      onClick={submitLeaveRequest}
                      className="bg-[#55aed4] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full"
                    >
                      Submit Request
                    </button>
                    )}
                    
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveRequestsPage;
