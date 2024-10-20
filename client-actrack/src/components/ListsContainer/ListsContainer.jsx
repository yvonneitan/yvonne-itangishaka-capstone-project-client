import React from 'react'
import './ListsContainer.scss'

function ListsContainer(className) {
  // return (
  //   <div className='lists'>
  //       <p className="lists__title">
  //           Yvonne's AcTrack
  //       </p>

      
  //   </div>
  // )
  const taskLists = [
    { name: 'Home Tasks', count: 6 },
    { name: 'Completed', count: 5 },
    { name: 'Personal', count: 7 },
    { name: 'Work', count: 9 },
    { name: 'List of Books', count: 20 },
    { name: 'Diet', count: 6 },
    { name: 'Road Trips list', count: 20 },
    { name: 'List of Movies', count: 8 }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Yvonne’s AcTrack</div>
      <ul className="task-lists">
        {taskLists.map((list, index) => (
          <li key={index} className="task-list">
            <button>{list.name} <span>{list.count}</span></button>
          </li>
        ))}
      </ul>
      <button className="add-list-btn">+ Create new List ⌘L</button>
    </aside>
  );
};



export default ListsContainer
