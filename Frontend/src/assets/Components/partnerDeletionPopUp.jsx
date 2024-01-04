import React from "react";
import axios from "axios";

function PartnerDeletionPopUp({ isOpen, onClose, deletionID }) {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center backdrop-blur-xs"
    : "hidden";
  const contentClasses = isOpen
    ? "bg-[#383d41f0] text-gray-50  p-6 rounded-lg w-4/12"
    : "hidden";

  const deletePartner = async (deletionID) => {
    try {
      const url = `http://localhost:5555/partners/delete/${deletionID}`;

      const response = await axios.delete(url);

      if (response.status === 200) {
        console.log("Partner Deleted Successfully");
      }
    } catch (error) {
      console.log("Error Deleting");
      console.log("Error: ", error);
    }
  };

  const handleYes = () => {
    console.log("Deleting Partner");
    deletePartner(deletionID);
    onClose();
  };

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className="flex flex-col ">
          <h1 className=" self-center py-5 text-lg">
            Are You Sure You Want Delete This Partner?
          </h1>
          <div className=" self-center flex gap-20 pb-5">
            <button
              onClick={handleYes}
              className=" bg-green-500 px-5 py-2 rounded-3xl"
            >
              Yes
            </button>
            <button
              onClick={onClose}
              className=" bg-red-500 px-5 py-2 rounded-3xl"
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PartnerDeletionPopUp;
