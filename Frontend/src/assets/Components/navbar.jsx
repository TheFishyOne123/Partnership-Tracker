import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import { useNavigate } from 'react-router-dom'
import Searchbar from './searchbar'
import Logo from '../images/Logo2.png'

function Navbar(forwardedState) {
  const name = forwardedState.forwardedState
  const navigate = useNavigate()

  function handleLogout() {
    navigate('/', { state: { AuthInfo: false } })
  }

  const handleSearchUpdate = (value) => {
    forwardedState.onSearchChange(value)
  }

  return (
    <div className='text-gray-50 w-screen bg-gray-500 font-black h-16 flex items-center text-2xl fixed top-0 z-50'>
      <img className='w-20' src={Logo} alt='Logo' />
      <p className='font-normal'>Partnership Tracker</p>
      <Searchbar onSearchChange={handleSearchUpdate} />
      <div className='flex ml-auto pr-8'>
        <Dropdown className='d-inline mx-2' autoClose='outside'>
          <Dropdown.Toggle
            title='Click Here For Guide & Logout'
            variant='secondary'
            className='text-lg bg-transparent border-transparent hover:border-transparent'
            id='dropdown-autoclose-outside'
          >
            {name[0][0]}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              title='Click To Open User Guide'
              onClick={() => forwardedState.setGuideStatus(true)}
              className='active:bg-gray-400'
            >
              Guide
            </Dropdown.Item>
            <Dropdown.Item
              title='Click To Return To Sign In'
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

export default Navbar
