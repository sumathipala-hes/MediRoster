import React, { useState } from 'react';

const AddDoctor = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    specialization: '', // Dropdown
    doctorType: '', // Dropdown
    ward: '', // Dropdown
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform validation and submit data to the server
    console.log(formData); // For testing, remove in production
  };

  return (
    <div className="container mx-auto mt-8 flex justify-center items-center h-screen">
      <div className=" bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4">Add Doctor</h2>
        <form onSubmit={handleSubmit} className="w-full">
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
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

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700  font-bold mb-2 ">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-64 rounded-lg" 
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label htmlFor="contactNumber" className="block text-gray-700 font-bold mb-2">
              Contact Number
            </label>
            <input
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleInputChange}
              className="form-input border border-gray-400 w-64 rounded-lg"
              required
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
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

          {/* Specialization Dropdown */}
          <div className="mb-4">
            <label htmlFor="specialization" className="block text-gray-700 font-bold mb-2">
              Specialization
            </label>
            <select
              id="specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleInputChange}
              className="form-select border border-gray-400 w-64 rounded-lg"
              required
            >
              <option value="">Select Specialization</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Doctor Type Dropdown */}
          <div className="mb-4">
            <label htmlFor="doctorType" className="block text-gray-700 font-bold mb-2">
              Doctor Type
            </label>
            <select
              id="doctorType"
              name="doctorType"
              value={formData.doctorType}
              onChange={handleInputChange}
              className="form-select border border-gray-400 w-64 rounded-lg"
              required
            >
              <option value="">Select Doctor Type</option>
              <option value="Senior Medical Officer">Senior Medical Officer</option>
              <option value="Medical Officer">Medical Officer</option>
              <option value="Senior House Officer">Senior House Officer</option>
              {/* Add more options as needed */}
            </select>
          </div>

          {/* Ward Dropdown */}
          <div className="mb-4">
            <label htmlFor="ward" className="block text-gray-700 font-bold mb-2">
              Ward
            </label>
            <select
              id="ward"
              name="ward"
              value={formData.ward}
              onChange={handleInputChange}
              className="form-select border border-gray-400 w-64 rounded-lg"
              required
            >
              <option value="">Select Ward</option>
              <option value="Ward A">Ward A</option>
              <option value="Ward B">Ward B</option>
              {/* Add more options as needed */}
            </select>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full"
            >
              Add Doctor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDoctor;

