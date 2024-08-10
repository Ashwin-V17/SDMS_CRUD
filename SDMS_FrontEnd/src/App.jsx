import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Home from "./Home";
import MainTask from "./MainTask";
import DisplayDetails from "./DisplayDetails";
import Remove from "./Remove";
import Update from "./Update";
import "./App.css";

function App() {
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        {isAuthenticated ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/add" element={<MainTask />} />
            <Route path="/update" element={<Update />} />
            <Route path="/display" element={<DisplayDetails />} />
            <Route path="/remove" element={<Remove />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
