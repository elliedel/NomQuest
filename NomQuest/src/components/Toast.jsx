import React from 'react';

const Toast = ({ message, onClose }) => {
  return (
    <div className="fixed bottom-5 right-5 bg-[#9f2f2f] text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 ease-in-out">
      <span>{message}</span>
      <button onClick={onClose} className="ml-4 text-lg">
        &times;
      </button>
    </div>
  );
};

export default Toast;