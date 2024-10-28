import React from "react";
import "./DeleteModal.scss";

function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
}) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-question">
        <h3 className="modal-question__confirm">{title}</h3>
        <p className="modal-question__sure">{message}</p>
        <div className="modal-actions">
          <button onClick={onConfirm} className="modal-actions__confirm">
            {confirmLabel}
          </button>
          <button onClick={onClose} className="modal-actions__cancel">
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteModal;
