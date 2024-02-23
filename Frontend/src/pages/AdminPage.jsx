// Imports
import React, { useState, useEffect } from "react";
import AdminNavbar from "../assets/Components/adminNavbar";
import { useLocation } from "react-router-dom";
import "../assets/CSS/admin.css";
import Database from "../assets/Components/database";
import Searchbar from "../assets/Components/searchbar";
import { useNavigate } from "react-router-dom";
import UserGuideAdmin from "../assets/Components/userGuideAdmin";
import axios from "axios";

// Main Encapsulation
const AdminPage = () => {
  // Variables
  const location = useLocation();
  const forwardedState = location.state ? location.state.forwardedState : null;
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const [guideStatus, setGuideStatus] = useState(false);

  // Functions
  const handleSearchUpdate = (value) => {
    setSearch(value);
  };

  const relogin = () => {
    navigate("/");
  };

  const checkUser = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/users/${userData}`
      );

      return response.data.data.newUser;
    } catch (error) {
      console.error("Error checking user", error);
      return false;
    }
  };

  const updateUser = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/users/${userData[0][1]}`
      );

      response.data.data.newUser = false;

      await axios.put(
        `http://localhost:5555/users/edit/${response.data.data.email}`,
        response.data.data
      );

      console.log("Successfully Updated User");
    } catch (error) {
      console.error("Error Updating User Data", error);
    }
  };

  // Checks Database If the User Is New
  useEffect(() => {
    const checkUserAndSetGuide = async () => {
      if (forwardedState && forwardedState[2] === true) {
        const isNewUser = await checkUser(forwardedState[0][1]);
        setGuideStatus(isNewUser);
      } else {
        console.log("No Guide Needed");
      }
    };

    checkUserAndSetGuide();
  }, [forwardedState]);

  // Authencation Check
  if (forwardedState) {
    // Frontend Elements For Page
    return (
      //Guide, Navbar, & Database Components
      <div className="admin-page-body">
        <UserGuideAdmin
          isOpen={guideStatus}
          onClose={() => {
            setGuideStatus(false);
            updateUser(forwardedState);
          }}
        />
        <AdminNavbar
          forwardedState={forwardedState}
          onSearchChange={handleSearchUpdate}
          setGuideStatus={setGuideStatus}
          className="fixed top-0"
        />
        <Database search={search} />
      </div>
    );
  } else if (!forwardedState) {
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
  }
  // Error Catch Else Statement For Authentcation
  else {
    console.log(forwardedState);
    console.log("There Was An Error With Authentication");
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5  bg-gray-500 text-5xl w-3/12 h-1/6">
          <h1>Error With Authetication</h1>
          <button
            onClick={relogin}
            className="bg-white w-8/12 h-2/6 rounded-full text-xl p-2"
          >
            Re-Login
          </button>
        </div>
      </div>
    );
  }
};

// Export To Page Controller
export default AdminPage;
