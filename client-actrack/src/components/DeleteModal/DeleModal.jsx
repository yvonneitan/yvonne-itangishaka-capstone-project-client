import React from 'react';
import './DeleteModal.scss';

function DeleteModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-question">
            {/* <h3 className="modal-question__confirm">Confirm Deletion</h3> */}
            <p className="modal-question__sure">Are you sure you want to delete this task?</p>
            <div className="modal-actions">
                <button onClick={onConfirm} className="modal-actions__confirm">Delete</button>
                <button onClick={onClose} className="modal-actions__cancel">Cancel</button>
            </div>
      </div>
    </div>
  );
}

export default DeleteModal;
