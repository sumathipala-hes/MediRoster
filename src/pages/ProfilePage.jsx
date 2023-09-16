import React, { useState } from 'react';

const ProfilePage = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Sample user data
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    contactNumber: '123-456-7890',
    address: '123 Main St',
    specialization: 'Cardiologist',
    // Add more user data fields as needed
  };

  // Editable user data
  const [editableUserData, setEditableUserData] = useState({ ...userData });

  // Password fields
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  // Toggle edit profile form visibility
  const toggleEditProfile = () => {
    setIsEditingProfile(!isEditingProfile);
  };

  // Toggle change password popup visibility
  const toggleChangePassword = () => {
    setIsChangingPassword(!isChangingPassword);
  };

  // Handle input changes for editing user data
  const handleUserDataChange = (e) => {
    const { name, value } = e.target;
    setEditableUserData({ ...editableUserData, [name]: value });
  };

  // Handle input changes for password fields
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  // Handle save changes for user data
  const handleSaveChanges = () => {
    // Implement logic to save changes to the server
    console.log('Saved changes:', editableUserData);
    toggleEditProfile();
  };

  // Handle change password
  const handleChangePassword = () => {
    // Implement logic to change the password
    console.log('Changed password:', passwordData);
    toggleChangePassword();
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <div className="bg-white rounded-lg shadow-md p-4 max-w-xl mx-auto">
        {/* Profile Content */}
        <h2 className="text-2xl font-semibold mb-4">Profile</h2>
        <div className="mb-4">
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Contact Number: {userData.contactNumber}</p>
          <p>Address: {userData.address}</p>
          <p>Specialization: {userData.specialization}</p>
        </div>

        {/* Edit Profile Button */}
        <button onClick={toggleEditProfile} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-full mb-4 mr-5">
          Edit Profile
        </button>

        {/* Change Password Button */}
        <button onClick={toggleChangePassword} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-3 rounded-full">
          Change Password
        </button>

        {/* Edit Profile Form */}
        {isEditingProfile && (
          <div className="mt-4 border border-gray-300 p-4 rounded-lg">
            <h3 className="text-xl font-semibold mb-2">Edit Profile</h3>
            <form>
              {/* Input fields for editing user data */}
              {/* Add input fields for contact number, address, and email */}
              <div className="mb-2">
                <label htmlFor="contactNumber" className="block text-gray-700 font-bold mb-2">
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contactNumber"
                  name="contactNumber"
                  value={editableUserData.contactNumber}
                  onChange={handleUserDataChange}
                  className="form-input border border-gray-400 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="address" className="block text-gray-700 font-bold mb-2">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={editableUserData.address}
                  onChange={handleUserDataChange}
                  className="form-input border border-gray-400 w-full"
                  required
                />
              </div>
              <div className="mb-2">
                <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={editableUserData.email}
                  onChange={handleUserDataChange}
                  className="form-input border border-gray-400 w-full"
                  required
                />
              </div>

              <div className="mt-4">
                <button
                  onClick={handleSaveChanges}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                >
                  Save Changes
                </button>
                <button
                    onClick={handleChangePassword}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-5 rounded-full"
                  >
                    Canel
                  </button>
              </div>
            </form>
          </div>
        )}

        {/* Change Password Pop-up */}
        {isChangingPassword && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-4 w-full max-w-md mx-auto rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Change Password</h3>
              <form>
                {/* Input fields for changing the password */}
                <div className="mb-2">
                  <label htmlFor="currentPassword" className="block text-gray-700 font-bold mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="form-input border border-gray-400 w-full"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="newPassword" className="block text-gray-700 font-bold mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="form-input border border-gray-400 w-full"
                    required
                  />
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={handleChangePassword}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                  >
                    Change Password
                  </button>
                  <button
                    onClick={handleChangePassword}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 ml-10 rounded-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

