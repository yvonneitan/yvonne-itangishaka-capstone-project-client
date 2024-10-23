// import React from 'react'
// import menuIcon from "../../assets/icons/menu.svg"
// import downIcon from "../../assets/icons/arrow_down.svg"
// import "./RightSideContainer.scss"
// function RightSideContainer() {
//   return (
//     <div className="container">
//       <img src={downIcon} className="contaner__menu" alt="Menu Icon" />

//       <p  className="container__title">Today</p>   
//       <img src={menuIcon} className="contaner__menu" alt="Menu Icon" />
//     </div>
//   )
// }

// export default RightSideContainer




// import React, { useState } from 'react';
// import menuIcon from "../../assets/icons/menu.svg";
// import downIcon from "../../assets/icons/arrow_down.svg";
// import DatePicker from "react-datepicker"; // Importing DatePicker
// import "react-datepicker/dist/react-datepicker.css"; // Importing DatePicker styles
// import "./RightSideContainer.scss";

// function RightSideContainer() {
//   const [startDate, setStartDate] = useState(new Date()); // State to manage the selected date
//   const [isOpen, setIsOpen] = useState(false); // State to manage the visibility of the date picker

//   // Toggle function to show/hide date picker
//   const toggleDatePicker = () => {
//     setIsOpen(!isOpen);
//   };

//   return (
//     <div className="container">
//       <img src={downIcon} className="container__menu" alt="Menu Icon" onClick={toggleDatePicker} />

//       <p className="container__title">Today</p>   

//       <img src={menuIcon} className="container__menu" alt="Menu Icon" />

//       {isOpen && (
//         <div className="date-picker">
//           <DatePicker
//             selected={startDate}
//             onChange={(date) => setStartDate(date)} // Update the date when selected
//             inline // This prop makes the date picker inline
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default RightSideContainer;
import React, { useState } from 'react';
import menuIcon from "../../assets/icons/menu.svg";
import downIcon from "../../assets/icons/arrow_down.svg";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import TaskManager from '../TaskManager/TaskManager'; 
import "./RightSideContainer.scss";

function RightSideContainer() {
  const [startDate, setStartDate] = useState(new Date()); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="container">
      <img src={downIcon} className="container__menu" alt="Menu Icon" onClick={toggleModal} />

      <p className="container__title">Today</p>   

      <img src={menuIcon} className="container__menu" alt="Menu Icon" />

      <TaskManager isOpen={isModalOpen} onClose={toggleModal}>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          inline 
        />
      </TaskManager>
    </div>
  );
}

export default RightSideContainer;
