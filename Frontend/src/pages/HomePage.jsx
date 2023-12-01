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
      <div>
        <h1>No Auth Info</h1>
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
      <>
        <h1>There Was A Error With The Request</h1>
      </>
    )
  }
  
}

export default HomePage