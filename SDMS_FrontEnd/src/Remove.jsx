import React, { useState } from "react";
import axios from "axios";
import "./Remove.css";
function Remove() {
  const [phoneNo, setPhoneNo] = useState();
  const handleDelete = (e) => {
    e.preventDefault();
    console.log("hii..Its working");

    axios
      .delete(`http://localhost:3000/deleteByPhone/${phoneNo}`)
      .then((response) => {
        console.log("data deleted");
        alert(response.data.message || "Data deleted successfully");
      })
      .catch((error) => {
        console.error(error);
        if (error.response) {
          alert(
            error.response.data.error ||
              "Error deleting data. Please try again."
          );
        } else if (error.request) {
          alert("No response from server. Please try again.");
        } else {
          alert("Error setting up the request. Please try again.");
        }
      });
  };

  return (
    <>
      <div className="remove-student">
        <header>
          <h1 className="heading">Delete Details</h1>
        </header>
        <form onSubmit={handleDelete}>
          <div className="fetch-details">
            <input
              type="text"
              placeholder="Enter an acknowledgement or mobile"
              value={phoneNo}
              className="fetching-input"
              onChange={(e) => setPhoneNo(e.target.value)}
            />
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}
export default Remove;
