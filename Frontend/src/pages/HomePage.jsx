// Imports
import React, { useState, useEffect } from "react";
import Navbar from "../assets/Components/navbar";
import { useLocation } from "react-router-dom";
import "../index.css";
import Database from "../assets/Components/database";
import Searchbar from "../assets/Components/searchbar";
import { useNavigate } from "react-router-dom";
import UserGuide from "../assets/Components/userGuide";
import axios from "axios";

// Main Encapsulation Function
const HomePage = () => {
  // Variables
  const location = useLocation();
  const forwardedState = location.state?.forwardedState || null;
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
    await axios.get(`http://localhost:5555/users/user?user=${userData[0][1]}`);
  };

  // Function Updates New User State in Database To False
  const updateUser = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/users/user?user=${userData[0][1]}`
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

  // Checks Guide Status To Decide Whether To Deploy Guide Or Not / Also Checks Authentication State
  useEffect(() => {
    if (forwardedState && forwardedState[2] === true) {
      if (checkUser(forwardedState[0][1])) setGuideStatus(true);
      else {
        setGuideStatus(false);
        console.log("No Guide Needed");
      }
    } else {
      console.log("Guide Turned Off");
    }
  }, [forwardedState]);

  if (!forwardedState) {
    console.log("Unsuccessful Authentication");
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-5 bg-gray-500 text-5xl w-3/12 h-1/6">
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

  // Frontend Return Statement
  return (
    <>
      <UserGuide
        isOpen={guideStatus}
        onClose={() => {
          setGuideStatus(false);
          updateUser(forwardedState);
        }}
      />
      <Navbar
        forwardedState={forwardedState}
        onSearchChange={handleSearchUpdate}
        setGuideStatus={() => setGuideStatus(true)}
        className="fixed top-0"
      />
      <Database search={search} />
    </>
  );
}

// Export To Page Manager
export default HomePage;
