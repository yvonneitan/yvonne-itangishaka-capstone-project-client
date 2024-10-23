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

  return (
    <main className="main-content">
      {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>}
      <p className="main-content__date">Today, {new Date().toLocaleDateString()}</p> 

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
          <div>Select a list to see your tasks.</div>
        )}
      </div>
      <button className="main-content__add--task">+ Add new Task ⌘N</button>
    </main>
  );
}

export default MiddleContainer;
