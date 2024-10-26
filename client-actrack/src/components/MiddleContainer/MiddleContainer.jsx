import React, { useEffect, useState } from 'react';
import './MiddleContainer.scss';

function MiddleContainer({ selectedList }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskEditValue, setTaskEditValue] = useState("");
  const [startTimeEdit, setStartTimeEdit] = useState("");
  const [endTimeEdit, setEndTimeEdit] = useState("");

  // Fetch user data
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/1');
        if (!response.ok) throw new Error('Network response for user was not ok');
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
    if (selectedList) {
      setTasks([]);
      const getTasks = async () => {
        try {
          const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
          if (!response.ok) throw new Error('Network response for tasks was not ok');
          const tasksData = await response.json();
          setTasks(tasksData);
        } catch (error) {
          console.error('Error fetching tasks:', error);
        }
      };
      getTasks();
    }
  }, [selectedList]);

  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setTaskEditValue(task.task);
    setStartTimeEdit(new Date(task.start_time).toISOString().slice(0, -1)); // Format for datetime-local input
    setEndTimeEdit(new Date(task.end_time).toISOString().slice(0, -1));
  };
  const formatDateForDatabase = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
  };
  
  const handleSaveEdit = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task: taskEditValue,
          start_time: formatDateForDatabase(startTimeEdit),
          end_time: formatDateForDatabase(endTimeEdit),
        }),
      });
      if (!response.ok) throw new Error('Failed to update task');
  
      setTasks(tasks.map(task => 
        task.id === taskId ? { ...task, task: taskEditValue, start_time: startTimeEdit, end_time: endTimeEdit } : task
      ));
      setEditTaskId(null);
    } catch (error) {
      console.error('Error saving task edit:', error);
    }
  };
  

  const formatDate = (date) => {
    const options = { weekday: 'short' };
    const weekday = new Intl.DateTimeFormat('en-US', options).format(date);
    const day = date.getDate();
    const monthOptions = { month: 'short' };
    const month = new Intl.DateTimeFormat('en-US', monthOptions).format(date);
    const year = date.getFullYear();

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
              {editTaskId === task.id ? (
                <>
                  <input
                    type="text"
                    value={taskEditValue}
                    onChange={(e) => setTaskEditValue(e.target.value)}
                    className="main-content__task--edit-input"
                  />
                  <input
                    type="datetime-local"
                    value={startTimeEdit}
                    onChange={(e) => setStartTimeEdit(e.target.value)}
                    className="main-content__task--edit-time"
                  />
                  <input
                    type="datetime-local"
                    value={endTimeEdit}
                    onChange={(e) => setEndTimeEdit(e.target.value)}
                    className="main-content__task--edit-time"
                  />
                  <button onClick={() => handleSaveEdit(task.id)} className="main-content__task--save-button">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <label htmlFor={`task-${task.id}`} className="main-content__task--label">{task.task}</label>
                  <button onClick={() => handleEditClick(task)} className="main-content__task--edit-button">✎</button>
                  <span className="main-content__task--time">
                    {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
                  </span>
                </>
              )}
            </div>
          ))
        ) : (
          selectedList ? (
            <div className="main-content__error--task">{`Your "${selectedList}" List is Empty!`}</div>
          ) : (
            <div className="main-content__select--list">Select an AcTrack list to see your tasks.</div>
          )
        )}
      </div>
    </main>
  );
}

export default MiddleContainer;
