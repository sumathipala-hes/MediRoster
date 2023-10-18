import React, { useState } from "react";
import axios from "axios";

const AddWard = () => {
  const [formData, setFormData] = useState({
          WardName: "",
          NumberOfShifts: "",
          NumberOfBeds: "",
          consultantID: "",
          WardID: "",
  });
  const [res, setRes] = useState();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Perform validation and submit data to the server
    console.log(formData); // For testing, remove in production
    try {
      // Send a POST request to your backend server
      const response = await axios.put("/api/wards/addWard", formData); // Replace '/api/ward' with your server's endpoint

      // Check the response from the server and handle it accordingly
      if (response.status === 200) {
        console.log("Data sent successfully!");
        // Optionally, you can reset the form fields here:
        setFormData({
          WardName: "",
          NumberOfShifts: "",
          NumberOfBeds: "",
          consultantID: "",
          WardID: "",
        });
        console.log(response.data["message"]);
        setRes(response.data["message"]);
      } else {
        console.error("Server error:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div className="container mx-auto flex justify-center items-center w-screen sm:w-96 ">
      <div className=" bg-slate-100 shadow-xl rounded-lg px-8 pt-6 pb-8 mb-4 w-full max-w-md ">
        
        <div className="text-2xl text-center font-semibold mb-4">Add Ward</div>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name */}
          <div className="mb-4 ">
            <label
              htmlFor="WardName"
              classWardName="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="WardName"
              name="WardName"
              value={formData.WardName}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-full rounded-lg"
              required
            />
          </div>

          {/* shifts */}
          <div className="mb-4">
            <label
              htmlFor="NumberOfShitfs"
              className="block text-gray-700  font-bold mb-2 "
            >
              No of Shifts
            </label>
            <input
              type="number"
              id="NumberOfShifts"
              name="NumberOfShifts"
              value={formData.NumberOfShifts}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-full rounded-lg"
              required
            />
          </div>

          {/* beds */}
          <div className="mb-4">
            <label
              htmlFor="NumberOfBedsr"
              className="block text-gray-700 font-bold mb-2"
            >
              No of Beds
            </label>
            <input
              type="number"
              id="NumberOfBeds"
              name="NumberOfBeds"
              value={formData.NumberOfBeds}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-full rounded-lg"
              required
            />
          </div>

          {/* WardID */}
          <div className="mb-4">
            <label
              htmlFor="WardID"
              className="block text-gray-700 font-bold mb-2"
            >
              Ward ID
            </label>
            <input
              type="number"
              id="WardID"
              name="WardID"
              value={formData.WardID}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-full rounded-lg"
              required
            />
          </div>

          {/* consultantid */}
          <div className="mb-4">
            <label
              htmlFor="WardID"
              className="block text-gray-700 font-bold mb-2"
            >
             ConsultantID
            </label>
            <input
              type="number"
              id="consultantID"
              name="consultantID"
              value={formData.consultantID}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-full rounded-lg"
              required
            />
          </div>
          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Add Ward
            </button>
            <div>{res}</div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddWard;
