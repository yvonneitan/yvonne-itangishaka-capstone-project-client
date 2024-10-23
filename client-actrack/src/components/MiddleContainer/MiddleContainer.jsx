import React, { useEffect, useState } from 'react';
import './MiddleContainer.scss';

function MiddleContainer({ selectedList }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

  // Fetch user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/1');
        if (!response.ok) {
          throw new Error('Network response for user was not ok');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    getUser();
  }, []);

  // Fetch tasks based on selected list
  useEffect(() => {
    console.log("Fetching tasks for list:", selectedList);
    if (selectedList) {
      setTasks([]);
      const getTasks = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
          if (!response.ok) {
            throw new Error('Network response for tasks was not ok');
          }
          const tasksData = await response.json();
          setTasks(tasksData);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      getTasks();
    }
  }, [selectedList]); 
  const formatDate = (date) => {
    const options = { weekday: 'short' };
    const weekday = new Intl.DateTimeFormat('en-US', options).format(date);

    const day = date.getDate();
    const monthOptions = { month: 'short' }; 
    const month = new Intl.DateTimeFormat('en-US', monthOptions).format(date);
    const year = date.getFullYear(); 

    // Add the suffix for the day (st, nd, rd, th)
    const suffix = (day) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `Today, ${weekday} ${day}${suffix(day)}, ${month} ${year}`;
  };
  return (
    <main className="main-content">
      {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>}
      <p className="main-content__date">{formatDate(new Date())}</p> 

      <div className="main-content__task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="main-content__task">
              <input type="checkbox" id={`task-${task.id}`} className="main-content__task--checkbox" />
              <label htmlFor={`task-${task.id}`} className="main-content__task--label">{task.task}</label>
              <span className="main-content__task--time">
                {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
              </span>
            </div>
          ))
        ) : (
          selectedList ? (
            <div>Your Task List is Empty!</div>
          ) : (
            <div>Select a list to see your tasks.</div>
          )
        )}
      </div>
      <button className="main-content__add--task">+ Add new Task ⌘N</button>
    </main>
  );
}

export default MiddleContainer;
