import React, { useState } from "react";
import Navbar from "../assets/Components/navbar";
import { useLocation } from 'react-router-dom';
import '../index.css';
import Database from "../assets/Components/database";
import Searchbar from "../assets/Components/searchbar";

const AdminPage = () => {
  const location = useLocation();
  const forwardedState = location.state ? location.state.forwardedState : null;
  const [search, setSearch] = useState('');

  const handleSearchUpdate = (value) => {
    setSearch(value);
  };  

  if (!forwardedState) {
    console.log('Unsuccessful Authentication');
    return (
      <div className="flex justify-center content-center text-white text-5xl">
        <h1>Please ReLogin</h1>
      </div>
    );
  } else if (forwardedState) {
    if (forwardedState)
    return (
      <>
        <Navbar forwardedState={forwardedState} onSearchChange={handleSearchUpdate}/>
        <Database search={search} />
      </>
    );    
  } else {
    console.log(forwardedState);
    console.log("There Was An Error With Authentication");
    return (
      <div>
        <h1>There Was An Error</h1>
      </div>
    );
  }
};

export default AdminPage;