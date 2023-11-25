import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom"


const LoginPage = () => {
  const [login, setLogin] = useState();

  return (
    <div className='h-screen w-screen flex justify-center content-center flex-col flex-wrap'>
      <div className='flex items-center justify-center w-5/12 h-1/6 sm:w-5/6 xl: bg-white/90 flex-col'>
          <h1 className='text-3xl mb-4'>Sign In With Google</h1>
          <GoogleOAuthProvider clientId="366139365430-j3sh9ns1qql98vc6i0qa7b80gvtuea2k.apps.googleusercontent.com">
            <GoogleLogin 
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse.credential);
                const info = [decoded.name, decoded.email]
                useEffect(() => {
    
                }, [])
                }
              }
              onError={() => {
                console.log('Error Attempting To Login');
              }}
            />
          </GoogleOAuthProvider>
      </div>
    </div>
  );
};

export default LoginPage;
