import React from 'react';
import './DeleteModal.scss';

// function DeleteModal({ isOpen, onClose, onConfirm }) {
//   if (!isOpen) return null;

// //   return (
// //     <div className="modal-overlay">
// //       <div className="modal-question">
// //             <h3 className="modal-question__confirm">Confirm Deletion</h3>
// //             <p className="modal-question__sure">Are you sure you want to delete this task?</p>
// //             <div className="modal-actions">
// //                 <button onClick={onConfirm} className="modal-actions__confirm">Delete</button>
// //                 <button onClick={onClose} className="modal-actions__cancel">Cancel</button>
// //             </div>
// //       </div>
// //     </div>
// //   );
// // }



function DeleteModal({ isOpen, onClose, onConfirm, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-question">
        <h3 className="modal-question__confirm">{title}</h3>
        <p className="modal-question__sure">{message}</p>
        <div className="modal__actions">
          <button onClick={onConfirm} className="modal-actions__confirm">{confirmLabel}</button>
          <button onClick={onClose} className="modal-actions__cancel">{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
}


export default DeleteModal;


// DeleteModal.jsx
// import React from 'react';
// import './DeleteModal.scss';

// function DeleteModal({ isOpen, onClose, onConfirm }) {
//   if (!isOpen) return null; // Do not render if not open

//   return (
//     <div className="delete-modal">
//       <div className="delete-modal__content">
//         <h3>Confirm Delete</h3>
//         <p>Are you sure you want to delete this list?</p>
//         <div className="delete-modal__actions">
//           <button onClick={onConfirm} className="delete-modal__confirm-button">
//             Delete
//           </button>
//           <button onClick={onClose} className="delete-modal__cancel-button">
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DeleteModal;
