import React, { useState } from 'react';

const [search,setSearch] = useState("")

const handleChange = (e) => {
  const { value } = e.target;
  setSearch({...search, value});
};

function Searchbar() {
  return (
      <div className='flex justify-center ml-auto w-6/12 text-black' >
        <input type="text" className='w-8/12 rounded-2xl h-8 text-center text-lg' value={formData.username} onChange={handleChange}></input>
      </div>
  )
}

export default Searchbar