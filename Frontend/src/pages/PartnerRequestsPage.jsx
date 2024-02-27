// Imports
import React from "react";
import { useLocation } from "react-router-dom";
import "../assets/CSS/admin.css";
import { useNavigate } from "react-router-dom";
import AdminNavbarRequests from "../assets/Components/adminNavbarNoSearchbar";
import RequestsDatabase from "../assets/Components/requestsDatabase";

// Main Encapsulation Function For Page
const PartnerRequestsPage = () => {
  // Variables
  const location = useLocation();
  const forwardedState = location.state?.forwardedState;
  const navigate = useNavigate();

  // Functions
  const relogin = () => {
    navigate("/");
  };

  // Authentication State Check
  if (!forwardedState) {
    console.log("Unsuccessful Authentication");
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5  bg-gray-500 text-5xl w-3/12 h-1/6">
          <h1>Please Re-Login</h1>
          <button
            onClick={relogin}
            className="bg-white w-8/12 h-2/6 rounded-full text-xl p-2"
          >
            Re-Login
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="admin-page-body">
        <AdminNavbarRequests forwardedState={forwardedState} />
        <RequestsDatabase />
      </div>
    );
  }
};

// Export To Page Manager
export default PartnerRequestsPage;
