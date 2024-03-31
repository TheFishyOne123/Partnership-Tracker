import React, { useState } from 'react'
import AddNewPartnersForm from './addNewPartnersForm'
import PropTypes from 'prop-types'

function AddNewPartnersDiv({ creationFormStatus }) {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleOpenForm = () => {
    setIsFormOpen(true)
    creationFormStatus(true)
  }

  const handleCloseForm = () => {
    setIsFormOpen(false)
    creationFormStatus(false)
  }

  return (
    <div>
      {isFormOpen && <AddNewPartnersForm onClose={handleCloseForm} />}
      <h1 className='text-white text-lg font-bold mb-2'>
        Not What You&apos;re Looking For?
      </h1>
      <button
        className='bg-gray-500 text-white font-bold py-2 px-4 rounded'
        onClick={handleOpenForm}
      >
        Create A New Partner Here
      </button>
    </div>
  )
}

AddNewPartnersDiv.propTypes = {
  creationFormStatus: PropTypes.func
}

export default AddNewPartnersDiv
