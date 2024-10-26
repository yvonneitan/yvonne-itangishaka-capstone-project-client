import React from 'react';
import './DeleteModal.scss';

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this task?</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-confirm">Delete</button>
          <button onClick={onClose} className="modal-cancel">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
