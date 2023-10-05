import React, { useState } from "react";
import axios from "axios";

const AddWard = () => {
  const [formData, setFormData] = useState({
    name: "",
    shifts: "",
    beds: "",
    consultantName: "",
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
      const response = await axios.post("/api/ward", formData); // Replace '/api/ward' with your server's endpoint

      // Check the response from the server and handle it accordingly
      if (response.status === 200) {
        console.log("Data sent successfully!");
        // Optionally, you can reset the form fields here:
        setFormData({
          name: "",
          shifts: "",
          beds: "",
          consultantName: "",
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
    <div className="container mx-auto flex justify-center items-center h-screen">
      <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add Ward</h2>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-bold mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-64 rounded-lg"
              required
            />
          </div>

          {/* shifts */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700  font-bold mb-2 "
            >
              No of Shifts
            </label>
            <input
              type="number"
              id="shifts"
              name="shifts"
              value={formData.shifts}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-64 rounded-lg"
              required
            />
          </div>

          {/* beds */}
          <div className="mb-4">
            <label
              htmlFor="contactNumber"
              className="block text-gray-700 font-bold mb-2"
            >
              No of Beds
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              value={formData.beds}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-64 rounded-lg"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-bold mb-2"
            >
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-64 rounded-lg"
              required
            />
          </div>

          {/* consultantName */}
          <div className="mb-4">
            <label
              htmlFor="specialization"
              className="block text-gray-700 font-bold mb-2"
            >
              consultantName
            </label>
            <select
              id="consultantName"
              name="consultantName"
              value={formData.consultantName}
              onChange={handleInputChange}
              className="form-select border border-gray-400 w-64 rounded-lg"
              required
            >
              <option value="">Select Name</option>
              <option value="Sirimal">Sirimal</option>
              <option value="Nadeesha">Nadeesha</option>
              <option value="Nadeesha">Sudharshan</option>
              {/* Add more options as needed */}
            </select>
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
