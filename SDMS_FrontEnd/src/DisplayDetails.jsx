import React, { useState } from "react";
import axios from "axios";
import "./DisplayDetails.css";
const DisplayDetails = () => {
  const [acknowledgement, setAcknowledgement] = useState("");
  const [store, setStore] = useState({});
  const [displayDetails, setDisplayDetails] = useState(false);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate().toString().padStart(2, "0");
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
    const year = dateObject.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!acknowledgement) {
      alert("Please enter an acknowledgement or mobile number.");
      return;
    }

    axios
      .get(`http://localhost:3000/getByNumber/${acknowledgement}`)
      .then((response) => {
        const dataValue = response.data;
        dataValue.date = formatDate(dataValue.date);
        setStore(dataValue);
        setDisplayDetails(true);
      })
      .catch((err) => {
        console.error(err);
        alert("Error fetching data. Please try again.");
      });
  };
  // fetch-displaydetails
  return (
    <div className="main-container-display">
      <header>
        <h1 className="heading">Find Details</h1>
      </header>
      <form onSubmit={handleSubmit}>
        <div className="fetch-details">
          <input
            type="text"
            placeholder="Enter an acknowledgement or mobile"
            value={acknowledgement}
            className="fetching-input"
            onChange={(e) => setAcknowledgement(e.target.value)}
          />
          <button type="submit">Submit</button>
        </div>
      </form>

      {displayDetails && (
        <div className="retrieved-values">
          {/* <h1>Name: {store.name}</h1>
          <h1>PhNo: {store.mobile}</h1>
          <h1>Date: {store.date}</h1>
          <h1>Age: {store.age}</h1>
          <h1>Address: {store.address}</h1>
          <h1>Total: {store.total}</h1>
          <h1>
            Avg: {store.avg && store.avg > 0 ? store.avg + "%" : store.avg}
          </h1> */}

          <table className="displayDetails-table">
            <thead>
              <th>Name</th>
              <th>Phone No </th>
              <th>Date </th>
              <th>Age </th>
              <th>Address </th>
              <th>Total </th>
              <th>Average </th>
            </thead>
            <tbody>
              <tr>
                <td data-label="Name :">{store.name}</td>
                <td data-label="Phone No :">{store.mobile}</td>
                <td data-label="Date :">{store.date}</td>
                <td data-label="Age :">{store.age}</td>
                <td data-label="Address :">{store.address}</td>
                <td data-label="Total :">{store.total}</td>
                <td data-label="Average :">
                  {store.avg && store.avg > 0 ? store.avg + "%" : store.avg}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DisplayDetails;
