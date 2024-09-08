import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
function Home() {
  return (
    <>
      <header className="home-header">
        <div className="bg-div-header"></div>
        <div className="bg-div-header"></div>
        <div className="bg-div-header"></div>
        <div className="bg-div-header"></div>

        <h2 className="logo">Student Details Management System</h2>
      </header>
      <div className="opt-container">
        <section>
          <Link to="/add" className="opt">
            Insert
          </Link>
          <Link to="/update" className="opt">
            Update
          </Link>
          <Link to="/display" className="opt">
            Fetching
          </Link>
          <Link to="/Remove" className="opt">
            Delete
          </Link>
        </section>
      </div>
    </>
  );
}
export default Home;
