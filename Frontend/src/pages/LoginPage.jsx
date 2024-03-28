// Imports
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../index.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Main Encapsulation For Page
const LoginPage = () => {
  // Variables
  const navigate = useNavigate()
  let [AuthInfo, setAuthInfo] = useState(null)

  // Authencation Check On Log On
  useEffect(() => {
    if (AuthInfo) {
      if (!AuthInfo[1]) {
        console.log('Navigating To User Page')
        navigate('/user', { state: { forwardedState: AuthInfo } })
      } else if (AuthInfo[1]) {
        console.log('Navigating To Admin Page')
        navigate('/admin', { state: { forwardedState: AuthInfo } })
      }
    }
  }, [AuthInfo, navigate])

  // Page Frontend Return
  return (
    <div className='h-screen w-screen flex justify-center content-center flex-col flex-wrap'>
      <div className='flex items-center justify-center w-5/12 h-1/6 sm:w-5/6 xl: bg-white/90 flex-col'>
        <h1 className='text-3xl mb-4'>Sign In With Google</h1>
        <GoogleOAuthProvider clientId='366139365430-j3sh9ns1qql98vc6i0qa7b80gvtuea2k.apps.googleusercontent.com'>
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              const decoded = jwtDecode(credentialResponse.credential)
              const info = [decoded.name, decoded.email]
              axios
                .get(
                  `http://localhost:5555/users/${encodeURIComponent(info[1])}`
                )
                .then((response) => {
                  console.log('Checking Google Account Against Database')
                  if (response.status === 200) {
                    setAuthInfo([
                      info,
                      response.data.data.admin,
                      response.data.data.newUser
                    ])
                  } else if (response.status === 204) {
                    console.log('User Not Found')
                    toast.warn('Google Account Not Allowed', {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'light'
                    })
                  } else if (
                    response.status === 500 ||
                    response.status === 501
                  ) {
                    toast.error(
                      'Error Checking If Google Account Is Allowed. Check Console For More Info.',
                      {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                      }
                    )
                  } else {
                    console.log('Unexpected Result In Checking For User')
                    toast.error(
                      'Unexpected Result Checking For User. Check Console For More Info.',
                      {
                        position: 'top-right',
                        autoClose: 5000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: 'light'
                      }
                    )
                  }
                })
                .catch((error) => {
                  console.log(error)
                  toast.error(
                    'Error Logging In. Check Console For More Info.',
                    {
                      position: 'top-right',
                      autoClose: 5000,
                      hideProgressBar: true,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                      theme: 'light'
                    }
                  )
                })
            }}
            onError={() => {
              console.log('Error Attempting To Login')
              toast.error(
                'Error Attempting To Login. Check Console For More Info.',
                {
                  position: 'top-right',
                  autoClose: 5000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: 'light'
                }
              )
            }}
          />
        </GoogleOAuthProvider>
        <ToastContainer
          position='top-right'
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='light'
          transition:Bounce
        />
      </div>
    </div>
  )
}

// Export To Page Manager
export default LoginPage
