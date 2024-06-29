import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PropTypes from 'prop-types'

function AddNewPartnersForm({ onClose }) {
  const modalClasses =
    'fixed inset-0 flex items-center justify-center backdrop-blur-xs'
  const contentClasses = 'bg-[#383d41f0] text-gray-50 p-6 rounded-lg w-6/12'

  const createNewPartner = async (newPartner) => {
    try {
      const response = await axios.post(
        `http://localhost:27017/partners/create`,
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

  const handleSubmitForm = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const creationDataObject = {}

    formData.forEach((value, key) => {
      creationDataObject[key] = value
    })

    console.log(creationDataObject)
    createNewPartner(creationDataObject)
    onClose()
  }

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div>
          <div className='flex justify-end items-center gap-11'>
            <button
              className='cursor-pointer'
              onClick={onClose}
              title='Click Here To Close This Pop Up'
            >
              <IoCloseSharp size='2em' />
            </button>
          </div>
          <h1 className='flex text-2xl justify-center py-9'>
            New Partner Request Form
          </h1>
          <form
            className='grid grid-cols-3 gap-6 px-7 pb-6 text-center'
            onSubmit={handleSubmitForm}
          >
            <label>Company Name</label>
            <label>Company Postion</label>
            <label>Owner</label>
            <input
              required
              title='Input Company Name'
              name='companyName'
              type='text'
              placeholder='Ex: Walmart'
            />
            <input
              required
              title='Input Position Available'
              name='position'
              type='text'
              placeholder='Ex: Manager'
            />
            <input
              required
              title='Input Company Owners Name'
              name='owner'
              type='text'
              placeholder='Ex: John Doe'
            />
            <label>Email</label>
            <label>Phone</label>
            <label>Pathway</label>
            <input
              required
              title='Input Email Of Internship Manager Or Owner'
              name='email'
              type='email'
              placeholder='Ex: johndoe@gmail.com'
            />
            <input
              required
              title='Input Phone Of Internship Manager Or Owner'
              name='phone'
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder='Ex: 111-111-111'
            />
            <select
              required
              name='pathway'
              title='Select Pathway This Internship Belongs To'
            >
              <option value='Health'>Health</option>
              <option value='STEAM'>STEAM</option>
              <option value='Arts, Hospitality, & Education'>
                Arts, Hospitality, & Education
              </option>
              <option value='Skilled Trades, Security, And Industry'>
                Skilled Trades, Security, And Industry
              </option>
              <option value='TOP'>Tiger Open Pathway</option>
              <option value='PTECH'>
                Pathways in Technology Early College High School (PTECH)
              </option>
            </select>
            <label>Availability</label>
            <label>First Day Available</label>
            <label>Last Day Available</label>
            <select
              required
              name='timeOfDay'
              title='Select Time Internship Is Available'
            >
              <option value='Morning'>Morning</option>
              <option value='Afternoon'>Afternoon</option>
              <option value='Evening'>Evening</option>
            </select>
            <input
              title='Select Date In Which Interns Are Able To Start Working'
              required
              name='firstDayAvailable'
              type='date'
            />
            <input
              title='Select Last Day Interns Will Be Able To Work'
              required
              name='lastDayAvailable'
              type='date'
            />
            <input
              title='Click Here To Submit Partner Request For Admins To Review'
              className=' col-span-3 cursor-pointer text-white pt-3'
              type='submit'
            />
          </form>
        </div>
      </div>
    </div>
  )
}

AddNewPartnersForm.propTypes = {
  onClose: PropTypes.func
}

export default AddNewPartnersForm
