import React, { useState, useEffect } from "react";
import "./Home.css";
function Home() {
  return (
    <>
      <header>
        <div className="bg-div-header"></div>
        <div className="bg-div-header"></div>
        <div className="bg-div-header"></div>
        <div className="bg-div-header"></div>

        <h2 className="logo">Student Details Management System</h2>
      </header>
      <div className="opt-container">
        <section>
          <a href="/add" className="opt">
            Insert
          </a>
          <a href="/update" className="opt">
            Update
          </a>
          <a href="/display" className="opt">
            Fetching
          </a>
          <a href="/Remove" className="opt">
            Delete
          </a>
        </section>
      </div>
    </>
  );
}
export default Home;
