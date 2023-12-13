import React from 'react';

function EditingForm({ isOpen, onClose, children }) {
  const modalClasses = isOpen ? 'fixed inset-0 flex items-center justify-center' : 'hidden';
  const overlayClasses = isOpen ? 'fixed inset-0 bg-black opacity-50' : 'hidden';
  const contentClasses = isOpen ? 'bg-white p-4 rounded-lg' : 'hidden';

  return (
    <div className={modalClasses}>
      <div className={overlayClasses} onClick={onClose}></div>
      <div className={contentClasses}>
        <div className="flex justify-end">
          <button className="text-gray-500" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default EditingForm;
