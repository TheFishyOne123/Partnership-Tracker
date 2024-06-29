import React, { useState } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const modalClasses =
  'fixed inset-0 flex items-center justify-center backdrop-blur-xs'
const contentClasses = 'bg-[#383d41f0] text-gray-50 p-6 rounded-lg w-6/12'

const newUserForm = ({ onClose }) => {
  const [adminStatus, setAdmin] = useState(false)

  const emailCheck = async (email) => {
    try {
      const response = await axios.get(`http://localhost:27017/users/${email}`)
      if (response.status === 200) {
        return true
      } else if (response.status === 204) {
        console.log('Email Not In Use Continue Creating User')
        return false
      } else {
        console.log('Something Went Wrong When Checking Email. ')
        toast.error(
          'Something Went Wrong When Checking Email. Check Console For More Info.',
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
    } catch (error) {
      console.error('Error Checking Email Against Database.', error)
      toast.error(
        'Error Checking Email Against Database. Check Console For More Info.',
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
  }

  const createNewUser = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:27017/users/create`,
        userData
      )
      if (response.status === 200) {
        console.log('Successfully Created New User')
        toast.success('Successfully Created New User', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        onClose()
      }
    } catch (error) {
      console.error('Error Creating User: ', error)
      toast.error('Error Creating User. Check Console For More Info.', {
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

  const handleSubmitForm = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const creationDataObject = {}

    formData.forEach((value, key) => {
      creationDataObject[key] = value
    })
    creationDataObject.newUser = true
    console.log(creationDataObject)

    try {
      const emailCheckValue = await emailCheck(creationDataObject.email)

      if (emailCheckValue) {
        console.log('Email Already In Use.')
        toast.warn('Email Already In Use.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else {
        createNewUser(creationDataObject)
      }
    } catch (error) {
      console.log('Unexpected Output When Creating User', error)
      toast.error(
        'Unexpected Output When Creating User. Check Console For More Info.',
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
  }

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div>
          <div className='flex justify-end items-center gap-11'>
            <button
              title='Click To Close Pop Up'
              className='cursor-pointer'
              onClick={onClose}
            >
              <IoCloseSharp size='2em' />
            </button>
          </div>
          <h1 className='flex text-2xl justify-center py-9'>
            New User Creation Form
          </h1>
          <form
            className='grid grid-cols-3 gap-6 px-7 pb-6 text-center'
            onSubmit={handleSubmitForm}
          >
            <label>Name</label>
            <label>Email</label>
            <label>Admin</label>
            <input
              required
              name='name'
              type='text'
              placeholder='Ex: John Doe'
              title='Enter Name Of User'
            ></input>
            <input
              required
              name='email'
              type='email'
              placeholder='Ex: johndoe@gmail.com'
              title="Enter User's Email"
            />
            <select
              required
              name='admin'
              value={adminStatus}
              title='Select What The Users Status Is'
              onChange={(e) => setAdmin(e.target.value === 'true')}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            <input
              title='Click To Create New User In Database'
              className=' col-span-3 cursor-pointer text-white pt-3'
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default newUserForm
