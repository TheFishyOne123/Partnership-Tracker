import React from "react";
import "../assets/CSS/LoginPage.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <>
      <form>
        <h1>Welcome</h1>
        <h3>Sign in to your account</h3>
        <input id="username" class="username" placeholder="Username"></input>
        <input id="password" placeholder="Password"></input>
        <button>Login</button>
      </form>
    </>
  );
};

export default LoginPage;
