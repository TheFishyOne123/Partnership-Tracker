import React, { useState } from 'react';

function Searchbar({ onSearchChange }) {
  const [search, setSearch] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className='flex justify-center ml-auto w-6/12 text-black'>
      <input
        type="text"
        className='w-8/12 rounded-2xl h-8 text-center text-lg'
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Searchbar;