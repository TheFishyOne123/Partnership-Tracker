import React from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

function UserDeletionPopUp({ isOpen, onClose, deletionIDs }) {
  const modalClasses = isOpen
    ? 'fixed inset-0 flex items-center justify-center backdrop-blur-xs'
    : 'hidden'
  const contentClasses = isOpen
    ? 'bg-[#383d41f0] text-gray-50  p-6 rounded-lg w-4/12'
    : 'hidden'

  const deleteUsers = async (deletionID) => {
    try {
      const url = `http://localhost:27017/users/delete/${deletionID}`

      const response = await axios.delete(url)

      if (response.status === 200) {
        console.log('Users Deleted Successfully')
        toast.success('Successfully Deleted Users', {
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
      console.log('Error Deleting Users', error)
      toast.error('Error Deleting Users. Check Console For More Info.', {
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

  const handleYes = async () => {
    for (const request of deletionIDs) {
      console.log('Deleting User ', request)
      await deleteUsers(request)
    }
    onClose()
  }

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className='flex flex-col '>
          <h1 className=' self-center py-5 text-lg'>
            Are You Sure You Want To Delete The Selected User(s)?
          </h1>
          <div className=' self-center flex gap-20 pb-5'>
            <button
              onClick={handleYes}
              className=' bg-green-500 px-5 py-2 rounded-3xl'
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className=' bg-red-500 px-5 py-2 rounded-3xl'
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

UserDeletionPopUp.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  deletionIDs: PropTypes.array
}

export default UserDeletionPopUp
