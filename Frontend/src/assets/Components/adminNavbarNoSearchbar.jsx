import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import Logo from '../images/Logo2.png'

const AdminNavbarRequests = (forwardedState) => {
  const navigate = useNavigate()
  const info = forwardedState.forwardedState

  function handleLogout() {
    navigate('/', { state: { AuthInfo: false } })
  }

  const handleUsers = () => {
    navigate('/admin/users', { state: { forwardedState: info } })
  }

  const handlePartners = () => {
    navigate('/admin/partners', { state: { forwardedState: info } })
  }

  const handleRequests = () => {
    navigate('/admin/requests', { state: { forwardedState: info } })
  }

  const handleHome = () => {
    navigate('/admin', { state: { forwardedState: info } })
  }

  return (
    <div className='text-gray-50	w-screen bg-gray-500 h-16 flex items-center font-normal fixed top-0 z-1 '>
      <img className='w-20' src={Logo} alt='Logo' />
      <p className=' text-2xl'>Partnership Tracker</p>
      <div className='flex ml-auto pr-8	'>
        <Dropdown
          drop='down-centered'
          className='d-inline mx-2'
          autoClose='outside'
        >
          <button
            title='Click Here To Return To Main Page'
            className='text-lg align-middle py-1 pl-1'
            onClick={handleHome}
          >
            Admin
          </button>
          <Dropdown.Toggle
            title='Click To Show Pages Available'
            split
            variant='secondary'
            className='text-lg bg-transparent border-transparent hover:border-transparent'
            id='dropdown-autoclose-outside'
          ></Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item title='Click For Users Page' onClick={handleUsers}>
              Users
            </Dropdown.Item>
            <Dropdown.Item
              title='Click For Admin Partner Database'
              onClick={handlePartners}
            >
              Partners
            </Dropdown.Item>
            <Dropdown.Item
              title='Click For Requests Page'
              onClick={handleRequests}
            >
              Requests
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        <Dropdown
          drop='down-centered'
          className='d-inline mx-2'
          autoClose='outside'
        >
          <Dropdown.Toggle
            title='Click For Guide & Logout'
            variant='secondary'
            className='text-lg bg-transparent border-transparent hover:border-transparent'
            id='dropdown-autoclose-outside'
          >
            {info[0][0]}
          </Dropdown.Toggle>
          <Dropdown.Menu className='dropdown-menu-left'>
            <Dropdown.Item
              title='Click For Admin Guide'
              onClick={() => forwardedState.setGuideStatus(true)}
              className='active:bg-gray-400'
            >
              Guide
            </Dropdown.Item>
            <Dropdown.Item
              title='Click To Return To Sign On Page'
              onClick={handleLogout}
              className='active:bg-gray-400'
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default AdminNavbarRequests
