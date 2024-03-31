import React, { useEffect, useState } from 'react'
import axios from 'axios'
import EditingForm from './EditingForm.jsx'
import AddNewPartnersDiv from './addNewPartnersDiv.jsx'
import PartnerDeletionPopUp from './partnerDeletionPopUp.jsx'
import UserGuideAdmin from './userGuideAdmin.jsx'
import Dropdown from 'react-bootstrap/Dropdown'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

function AdminPartnerDatabase({ search }, forwardedState) {
  const [partnersList, setPartnersList] = useState([])
  const [searchResults, setSearchResults] = useState([])
  const [editingForm, setEditingForm] = useState(false)
  const [deletionPopUp, setDeletionPopup] = useState(false)
  const [creationFormStatus, setCreationFormStatus] = useState(false)
  const [duplicationStatus, setDuplicationStatus] = useState(false)
  const [guideStatus, setGuideStatus] = useState(false)
  const [selected, setSelected] = useState([])
  const [tempUserData, setTempUserData] = useState({})

  const updateUser = async (userData) => {
    try {
      const response = await axios.get(
        `http://localhost:5555/users/user?user=${userData[0][1]}`
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

  useEffect(() => {
    axios
      .get('http://localhost:5555/partners/all')
      .then((response) => {
        setPartnersList(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching partners:', error)
        toast.error('Error Fetching Partners. Check Console For More Info.', {
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
  }, [editingForm, creationFormStatus, deletionPopUp, duplicationStatus])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:5555/partners/search',
          { params: { search } }
        )
        setSearchResults(response.data)
      } catch (error) {
        console.error('Error With Search:', error)
        toast.error('Error With Search. Check Console For More Info.', {
          position: 'top-right',
          autoClose: false,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light'
        })
      }
    }

    if (search) {
      fetchData()
    } else {
      setSearchResults([])
    }
  }, [search])

  const handleEdit = async () => {
    const userToEdit = selected[0]
    if (selected.length <= 0) {
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
          `http://localhost:5555/partners/searchByID`,
          { params: { id: userToEdit } }
        )
        setTempUserData(response.data)
        setEditingForm(true)
      } catch (error) {
        console.error('Error fetching partner data for editing:', error)
        toast.error(
          'Error Fetching Partner Data For Editing. Check Console For More Info.',
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

  const handleDuplicate = async () => {
    try {
      if (selected.length <= 0) {
        toast.warn(
          'No Partners Selected. Please Select Partners To Duplicate.',
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
        console.log('Duplicating Partner')
        setDuplicationStatus(true)
        const results = await axios.get(
          'http://localhost:5555/partners/searchByID',
          { params: { id: selected[0] } }
        )
        const response = await axios.post(
          `http://localhost:5555/partners/create`,
          results.data
        )
        if (response.status === 200) {
          console.log('Successfully Duplicated Partner')
          toast.success('Successfully Duplicated Partner', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light'
          })
          setDuplicationStatus(false)
          selected.shift()
        }
      }
    } catch (error) {
      setDuplicationStatus(false)
      console.log('Error Duplicating Partner', error)
      toast.error('Error Duplicating Partner. Check Console For More Info.', {
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

  const handleDelete = () => {
    if (selected.length <= 0) {
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
      setDeletionPopup(true)
    }
  }

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

  useEffect(() => {
    if (editingForm === true) {
      // Pass
    } else {
      if (selected.length >= 1) {
        console.log('Next User')
        handleEdit()
      } else if (selected.length === 0) {
        setTempUserData('')
        setCreationFormStatus(false)
      } else {
        console.log('Unexpected result while editing multiple partners')
        toast.error(
          'Unexpected Result While Editing Multiple Partners. Check Console For More Info.',
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
  }, [editingForm])

  useEffect(() => {
    if (duplicationStatus === true) {
      // Pass
    } else {
      if (selected.length >= 1) {
        console.log('Next User')
        handleDuplicate()
      } else if (selected.length === 0) {
        setTempUserData('')
        setDuplicationStatus(false)
      } else {
        console.log('Unexpected result while duplicating multiple partners')
        toast.error(
          'Unexpected Result While Duplicating Multiple Partners. Check Console For More Info.',
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
  }, [duplicationStatus])

  return (
    <div className='bg-[#383d41f0] text-white w-11/12 mx-auto flex-grow flex-col p-6 mt-28'>
      <UserGuideAdmin
        isOpen={guideStatus}
        onClose={() => {
          setGuideStatus(false)
          updateUser(forwardedState)
        }}
      />
      <EditingForm
        isOpen={editingForm}
        onClose={() => {
          setEditingForm(false)
          selected.shift()
        }}
        rowdata={tempUserData}
      />
      <PartnerDeletionPopUp
        isOpen={deletionPopUp}
        onClose={() => {
          setDeletionPopup(false)
        }}
        deletionIDs={selected}
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
            <Dropdown.Item onClick={handleEdit}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={handleDuplicate}>Duplicate</Dropdown.Item>
            <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <table className='mx-auto border-separate border-spacing-y-4 border-spacing-x-3 lg:border-spacing-3 md:border-spacing-x-3 sm:border-spacing-x-1 text-center font-mono shadow-md border-spacing-1 md:text-xs bt:text-[12px]'>
        <thead>
          <tr className='text-lg tst:text-sm' key='Head'>
            <th className='px-1 py-2 sm:p-0'>Select</th>
            <th className='px-1 py-2 sm:p-0'>Company Name</th>
            <th className='px-1 py-2 sm:p-0'>Position</th>
            <th className='px-1 py-2 sm:p-0'>Owner</th>
            <th className='px-1 py-2 sm:p-0'>Email</th>
            <th className='px-1 py-2 sm:p-0'>Phone</th>
            <th className='px-1 py-2 sm:p-0'>Pathway</th>
            <th className='px-1 py-2 sm:p-0'>Availability</th>
            <th className='px-1 py-2 sm:p-0 whitespace-nowrap'>Start Date</th>
            <th className='px-1 py-2 sm:p-0 whitespace-nowrap'>End Date</th>
          </tr>
        </thead>
        <tbody>
          {!search ? (
            <>
              {partnersList.map((partner) => (
                <tr className='tst:text-xs' key={partner._id}>
                  <td className='py-0.5 whitespace-nowrap'>
                    <input
                      type='checkbox'
                      onChange={() => handleSelected(partner._id)}
                      checked={selected.includes(partner._id)}
                      className='form-checkbox h-5 w-5 align-middle'
                    />
                  </td>
                  <td
                    title={partner.companyName}
                    className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden'
                  >
                    {partner.companyName}
                  </td>
                  <td
                    title={partner.position}
                    className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] tst:max-w-[6rem] lg:max-w-[20rem] overflow-hidden '
                  >
                    {partner.position}
                  </td>
                  <td
                    title={partner.owner}
                    className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap'
                  >
                    {partner.owner}
                  </td>
                  <td
                    title={partner.email}
                    className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '
                  >
                    {partner.email}
                  </td>
                  <td
                    title={partner.phone}
                    className='bg-gray-500 py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap'
                  >
                    {partner.phone}
                  </td>
                  <td
                    title={partner.pathway}
                    className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[11rem] tst:max-w-[5rem] lg:max-w-[20rem] overflow-hidden '
                  >
                    {partner.pathway}
                  </td>
                  <td
                    title={partner.timeOfDay}
                    className='bg-gray-500 p-1.5 sm:p-0'
                  >
                    {partner.timeOfDay}
                  </td>
                  <td
                    title={partner.firstDayAvailable}
                    className='bg-gray-500 p-.5 sm:p-0'
                  >
                    {partner.firstDayAvailable}
                  </td>
                  <td
                    title={partner.lastDayAvailable}
                    className='bg-gray-500 p-.5 sm:p-0'
                  >
                    {partner.lastDayAvailable}
                  </td>
                </tr>
              ))}
            </>
          ) : (
            searchResults.map((result) => (
              <tr className='tst:text-xs' key={result._id}>
                <td className='py-0.5 whitespace-nowrap'>
                  <input
                    type='checkbox'
                    onChange={() => handleSelected(result._id)}
                    checked={selected.includes(result._id)}
                    className='form-checkbox h-5 w-5 align-middle'
                  />
                </td>
                <td
                  title={result.companyName}
                  className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden'
                >
                  {result.companyName}
                </td>
                <td
                  title={result.position}
                  className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] tst:max-w-[6rem] lg:max-w-[20rem] overflow-hidden '
                >
                  {result.position}
                </td>
                <td
                  title={result.owner}
                  className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap'
                >
                  {result.owner}
                </td>
                <td
                  title={result.email}
                  className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[8rem] laptop:max-w-[5rm] sm:max-w-[15rem] lg:max-w-[20rem] overflow-hidden '
                >
                  {result.email}
                </td>
                <td
                  title={result.phone}
                  className='bg-gray-500 py-0.5 px-1  bt:px-.5  sm:p-0 whitespace-nowrap'
                >
                  {result.phone}
                </td>
                <td
                  title={result.pathway}
                  className='bg-gray-500 py-0.5 px-1 bt:px-.5 sm:p-0 whitespace-nowrap max-w-[11rem] tst:max-w-[5rem] lg:max-w-[20rem] overflow-hidden '
                >
                  {result.pathway}
                </td>
                <td
                  title={result.firstDayAvailable}
                  className='bg-gray-500 p-1.5 sm:p-0'
                >
                  {result.timeOfDay}
                </td>
                <td className='bg-gray-500 p-.5 sm:p-0'>
                  {result.firstDayAvailable}
                </td>
                <td
                  title={result.lastDayAvailable}
                  className='bg-gray-500 p-.5 sm:p-0'
                >
                  {result.lastDayAvailable}
                </td>
              </tr>
            ))
          )}
          <tr>
            <td colSpan={10}>
              <AddNewPartnersDiv creationFormStatus={setCreationFormStatus} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

AdminPartnerDatabase.propTypes = {
  search: PropTypes.string
}

export default AdminPartnerDatabase
