import { React, useState, useEffect } from "react";
import { IoCloseSharp } from "react-icons/io5";
import "../CSS/editingForm.css";
import axios from "axios";

function editingForm({ isOpen, onClose, rowdata }) {
  const [selectedPathway, setSelectedPathway] = useState(rowdata.pathway);
  const [selectedTime, setSelectedTime] = useState(rowdata.timeOfDay);

  useEffect(() => {
    setSelectedPathway(rowdata.pathway || "");
    setSelectedTime(rowdata.timeOfDay || "");
  }, [rowdata]);

  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center backdrop-blur-xs"
    : "hidden";
  const contentClasses = isOpen
    ? "bg-[#383d41f0] text-gray-50  p-6 rounded-lg w-9/12"
    : "hidden";

  const updatePartnerData = async (id, updatedPartnerData) => {
    try {
      const response = await axios.put(
        `http://localhost:5555/partners/edit/${id}`,
        updatedPartnerData
      );

      if (response.status === 200) {
        console.log("Successful Edit");
      }
    } catch (error) {
      console.error("Error Updating Partner Data", error);
    }
  };

  const handleSubmitForm = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const editDataObject = {};

    formData.forEach((value, key) => {
      editDataObject[key] = value;
    });

    console.log("Form Data:", editDataObject);

    try {
      await updatePartnerData(rowdata._id, editDataObject);
      onClose();
    } catch (error) {
      console.error("Error Updating Partner Data", error);
    }
  };

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className="flex flex-col content-center">
          <div className="flex justify-end items-center gap-11">
            <button className="cursor-pointer" onClick={onClose}>
              <IoCloseSharp size="2em" />
            </button>
          </div>
          <h1 className="flex text-2xl justify-center py-9">
            Editing Partner Data
          </h1>
          <form
            className="grid grid-cols-3 gap-6 px-7 pb-6 text-center"
            onSubmit={handleSubmitForm}
          >
            <label>Company Name</label>
            <label>Company Postion</label>
            <label>Owner</label>
            <input
              required
              name="companyName"
              type="text"
              defaultValue={rowdata.companyName}
            />
            <input
              required
              name="position"
              type="text"
              defaultValue={rowdata.position}
            />
            <input
              required
              name="owner"
              type="text"
              defaultValue={rowdata.owner}
            />
            <label>Email</label>
            <label>Phone</label>
            <label>Pathway</label>
            <input
              required
              name="email"
              type="email"
              defaultValue={rowdata.email}
            />
            <input
              required
              name="phone"
              type="tel"
              pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
              defaultValue={rowdata.phone}
            />
            <select
              required
              name="pathway"
              value={selectedPathway}
              onChange={(e) => setSelectedPathway(e.target.value)}
            >
              <option value="Health">Health</option>
              <option value="STEAM">STEAM</option>
              <option value="Arts, Hospitality, & Education">
                Arts, Hospitality, & Education
              </option>
              <option value="Skilled Trades, Security, And Industry">
                Skilled Trades, Security, And Industry
              </option>
              <option value="TOP">Tiger Open Pathway</option>
              <option value="PTECH">
                Pathways in Technology Early College High School (PTECH)
              </option>
            </select>
            <label>Availability</label>
            <label>First Day Available</label>
            <label>Last Day Available</label>
            <select
              required
              name="timeOfDay"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
            >
              <option value="Morning">Morning</option>
              <option value="Afternoon">Afternoon</option>
              <option value="Evening">Evening</option>
            </select>
            <input
              required
              name="firstDayAvailable"
              type="date"
              defaultValue={rowdata.firstDayAvailable}
            />
            <input
              required
              name="lastDayAvailable"
              type="date"
              defaultValue={rowdata.lastDayAvailable}
            />
            <input
              className=" col-span-3 cursor-pointer text-white"
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
}

export default editingForm;
