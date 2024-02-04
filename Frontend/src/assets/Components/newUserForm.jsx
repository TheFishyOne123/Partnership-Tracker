import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";

const modalClasses =
  "fixed inset-0 flex items-center justify-center backdrop-blur-xs";
const contentClasses = "bg-[#383d41f0] text-gray-50 p-6 rounded-lg w-6/12";

const newUserForm = ({ onClose }) => {
  const [adminStatus, setAdmin] = useState(false);

  const emailCheck = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5555/users/${email}`);
      if (response.status === 200) {
        return true;
      } else if (response.status === 204) {
        console.log("Email Not In Use Continue Creating User!");
        return false;
      } else {
        console.log("Something Went Wrong When Checking Email. ");
        alert(
          "Error Checking Email Against Database! Check Console For More Info!"
        );
      }
    } catch (error) {
      console.error("Error Checking Email Against Database!", error);
      alert(
        "Error Checking Email Against Database! Check Console For More Info!"
      );
    }
  };

  const createNewUser = async (userData) => {
    try {
      const response = await axios.post(
        `http://localhost:5555/users/create`,
        userData
      );
      if (response.status === 200) {
        console.log("Successfully Created New User");
        onClose();
      }
    } catch (error) {
      console.error("Error Creating User: ", error);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const creationDataObject = {};

    formData.forEach((value, key) => {
      creationDataObject[key] = value;
    });
    creationDataObject["newUser"] = true;
    console.log(creationDataObject);

    try {
      const emailCheckValue = await emailCheck(creationDataObject.email);

      if (emailCheckValue) {
        console.log("Email Already In Use!");
        alert("Email Already In Use! Try Again With A Different Email!");
      } else {
        createNewUser(creationDataObject);
      }
    } catch (error) {
      console.log("Unexpected Output When Creating User", error);
      alert("Error When Creating User. Check Console!");
    }
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
            <select
              required
              name="admin"
              value={adminStatus}
              onChange={(e) => setAdmin(e.target.value === "true")}
            >
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
};

export default newUserForm;
