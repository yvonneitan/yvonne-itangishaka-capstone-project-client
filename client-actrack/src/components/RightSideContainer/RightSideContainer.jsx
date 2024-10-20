import React, { useState, useEffect } from 'react';

function RightSideContainer() {
   

      const [tasks, setTasks] = useState([
        { name: 'Laundry', time: '08:00 - 09:00' },
        { name: 'Groceries', time: '09:00 - 11:00' },
        { name: 'Clean Rubby', time: '11:00 - 13:00' },
        { name: 'Call Dad', time: '13:00 - 14:00' },
        { name: 'Clean Pantry', time: '14:30 - 15:00' },
        { name: 'Meal Prep', time: '19:00 - 20:00' }
      ]);
    
      useEffect(() => {
        const handleKeyDown = (e) => {
          if (e.metaKey && e.key === 'l') {
            alert('Create new List');
          }
          if (e.metaKey && e.key === 'n') {
            alert('Add new Task');
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
      }, []);
    
      return (
        <main className="main-content">
          <h2>Good morning, Yvonne</h2>
          <p>Today, Mon 14th, Oct 2024</p>
          <div className="task-container">
            {tasks.map((task, index) => (
              <div key={index} className="task">
                <input type="checkbox" id={`task-${index}`} />
                <label htmlFor={`task-${index}`}>{task.name}</label>
                <span className="task-time">{task.time}</span>
              </div>
            ))}
          </div>
          <button className="add-task-btn">+ Add new Task ⌘N</button>
        </main>
      );
    };
    


export default RightSideContainer
