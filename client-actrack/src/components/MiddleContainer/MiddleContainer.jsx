import React, { useEffect, useState } from 'react';
import "./MiddleContainer.scss"
function MiddleContainer() {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);

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
        console.error('Error getting user user:', error);
      }
    };

    const getTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks/active'); 
        if (!response.ok) {
          throw new Error('Network response for tasks was not ok');
        }
        const tasksData = await response.json();
        setTasks(tasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    getUser();
    getTasks();
  }, []);

  return (
    <main className="main-content">
    {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>} 
    <p className="main-content__date">Today, {new Date().toLocaleDateString()}</p> 
    <div className="main-content__task-container">
      {tasks.map((task, index) => (
        <div key={index} className="main-content__task">
          <input type="checkbox" id={`task-${index}`} className="main-content__task--checkbox" />
          <label htmlFor={`task-${index}`} className="main-content__task--label">{task.task}</label>
          <span className="main-content__task--time">{task.start_time} - {task.end_time}</span>
        </div>
      ))}
    </div>
    <button className="main-content__add--task">+ Add new Task ⌘N</button>
  </main>
  );
}

export default MiddleContainer;
