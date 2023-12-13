import React, { useState } from "react";
import AdminNavbar from "../assets/Components/adminNavbar";
import { useLocation } from 'react-router-dom';
import '../assets/CSS/admin.css';
import Database from "../assets/Components/database";
import Searchbar from "../assets/Components/searchbar";
import { useNavigate } from "react-router-dom";
import AdminPartnerDatabase from "../assets/Components/adminPartnerDatabase";


const PartnersAdminPage = () => {
    const location = useLocation();
    const forwardedState = location.state?.forwardedState;
    const [search, setSearch] = useState('');
    const navigate = useNavigate()
  
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
        <div className="admin-page-body">
          <AdminNavbar forwardedState={forwardedState} onSearchChange={handleSearchUpdate}/>
          <AdminPartnerDatabase search={search} />
        </div>
      );    
    } else {
      console.log("There Was An Error With Authentication");
      return (
        <div className='h-screen w-screen flex items-center justify-center'>
          <div className="flex flex-col items-center justify-center gap-5  bg-gray-500 text-5xl w-3/12 h-1/6">
            <h1>Error With Authetication</h1>
            <button onClick={relogin} className="bg-white w-8/12 h-2/6 rounded-full text-xl p-2">Re-Login</button>
          </div>
        </div>
      );
    }
}

export default PartnersAdminPage