import React, { useEffect, useState } from 'react';

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
      {user && <h2>Good morning, {user.username}</h2>} 
      <p>Today, {new Date().toLocaleDateString()}</p> 
      <div className="task-container">
        {tasks.map((task, index) => (
          <div key={index} className="task">
            <input type="checkbox" id={`task-${index}`} />
            <label htmlFor={`task-${index}`}>{task.task}</label>
            <span className="task-time">{task.start_time} - {task.end_time}</span>
          </div>
        ))}
      </div>
      <button className="add-task-btn">+ Add new Task ⌘N</button>
    </main>
  );
}

export default MiddleContainer;
