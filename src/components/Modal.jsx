import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md bg-white rounded shadow-lg">
        <div className="p-4">{children}</div>
        <div className="p-2 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
