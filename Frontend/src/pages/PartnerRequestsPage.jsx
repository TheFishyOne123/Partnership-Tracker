// Imports
import { React, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import '../assets/CSS/admin.css'
import AdminNavbarRequests from '../assets/Components/adminNavbarNoSearchbar'
import RequestsDatabase from '../assets/Components/requestsDatabase'
import UserGuideAdmin from '../assets/Components/userGuideAdmin'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Main Encapsulation Function For Page
const PartnerRequestsPage = () => {
  // Variables
  const location = useLocation()
  const forwardedState = location.state?.forwardedState
  const navigate = useNavigate()
  const [guideStatus, setGuideStatus] = useState(false)

  // Functions
  const relogin = () => {
    navigate('/')
  }

  const updateUser = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/users/${userData[0][1]}`
      )

      response.data.data.newUser = false

      await axios.put(
        `http://localhost:5555/users/edit/${response.data.data.email}`,
        response.data.data
      )

      console.log('Successfully Updated User')
    } catch (error) {
      console.error('Error Updating User Data', error)
      toast.error('Error Updating User Data. Check Console For More Info.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    }
  }

  // Authentication State Check
  if (!forwardedState) {
    console.log('Unsuccessful Authentication')
    toast.warn('Unsuccessful Authentication', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light'
    })
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <div className='flex flex-col items-center justify-center gap-5  bg-gray-500 text-5xl w-3/12 h-1/6'>
          <h1>Please Re-Login</h1>
          <button
            onClick={relogin}
            className='bg-white w-8/12 h-2/6 rounded-full text-xl p-2'
          >
            Re-Login
          </button>
        </div>
      </div>
    )
  } else {
    return (
      <div className='admin-page-body'>
        <UserGuideAdmin
          className='z-10'
          isOpen={guideStatus}
          onClose={() => {
            setGuideStatus(false)
            updateUser(forwardedState)
          }}
        />
        <AdminNavbarRequests
          className='z-0'
          setGuideStatus={setGuideStatus}
          forwardedState={forwardedState}
        />
        <RequestsDatabase />
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
    )
  }
}

// Export To Page Manager
export default PartnerRequestsPage
