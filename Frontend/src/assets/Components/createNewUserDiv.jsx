import React, { useState } from 'react'
import NewUserForm from './newUserForm'
import PropTypes from 'prop-types'

function CreateNewUserDiv({ creationFormStatus }) {
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
      {isFormOpen && <NewUserForm onClose={handleCloseForm} />}
      <button
        className='bg-gray-500 text-white font-bold py-2 px-4 rounded'
        onClick={handleOpenForm}
      >
        Create A New User
      </button>
    </div>
  )
}

CreateNewUserDiv.propTypes = {
  creationFormStatus: PropTypes.func
}

export default CreateNewUserDiv
