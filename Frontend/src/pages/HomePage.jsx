import React from "react"
import Navbar from "../assets/Components/navbar"
import { useLocation } from 'react-router-dom';
import '../index.css'
import Database from "../assets/Components/database";

const HomePage = () => {
  const location = useLocation();
  const forwardedState = location.state ? location.state.forwardedState : null;

  
  if (!forwardedState) {
    console.log('Unsuccessful Authentacation')
    return (
      <div className="flex justify-center content-center text-white text-5xl">
        <h1>Please ReLogin</h1>
      </div>
    )
  }
  else if (forwardedState) {
    console.log("Successful Authentacation")
    return (
      <>
        <Navbar forwardedState={forwardedState} />
        <Database />
      </>
    )
  }
  else {
    console.log(forwardedState)
    console.log("There Was A Error With Authentacation")
    return (
      <div>
        <h1>There Was A Error</h1>
      </div>
    )
  }
  
}

export default HomePage