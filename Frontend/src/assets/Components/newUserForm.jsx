import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const modalClasses =
  "fixed inset-0 flex items-center justify-center backdrop-blur-xs";
const contentClasses = "bg-[#383d41f0] text-gray-50 p-6 rounded-lg w-6/12";

function newUserForm({ onClose }) {
  const createNewUser = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/users/create`,
        userData
      );
      if (response.status === 200) {
        console.log("Successfully Created New User");
      }
    } catch (error) {
      console.error("Error Creating User: ", error);
    }
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const creationDataObject = {};

    formData.forEach((value, key) => {
      creationDataObject[key] = value;
    });
    creationDataObject["newUser"] = true;
    console.log(creationDataObject);
    createNewUser(creationDataObject);
    onClose();
  };

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div>
          <div className="flex justify-end items-center gap-11">
            <button className="cursor-pointer" onClick={onClose}>
              <IoCloseSharp size="2em" />
            </button>
          </div>
          <h1 className="flex text-2xl justify-center py-9">
            New User Creation Form
          </h1>
          <form
            className="grid grid-cols-3 gap-6 px-7 pb-6 text-center"
            onSubmit={handleSubmitForm}
          >
            <label>Name</label>
            <label>Email</label>
            <label>Admin</label>
            <input
              required
              name="name"
              type="text"
              placeholder="Ex: John Doe"
            ></input>
            <input
              required
              name="email"
              type="email"
              placeholder="Ex: johndoe@gmail.com"
            />
            <select required name="admin">
              <option value={false}>No</option>
              <option value={true}>Yes</option>
            </select>
            <input
              className=" col-span-3 cursor-pointer text-white pt-3"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default newUserForm;
