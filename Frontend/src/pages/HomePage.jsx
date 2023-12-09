import React, { useState } from "react";
import Navbar from "../assets/Components/navbar";
import { useLocation } from 'react-router-dom';
import '../index.css';
import Database from "../assets/Components/database";
import Searchbar from "../assets/Components/searchbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const location = useLocation();
  const forwardedState = location.state ? location.state.forwardedState : null;
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  console.log(forwardedState)

  const handleSearchUpdate = (value) => {
    setSearch(value);
  };  

  const relogin = () => {
    navigate('/')
  }

  if (!forwardedState) {
    console.log('Unsuccessful Authentication');
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className="flex flex-col items-center justify-center gap-5  bg-gray-500 text-5xl w-3/12 h-1/6">
          <h1>Please Re-Login</h1>
          <button onClick={relogin} className="bg-white w-8/12 h-2/6 rounded-full text-xl p-2">Re-Login</button>
        </div>
      </div>
    );
  } else if (forwardedState) {
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

export default HomePage;
