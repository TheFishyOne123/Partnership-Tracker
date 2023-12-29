import React, { useState } from "react";

function Searchbar({ onSearchChange }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearchChange(value);
  };

  return (
    <div className="flex justify-center ml-auto w-6/12">
      <input
        type="text"
        className="w-9/12 rounded-2xl h-9 text-center text-lg bg-[#383d41f0]"
        value={search}
        onChange={handleSearchChange}
      />
    </div>
  );
}

export default Searchbar;
