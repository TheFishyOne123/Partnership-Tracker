import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../index.css";

function LoginPage() {
  const navigate = useNavigate();
  let [AuthInfo, setAuthInfo] = useState(null);

  useEffect(() => {
    if (AuthInfo) {
      if (!AuthInfo[1]) {
        console.log("Navigating To User Page");
        navigate("/user", { state: { forwardedState: AuthInfo } });
      } else if (AuthInfo[1]) {
        console.log("Navigating To Admin Page");
        navigate("/admin", { state: { forwardedState: AuthInfo } });
      }
    }
  }, [AuthInfo, navigate]);

  return (
    <div className="h-screen w-screen flex justify-center content-center flex-col flex-wrap">
      <div className="flex items-center justify-center w-5/12 h-1/6 sm:w-5/6 xl: bg-white/90 flex-col">
        <h1 className="text-3xl mb-4">Sign In With Google</h1>
        <GoogleOAuthProvider clientId="366139365430-j3sh9ns1qql98vc6i0qa7b80gvtuea2k.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential);
              const info = [decoded.name, decoded.email];
              axios
                .get(
                  `http://localhost:5555/users/user?user=${encodeURIComponent(
                    info[1]
                  )}`
                )
                .then((response) => {
                  console.log("Checking Google Account Against Database");
                  if (response.status === 200) {
                    setAuthInfo([info, response.data.data.admin]);
                  } else if (response.status === 204) {
                    console.log("User Not Found!");
                    alert("The Google Account Used Is Not Allowed!");
                  } else if (
                    response.status === 500 ||
                    response.status === 501
                  ) {
                    alert("There Was A Error Checking If Account Is Allowed");
                  } else {
                    console.log("Unexpected Result In Checking For User");
                  }
                })
                .catch((error) => {
                  console.log(error);
                });
            }}
            onError={() => {
              console.log("Error Attempting To Login");
            }}
          />
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default LoginPage;
