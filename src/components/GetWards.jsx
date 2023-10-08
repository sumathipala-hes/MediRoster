import React, { useState, useEffect } from "react";

function GetWards() {
  const [wards, setWards] = useState([]);

  useEffect(() => {
    // Make a GET request to your Flask API
    fetch("/api/getWards")
      .then((response) => response.json())
      .then((data) => {
        // Set the retrieved data to the 'wards' state
        setWards(data.wards);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h2>Wards List</h2>
      <ul>
        {wards.map((ward) => (
          <li key={ward._id}>
            <h3>{ward.name}</h3>
            <p>Shifts: {ward.shifts}</p>
            <p>Beds: {ward.beds}</p>
            <p>Consultant Name: {ward.consultantName}</p>
            <p>Address: {ward.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GetWards;