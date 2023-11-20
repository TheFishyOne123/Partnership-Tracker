import React from "react";
import "../assets/CSS/LoginPage.css";
import { Link } from "react-router-dom";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function LoginPage() {
  return (
    <>
      <div className="Container">
        <h1>Sign In With Google</h1>
        <div className="container-google">
          <GoogleOAuthProvider clientId="366139365430-j3sh9ns1qql98vc6i0qa7b80gvtuea2k.apps.googleusercontent.com">
            <GoogleLogin 
              className="custom-google-button"
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse.credential);
                const emails = ["thefishyone9@gmail.com"]
                if (emails.includes(decoded.email)) {
                  console.log("Email In List")
                }
                else if (!emails.includes(decoded.email)) {
                  alert('The Email Provided Is Not A Valid User')
                }
                else {
                  console.log("Error During Checking Email Process")
                }
              }}
              onError={() => {
                console.log('Error During Login Process');
              }}
            />;
          </GoogleOAuthProvider>
        </div>
      </div>
    </>
  );
};


