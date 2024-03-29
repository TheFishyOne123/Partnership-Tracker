import React from 'react'
import { IoCloseSharp } from 'react-icons/io5'
import axios from 'axios'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function requestNewPartnersForm({ onClose }) {
  const modalClasses =
    'fixed inset-0 flex items-center justify-center backdrop-blur-xs'
  const contentClasses = 'bg-[#383d41f0] text-gray-50 p-6 rounded-lg w-6/12'

  const createNewRequest = async (newRequest) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/requests/create`,
        newRequest
      )
      if (response.status === 200) {
        console.log('Successfully Created New Request')
        toast.success('Successfully Created New Request', {
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
      console.error('Error Creating Request: ', error)
      toast.error('Error Creating Request. Check Console For More Info.', {
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
    const requestsDataObject = {}

    formData.forEach((value, key) => {
      requestsDataObject[key] = value
    })

    console.log(requestsDataObject)
    createNewRequest(requestsDataObject)
    onClose()
  }

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
              name='companyName'
              type='text'
              placeholder='Ex: Walmart'
            />
            <input
              required
              name='position'
              type='text'
              placeholder='Ex: Manager'
            />
            <input
              required
              name='owner'
              type='text'
              placeholder='Ex: John Doe'
            />
            <label>Email</label>
            <label>Phone</label>
            <label>Pathway</label>
            <input
              required
              name='email'
              type='email'
              placeholder='Ex: johndoe@gmail.com'
            />
            <input
              required
              name='phone'
              type='tel'
              pattern='[0-9]{3}-[0-9]{3}-[0-9]{4}'
              placeholder='Ex: 111-111-111'
            />
            <select required name='pathway'>
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
            <select required name='timeOfDay'>
              <option value='Morning'>Morning</option>
              <option value='Afternoon'>Afternoon</option>
              <option value='Evening'>Evening</option>
            </select>
            <input required name='firstDayAvailable' type='date' />
            <input required name='lastDayAvailable' type='date' />
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

export default requestNewPartnersForm
