import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { RiPencilFill, RiDeleteBin6Fill } from "react-icons/ri"; // Import edit and delete icons
import axios from "axios";
import { useStateContext } from "../contexts/ContextProvider";
import { useRef } from "react";
const SwapShiftsPage = () => {
  const[names,setNames]=useState([]);
  const{user}=useStateContext();
  const [swapRequests, setSwapRequests] = useState( []);
  const[isEdit,setIsEdit]=useState(false)
  const[Editindex,setEditIndex]=useState();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectRef = useRef(null);
  const [swapRequestData, setSwapRequestData] = useState({
    _id:'',
    date: "",
    timePeriodfrom: null,
    timePeriodto:null,
    selectedDoctor: "",
    selectDoctorId:"",
    status:"Pending" // Initialize with an empty value
  });

  
  const initiateSwap = () => {
    setIsModalOpen(true);
  };

  const closeSwapModal = () => {
    setIsModalOpen(false);
  };

  const editRequest = (index) => {
    // Handle editing a swap shift request
    setIsEdit(true)
    setEditIndex(index)
    initiateSwap();
    setSwapRequestData(swapRequests[index])
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
const handleSelectDoctor=(e)=>{
  const selectid= selectRef.current.selectedIndex
  setSwapRequestData({...swapRequestData,selectDoctorId:names[selectid-1]._id,selectedDoctor:e.target.value})
}
  const submitSwapRequest = () => {
    // Handle swap shift request submission
    // You can add validation and API call here
    // Once submitted, update the swapRequests state with the new request
    
    setIsModalOpen(false); // Close the modal after submission
    const submit=async()=>{
      
        console.log(swapRequestData.selectDoctorId)
        await axios.post('/api/swap/addswap',{
          date:swapRequestData.date,
        timePeriodfrom:swapRequestData.timePeriodfrom,
        timePeriodto:swapRequestData.timePeriodto,
        receiver:swapRequestData.selectDoctorId
        },{
          headers:{
            authorization: `Bearer ${user.token}`
          }
        }).then(
          (res)=>{
            setSwapRequests([...swapRequests, res.data]);
          }
        ).catch((err)=> console.log(err))
      
      
    }
    
    submit();
  };
  const saveSwapRequest=(index)=>{
    const requests=[...swapRequests];
    requests[index]=swapRequestData;
    setSwapRequests(requests);
    setIsModalOpen(false);
    const save=async()=>{
      const id= swapRequests[index]._id
      await axios.put(`/api/swap/updateswap/${id}`,{
        date:swapRequestData.date,
        timePeriodfrom:swapRequestData.timePeriodfrom,
        timePeriodto:swapRequestData.timePeriodto,
        receiver:swapRequestData.selectDoctorId
      },{
        headers:{
          authorization: `Bearer ${user.token}`
        }
      })
    };
    save();
  }
useEffect(()=>{
  
const fetchSwaps=async()=>{
  const {data}=await axios.get('/api/swap/getswap',{
    headers:{
      authorization: `Bearer ${user.token}`
    }
  });
  setSwapRequests(data);
}
const fetchDoctorNames=async()=>{
 const{data}= await axios.get('/api/user/getDoctorsNames');
 setNames(data)
}
const fetchConsultantsNames=async()=>{
  const {data}=await axios.get('/api/user/getConsultantsNames');
  setNames(data)
}
fetchSwaps();

if(user && user.role==='doctor' ){
  fetchDoctorNames();
}
else if(user && user.role==='consultant'){
  fetchConsultantsNames();
}
},[user])
  return (
    <div className="m-2 md:mx-5 md:mt-0 p-2 md:p-5 bg-white rounded-3xl">
      <Header category={user && user.role==='doctor'?"Doctor" : "Consultant"} title="Swap Shifts" />
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
                    <p className="font-semibold">Date: {request.date.substring(0, 10)}</p>
                    <p>Shift From: {request.timePeriodfrom}</p>
                    <p>Shift To: {request.timePeriodto}</p>
                    <p>{user && user.role==='doctor'?"Doctor:" : "Consultant:"} {request.selectedDoctor}</p>
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
                    Shift from:
                  </label>
                  {/* Add a shift dropdown here */}
                  <input
                    name="timePeriodfrom"
                    value={swapRequestData.timePeriodfrom}
                    type="time"
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                  </input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    Shift to:
                  </label>
                  {/* Add a shift dropdown here */}
                  <input
                    name="timePeriodto"
                    value={swapRequestData.timePeriodto}
                    type="time"
                    onChange={handleInputChange}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                  </input>
                </div>
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                    {user && user.role==='doctor'?"Doctor:" : "Consultant:"}
                  </label>
                  {/* Add a doctor dropdown here based on the selected shift */}
                  <select
                   ref={selectRef}
                   name="selectedDoctor"
                    value={swapRequestData.selectedDoctor}
                    onChange={handleSelectDoctor}
                    className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Select a {user && user.role==='doctor'?"doctor":"consultant"}</option>
                    {names.map(
                      (doctor, index) => (
                        <option key={index} value={doctor.Name}>
                          {doctor.Name}
                        </option>
                        
                      )
                    )}
                  </select>
                </div>
                {isEdit?(
                   <div className="mb-4 text-center">
                   <button
                     type="button"
                     onClick={()=>saveSwapRequest(Editindex)}
                     className="bg-[#55aed4] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full"
                   >
                     Save Changes
                   </button>
                 </div>
                ):
                (
                  <div className="mb-4 text-center">
                  <button
                    type="button"
                    onClick={submitSwapRequest}
                    className="bg-[#55aed4] hover:bg-[#203d59] text-white font-bold py-2 px-4 rounded-full"
                  >
                    Submit Request
                  </button>
                </div>
                )}
               
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SwapShiftsPage;
