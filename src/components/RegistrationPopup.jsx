import React, { useState } from 'react';
import Modal from '../components/Modal';
import RegistrationForm from '../components/RegistrationForm';

const RegistrationPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Open the popup
  const openPopup = () => setIsOpen(true);

  // Close the popup
  const closePopup = () => setIsOpen(false);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* Button to open the popup */}
      <button
        onClick={openPopup}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Open Registration Form
      </button>

      {/* Modal Component */}
      <Modal isOpen={isOpen} onClose={closePopup}>
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>
        <RegistrationForm />
      </Modal>
    </div>
  );
};

export default RegistrationPopup;
