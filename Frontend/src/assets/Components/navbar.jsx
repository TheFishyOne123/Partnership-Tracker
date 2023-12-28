import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Searchbar from "./searchbar";

function Navbar(props) {
  const name = props.forwardedState;
  const navigate = useNavigate();
  console.log(name);
  function handleLogout() {
    navigate("/", { state: { AuthInfo: false } });
  }

  const handleSearchUpdate = (value) => {
    props.onSearchChange(value);
  };

  return (
    <div className=" text-gray-50	w-screen pl-8 bg-gray-500 font-black h-16 flex items-center text-2xl ">
      <p className="font-normal">Partnership Tracker</p>
      <Searchbar onSearchChange={handleSearchUpdate} />
      <div className="flex ml-auto pr-8	">
        <Dropdown className="d-inline mx-2" autoClose="outside">
          <Dropdown.Toggle
            variant="secondary"
            className=" text-lg bg-transparent border-transparent hover:border-transparent"
            id="dropdown-autoclose-outside"
          >
            {name[0][0]}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={handleLogout}
              className="active:bg-gray-400"
            >
              Logout
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Navbar;
