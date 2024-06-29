import { React, useEffect, useState, Fragment } from 'react'
import axios from 'axios'
import Dropdown from 'react-bootstrap/Dropdown'
import RequestDeletionPopUp from './requestDeletionPopUp'
import RequestEditingForm from './requestEditingForm'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const RequestsDatabase = () => {
  const [requestsList, setRequestsList] = useState([])
  const [creationStatus, setCreationStatus] = useState(false)
  const [selected, setSelected] = useState([])
  const [deletionPopUp, setDeletionPopup] = useState(false)
  const [editingPopUp, setEditingPopup] = useState(false)
  const [tempUserData, setTempUserData] = useState({})

  useEffect(() => {
    axios
      .get('http://localhost:27017/requests/all')
      .then((response) => {
        setRequestsList(response.data.data)
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
  }, [deletionPopUp, creationStatus, editingPopUp])

  const findRequest = async (requestID) => {
    try {
      const request = await axios.get(
        'http://localhost:27017/requests/searchByID',
        { params: { id: requestID } }
      )
      return request.data
    } catch (error) {
      console.error('Error Finding Request: ', error)
      toast.error('Error Finding Request. Check Console For More Info.', {
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

  const deleteRequests = async (deletionID) => {
    try {
      const url = `http://localhost:27017/requests/delete/${deletionID}`

      const response = await axios.delete(url)

      if (response.status === 200) {
        console.log('Request Deleted Successfully')
        toast.success('Successfully Deleted Request', {
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
      console.log('Error Deleting Request', error)
      toast.error('Error Deleting Request. Check Console For More Info.', {
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

  const handleCreatePartner = async (requestIDs) => {
    if (selected.length <= 0) {
      toast.warn('No Requests Selected. Please Select Requests To Accept.', {
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
    const createPartners = async (newPartner) => {
      try {
        const response = await axios.post(
          'http://localhost:27017/partners/create',
          newPartner
        )
        if (response.status === 200) {
          console.log('Successfully Created New Partner')
          toast.success('Successfully Created New Partner', {
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
        console.error('Error Creating Partner: ', error)
        toast.error('Error Creating Partner. Check Console For More Info.', {
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

    for (const request of requestIDs) {
      setCreationStatus(true)
      try {
        const requestData = await findRequest(request)
        await createPartners(requestData)
        console.log('Successfully Created New Partner')
        toast.success('Successfully Created New Partner', {
          position: 'top-right',
          autoClose: 1300,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
        deleteRequests(request)
        setCreationStatus(false)
        setSelected([])
      } catch (error) {
        console.log('Their was a error creating new partner ', error)
        toast.error(
          'Error Creating New Partner. Check Console For More Info.',
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
  }

  const handleDelete = () => {
    if (selected.length <= 0) {
      toast.warn('No Requests Selected. Please Select Requests To Deny.', {
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
      setDeletionPopup(true)
    }
  }

  const handleSelected = (email) => {
    if (!selected.includes(email)) {
      setSelected((prevList) => [...prevList, email])
    } else if (selected.includes(email)) {
      setSelected((prevList) => prevList.filter((item) => item !== email))
    } else {
      console.log('Unexpected Result Removing / Adding Selection.')
      toast.error(
        'Unexpected Result Removing / Adding Selection. Check Console For More Info.',
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

  const handleEditing = async () => {
    if (selected.length <= 0) {
      toast.warn('No Requests Selected. Please Select Requests To Edit.', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
      })
    } else if (selected.length > 0) {
      const searchResults = await findRequest(selected.slice(-1)[0])
      setTempUserData(searchResults)
      setEditingPopup(true)
    } else {
      console.log('Error Editing Request ', selected.slice((-1)[0]))
      toast.error('Error Editing Request. Check Console For More Info.', {
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

  const handleEditingRepeat = async () => {
    if (selected.length <= 0) {
      console.log('End Of Requests To Edit')
      if (selected.length > 1) {
        toast.success('Successfully Edited All Requests', {
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
    } else if (selected.length > 0) {
      const searchResults = await findRequest(selected.slice(-1)[0])
      setTempUserData(searchResults)
      setEditingPopup(true)
    } else {
      console.log('Error Editing Request ', selected.slice((-1)[0]))
      toast.error('Error Editing Request. Check Console For More Info.', {
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

  return (
    <div className='bg-[#336b87f9] text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28'>
      <RequestDeletionPopUp
        isOpen={deletionPopUp}
        onClose={() => {
          setDeletionPopup(false)
          setSelected([])
        }}
        deletionIDs={selected}
      />
      <RequestEditingForm
        isOpen={editingPopUp}
        onClose={() => {
          setEditingPopup(false)
          selected.shift()
          handleEditingRepeat()
        }}
        rowdata={tempUserData}
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
            <Dropdown.Item onClick={() => handleCreatePartner(selected)}>
              Accept
            </Dropdown.Item>
            <Dropdown.Item onClick={handleEditing}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Deny</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <table className='mx-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]'>
        <thead>
          <tr key='Head'>
            <th className='p-2 sm:p-0'>Select</th>
            <th className='p-2 sm:p-0'>Company Name</th>
            <th className='p-2 sm:p-0'>Position</th>
            <th className='p-2 sm:p-0'>Owner</th>
            <th className='p-2 bt:hidden sm:p-0'>Email</th>
            <th className='p-2 sm:p-0'>Phone</th>
            <th className='p-2 sm:p-0'>Pathway</th>
            <th className='p-2 sm:p-0'>Availability</th>
            <th className='p-2 sm:p-0 whitespace-nowrap'>Start Day</th>
            <th className='p-2 sm:p-0 whitespace-nowrap'>End Day</th>
          </tr>
        </thead>
        <tbody key='Body'>
          {requestsList.length === 0 ? (
            <tr key='Empty'>
              <td colSpan='10'>
                <h1>Empty</h1>
              </td>
            </tr>
          ) : (
            requestsList.map((request, index) => (
              <Fragment key={`fragment-${request.id || index}`}>
                <tr key={`row-${request.id}`}>
                  <td className='py-0.5 whitespace-nowrap'>
                    <input
                      type='checkbox'
                      onChange={() => handleSelected(request._id)}
                      checked={selected.includes(request._id)}
                      className='form-checkbox h-5 w-5 align-middle'
                    />
                  </td>
                  <td
                    title={request.companyName}
                    className='bg-[#1f3f49] py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar'
                  >
                    {request.companyName}
                  </td>
                  <td
                    title={request.position}
                    className='bg-[#1f3f49] py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[14rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar'
                  >
                    {request.position}
                  </td>
                  <td
                    title={request.owner}
                    className='bg-[#1f3f49] py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap'
                  >
                    {request.owner}
                  </td>
                  <td
                    title={request.email}
                    className='bg-[#1f3f49] bt:hidden py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[12rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar'
                  >
                    {request.email}
                  </td>
                  <td
                    title={request.phone}
                    className='bg-[#1f3f49] py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap'
                  >
                    {request.phone}
                  </td>
                  <td
                    title={request.pathway}
                    className='bg-[#1f3f49] py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[10rem] bt:max-w-[8rem] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden hover:overflow-x-visible scrollBar'
                  >
                    {request.pathway}
                  </td>
                  <td
                    title={request.timeOfDay}
                    className='bg-[#1f3f49] p-1.5 sm:p-0'
                  >
                    {request.timeOfDay}
                  </td>
                  <td
                    title={request.firstDayAvailable}
                    className='bg-[#1f3f49] p-1.5 sm:p-0'
                  >
                    {request.firstDayAvailable}
                  </td>
                  <td
                    title={request.lastDayAvailable}
                    className='bg-[#1f3f49] p-1.5 sm:p-0'
                  >
                    {request.lastDayAvailable}
                  </td>
                </tr>
              </Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default RequestsDatabase
