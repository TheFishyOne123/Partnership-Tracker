import React from "react";
import axios from "axios";

function RequestDeletionPopUp({ isOpen, onClose, deletionIDs }) {
  const modalClasses = isOpen
    ? "fixed inset-0 flex items-center justify-center backdrop-blur-xs"
    : "hidden";
  const contentClasses = isOpen
    ? "bg-[#383d41f0] text-gray-50  p-6 rounded-lg w-4/12"
    : "hidden";

  const deleteRequests = async (deletionID) => {
    try {
      const url = `http://localhost:5555/requests/delete/${deletionID}`;

      const response = await axios.delete(url);

      if (response.status === 200) {
        console.log("Request Deleted Successfully");
      }
    } catch (error) {
      console.log("Error Deleting Request");
      console.log("Error: ", error);
    }
  };

  const handleYes = async () => {
    for (const request of deletionIDs) {
      console.log("Deleting Partner ", request);
      await deleteRequests(request);
    }
    onClose();
  };

  return (
    <div className={modalClasses}>
      <div className={contentClasses}>
        <div className="flex flex-col ">
          <h1 className=" self-center py-5 text-lg">
            Are You Sure You Want To Delete The Selected Requests?
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

export default RequestDeletionPopUp;
