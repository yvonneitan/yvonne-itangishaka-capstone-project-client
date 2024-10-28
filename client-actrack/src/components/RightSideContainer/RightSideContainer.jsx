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
    // <div className="container">
    //   <img src={downIcon} className="container__menu" alt="Menu Icon" onClick={toggleModal} />

    //   <p className="container__title">Today</p>   

    //   <img src={menuIcon} className="container__menu" alt="Menu Icon" />

    //   <TaskManager isOpen={isModalOpen} onClose={toggleModal}>
    //     <DatePicker
    //       selected={startDate}
    //       onChange={(date) => setStartDate(date)}
    //       inline 
    //     />
    //   </TaskManager>
    // </div>
    <></>
  );
}

export default RightSideContainer;
