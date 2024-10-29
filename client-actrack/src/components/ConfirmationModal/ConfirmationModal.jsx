import React from 'react';
import './ConfirmationModal.scss'; // Create a corresponding SCSS file for styles

const ConfirmationModal = ({ isOpen, onClose, onConfirm, taskName }) => {
  if (!isOpen) return null;

  return (
    <div className="confirmation-modal">
      <div className="confirmation-modal__content">
        <h2>Confirm Completion</h2>
        <p>Are you sure you want to mark "{taskName}" as complete?</p>
        <div className="confirmation-modal__actions">
          <button onClick={onConfirm} className="confirmation-modal__confirm-button">Yes</button>
          <button onClick={onClose} className="confirmation-modal__cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
