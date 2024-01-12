import React, { useState } from "react";
import RequestNewPartnersForm from "./requestNewPartnersForm";

function AddNewPartnersDiv({ creationFormStatus }) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handleOpenForm = () => {
    setIsFormOpen(true);
    creationFormStatus(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    creationFormStatus(false);
  };

  return (
    <div>
      {isFormOpen && <RequestNewPartnersForm onClose={handleCloseForm} />}
      <h1 className="text-white text-lg font-bold mb-2">
        Not What You're Looking For?
      </h1>
      <button
        className="bg-gray-500 text-white font-bold py-2 px-4 rounded"
        onClick={handleOpenForm}
      >
        Request A New Partner Here
      </button>
    </div>
  );
}

export default AddNewPartnersDiv;
