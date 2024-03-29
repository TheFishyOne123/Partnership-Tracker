import { React, useEffect, useState } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import CreateNewUserDiv from './createNewUserDiv'
import EditUserForm from './editUserForm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function usersDatabase() {
  const [usersList, setUsersList] = useState([])
  const [creationFormStatus, setCreationFormStatus] = useState(false)
  const [deletionStatus, setDeletionStatus] = useState(false)
  const [selected, setSelected] = useState([])
  const [editStatus, setEditStatus] = useState(false)
  const [tempUserData, setTempUserData] = useState({})
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    axios
      .get('http://localhost:5555/users/all')
      .then((response) => {
        setUsersList(response.data.data || [])
      })
      .catch((error) => {
        console.error('Error fetching requests:', error)
        toast.error('Error Fetching Requests. Check Console For More Info.', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      })
  }, [creationFormStatus, deletionStatus, editStatus, selected])

  const handleDelete = async () => {
    setDeletionStatus(false)
    const deleteUser = async (email) => {
      try {
        const response = await axios.delete(
          `http://localhost:5555/users/delete/${email}`
        )

        if (response.status === 200) {
          console.log('User Deleted Successfully')
          if (selected.length < 5) {
            toast.success('Successfully Deleted User', {
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
      } catch (error) {
        console.log('Error Deleting User ', error)
        toast.error('Error Deleting User. Check Console For More Info.', {
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
    if (selected.length > 0) {
      console.log('Users To Delete ' + selected.length)
      for (const email of selected) {
        await deleteUser(email)
      }
      if (selected.length > 1) {
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
      setSelected([])
      setDeletionStatus(true)
    } else if (selected.length <= 0) {
      console.log('No Users Selected')
      toast.warn('No Partners Selected. Please Select Partners To Delete.', {
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
      console.log(selected)
      console.log('Error Deleting Users')
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

  const handleEdit = async (index) => {
    const userToEdit = selected[index]

    if (selected <= 0) {
      toast.warn('No Partners Selected. Please Select Partners To Edit.', {
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
      try {
        const response = await axios.get(
          `http://localhost:5555/users/${userToEdit}`
        )
        setTempUserData(response.data.data)
        setEditStatus(true)
      } catch (error) {
        console.error('Error fetching user data for editing:', error)
        toast.error('Error Fetching User Data. Check Console For More Info.', {
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
  }

  useEffect(() => {
    if (currentIndex < selected.length) {
      if (tempUserData) {
        handleEdit(currentIndex)
      } else {
        // Pass
      }
    } else if (currentIndex >= selected.length) {
      setCurrentIndex(0)
      setTempUserData('')
      setCreationFormStatus(false)
      setSelected([])
    } else {
      console.log('Unexpected result while editing multiple users')
      toast.error(
        'Unexpected Result While Editing Multiple Users. Check Console For More Info.',
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
  }, [currentIndex])

  const handleSelected = (email) => {
    if (!selected.includes(email)) {
      setSelected((prevList) => [...prevList, email])
    } else if (selected.includes(email)) {
      setSelected((prevList) => prevList.filter((item) => item !== email))
    } else {
      console.log('Error Removing / Adding Selection.')
      toast.error(
        'Error Removing / Adding Selection. Check Console For More Info.',
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
    <div className='bg-[#383d41f0] text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28'>
      <EditUserForm
        isOpen={editStatus}
        rowdata={tempUserData}
        onClose={() => {
          setEditStatus(false)
          setCurrentIndex((prevIndex) => (prevIndex += 1))
        }}
      />

      <div className='flex justify-end'>
        <Dropdown drop='down-centered' className='d-inline'>
          <Dropdown.Toggle
            variant='secondary'
            className='text-lg'
            id='dropdown-autoclose-outside'
          >
            Actions
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleEdit(currentIndex)}>
              Edit
            </Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <table className=' mx-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]'>
        <thead className=' text-lg'>
          <tr>
            <th className='p-0.5'>Select</th>
            <th className='p-2'>Name</th>
            <th className='p-2'>Email</th>
            <th className='p-2'>Admin</th>
          </tr>
        </thead>
        <tbody>
          {usersList && usersList.length > 0 ? (
            <>
              {usersList.map((user) => (
                <tr key={user._id}>
                  <td className='py-1 px-0.5 whitespace-nowrap'>
                    <input
                      type='checkbox'
                      onChange={() => handleSelected(user.email)}
                      checked={selected.includes(user.email)}
                      className='form-checkbox h-5 w-5 align-middle'
                    />
                  </td>
                  <td className='py-0.5 px-2 whitespace-nowrap bg-gray-500'>
                    {user.name}
                  </td>
                  <td className='py-0.5 px-2 whitespace-nowrap bg-gray-500'>
                    {user.email}
                  </td>
                  <td className='py-0.5 px-2 whitespace-nowrap bg-gray-500'>
                    {user.admin ? 'Yes' : 'No'}
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={10}>
                  <div className='inline-block p-2'>
                    <CreateNewUserDiv
                      creationFormStatus={setCreationFormStatus}
                    />
                  </div>
                </td>
              </tr>
            </>
          ) : (
            <tr>
              <td colSpan='10'>
                <h1>Empty</h1>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default usersDatabase
