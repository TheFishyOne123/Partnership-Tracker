import React, { useState } from 'react'
import PropTypes from 'prop-types'

function Searchbar({ onSearchChange }) {
  const [search, setSearch] = useState('')

  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearch(value)
    onSearchChange(value)
  }

  return (
    <div className='flex justify-center ml-auto w-6/12'>
      <input
        title='Click Here To Search The Partner Database For A Partner (Fields Being Searched Are Company Name, Position, Owner, Time Of Day And Pathway)'
        type='text'
        placeholder='Type Here To Search'
        className='w-9/12 rounded-2xl h-9 text-center text-lg bg-white text-black'
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  )
}

Searchbar.propTypes = {
  onSearchChange: PropTypes.func
}

export default Searchbar
