import React, { useState, useEffect } from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const editUserForm = ({ onClose, rowdata, isOpen }) => {
  const modalClasses = isOpen
    ? 'fixed inset-0 flex items-center justify-center backdrop-blur-xs'
    : 'hidden'
  const contentClasses = isOpen
    ? 'bg-[#383d41f0] text-gray-50  p-6 rounded-lg w-4/12'
    : 'hidden'
  const [adminStatus, setAdmin] = useState(rowdata.admin)
  const editUser = async (userID, newUserData) => {
    try {
      const response = await axios.put(
        `http://localhost:5555/users/edit/${userID}`,
        newUserData
      )
      if (response.status === 200) {
        console.log('Successfully Edited User')
        onClose()
        toast.success('Successfully Edited User', {
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
    } catch (error) {
      console.error('Error Editing User: ', error)
      toast.error('Error Editing User. Check Console For More Info.', {
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

  const emailCheck = async (email) => {
    try {
      if (rowdata.email === email) {
        console.log('Same Email. No Need To Check Email.')
        return false
      } else if (!rowdata.email === email) {
        try {
          const response = await axios.get(
            `http://localhost:5555/users/${email}`
          )
          if (response.status === 200) {
            return true
          } else if (response.status === 204) {
            console.log('Email Not In Use Continue Editing User.')
            return false
          } else {
            console.log('Something Went Wrong When Checking Email. ')
            toast.error('Error Checking Email. Check Console For More Info.', {
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
        } catch (error) {
          console.error('Error Checking New Email Against Database.', error)
          toast.error(
            'Error Checking New Email. Check Console For More Info.',
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
    } catch (error) {
      console.error('Error Checking New Email Against Database.', error)
      toast.error('Error Checking New Email. Check Console For More Info.', {
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
    const editedDataObject = {}

    formData.forEach((value, key) => {
      editedDataObject[key] = value
    })
    editedDataObject['newUser'] = true
    try {
      const emailCheckValue = await emailCheck(editedDataObject.email)
      if (emailCheckValue === true) {
        console.log('Email Already In Use.')
        toast.warn('Email Already In Use', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      } else if (emailCheckValue === false) {
        await editUser(rowdata.email, editedDataObject)
      } else {
        console.log('Unexpected Output of Email Check')
        toast.error(
          'Unexpected Outpot of Email Check. Check Console For More Info.',
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
      console.error('There was a error Editing User ', error)
      toast.error('Error Editing User. Check Console For More Info.', {
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

  useEffect(() => {
    setAdmin(rowdata.admin || '')
  }, [rowdata])

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div>
          <div className='flex justify-end items-center gap-11'>
            <button className='cursor-pointer' onClick={onClose}>
              <IoCloseSharp size='2em' />
            </button>
          </div>
          <h1 className='flex text-2xl justify-center py-9'>
            Editing User Data
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
              defaultValue={rowdata.name}
            ></input>
            <input
              required
              name='email'
              type='email'
              defaultValue={rowdata.email}
            />
            <select
              required
              name='admin'
              value={adminStatus}
              onChange={(e) => setAdmin(e.target.value)}
            >
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            <input
              className=' col-span-3 cursor-pointer text-white pt-3'
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

export default editUserForm
