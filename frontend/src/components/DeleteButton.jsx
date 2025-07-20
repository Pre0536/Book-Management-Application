import React from 'react';
import { useNavigate } from 'react-router-dom';

function DeleteButton({ 
  label = "Delete", 
  onConfirmDelete, 
  navigateTo = "/", 
  confirmText = "Möchten Sie den Löschvorgang fortsetzen?" 
}) {
  
  const navigate = useNavigate();

  const handleClick = async () => {
    const confirmed = window.confirm(confirmText);
    if (confirmed) {
      try {
        await onConfirmDelete();
        navigate(navigateTo);
      } catch (err) {
        alert(err.message); 
      }
    }
  };

    return (
    <button 
      type="button"
      onClick={handleClick}
      className="delete-button"
    >
      {label}
    </button>
  );
}

export default DeleteButton;