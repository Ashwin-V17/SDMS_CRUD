import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the protected data when the component mounts
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem("token");

      // Make the authenticated request
      const response = await axios.get(
        "http://localhost:3000/api/protected-route",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Handle the response data
      setData(response.data);
    } catch (err) {
      setError("Error fetching data");
      console.error("Error fetching data", err);
    }
  };

  return (
    <div>
      <h1>Dashboard</h1>
      {error && <p>{error}</p>}
      {data ? (
        <div>
          <p>Data: {JSON.stringify(data)}</p>
          {/* Render the fetched data here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Dashboard;
