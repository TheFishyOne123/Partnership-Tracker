// Imports
import React, { useState, useEffect } from 'react'
import AdminNavbar from '../assets/Components/adminNavbar'
import { useLocation } from 'react-router-dom'
import '../assets/CSS/admin.css'
import Database from '../assets/Components/database'
import { useNavigate } from 'react-router-dom'
import UserGuideAdmin from '../assets/Components/userGuideAdmin'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Main Encapsulation
const AdminPage = () => {
  // Variables
  const location = useLocation()
  const forwardedState = location.state ? location.state.forwardedState : null
  const [search, setSearch] = useState('')
  const navigate = useNavigate()
  const [guideStatus, setGuideStatus] = useState(false)

  // Functions
  const handleSearchUpdate = (value) => {
    setSearch(value)
  }

  const relogin = () => {
    navigate('/')
  }

  const checkUser = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/users/${userData}`
      )

      return response.data.data.newUser
    } catch (error) {
      console.error('Error checking user', error)
      toast.error('Error Checking User. Check Console For More Info.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
      return false
    }
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

  // Checks Database If the User Is New
  useEffect(() => {
    const checkUserAndSetGuide = async () => {
      if (forwardedState && forwardedState[2] === true) {
        const isNewUser = await checkUser(forwardedState[0][1])
        setGuideStatus(isNewUser)
      } else {
        console.log('No Guide Needed')
      }
    }

    checkUserAndSetGuide()
  }, [forwardedState])

  // Authencation Check
  if (forwardedState) {
    // Frontend Elements For Page
    return (
      // Guide, Navbar, & Database Components
      <div className='admin-page-body'>
        <UserGuideAdmin
          isOpen={guideStatus}
          onClose={() => {
            setGuideStatus(false)
            updateUser(forwardedState)
          }}
        />
        <AdminNavbar
          forwardedState={forwardedState}
          onSearchChange={handleSearchUpdate}
          setGuideStatus={setGuideStatus}
          className='fixed top-0'
        />
        <Database search={search} />
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
  } else {
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
  }
}

// Export To Page Controller
export default AdminPage
