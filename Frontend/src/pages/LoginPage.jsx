import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import {useNavigate} from "react-router-dom"

const LoginPage = () => {
  return (
    <div className='h-screen w-screen flex justify-center content-center flex-col flex-wrap'>
      <div className='flex items-center justify-center w-5/12 h-1/6 sm:w-5/6 xl: bg-white/90 flex-col'>
          <h1 className='text-3xl mb-4'>Sign In With Google</h1>
          <GoogleOAuthProvider clientId="366139365430-j3sh9ns1qql98vc6i0qa7b80gvtuea2k.apps.googleusercontent.com">
            <GoogleLogin 
              onSuccess={credentialResponse => {
                const decoded = jwtDecode(credentialResponse.credential);
                const info = [decoded.name, decoded.email]
                axios
                  .get('http://localhost:5555/users')
                  .then((response) => {
                    const userslist = response.data.data
                    function findMatch(info, userslist) {
                      for (let a of userslist) {
                        const infoobj = {};
                        let count = 1;
                        for (let value of info) {
                          if (count === 2) {
                            infoobj['email'] = value;
                          } else {
                            infoobj['name'] = value;
                          }
                          count += 1;
                        }
                        delete a._id;
                        if (a.name === infoobj.name && a.email === infoobj.email) {
                          console.log('User Found!')
                          return true;
                        }
                      }
                      return false;
                    }
                    console.log('Checking Google Account Against Database')
                    if (findMatch(info,userslist)) {
                      console.log('The Google Account Used Is Allowed!')
                    }
                    else if (!findMatch(info,userslist)) {
                      console.log('User Not Found!')
                      alert('The Google Account Used Is Not Allowed!')
                    }
                    else {
                      alert('There Was A Error Checking If Account Is Allowed')
                    }
                  })
                  .catch((error) => {
                    console.log(error)
                    }
                  )
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
