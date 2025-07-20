import React from 'react';

function SubmitButton({ label, disabled = false, className = '', type = 'submit', onClick }) {
  return (
    <button 
      type={type} 
      disabled={disabled} 
      className={className} 
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default SubmitButton;