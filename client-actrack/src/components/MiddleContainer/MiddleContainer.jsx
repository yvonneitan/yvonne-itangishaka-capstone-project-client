// import React, { useEffect, useState } from 'react';
// import "./MiddleContainer.scss";

// function MiddleContainer() {
//   const [user, setUser] = useState(null);
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/users/1'); 
//         if (!response.ok) {
//           throw new Error('Network response for user was not ok');
//         }
//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error('Error getting user:', error);
//       }
//     };
//     const getTasks = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/tasks?listName=Work Tasks'); 
//         if (!response.ok) {
//           throw new Error('Network response for tasks was not ok');
//         }
//         const tasksData = await response.json();
//         setTasks(tasksData);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };

//     getUser();
//     getTasks();
//   }, []);

//   return (
//     <main className="main-content">
//       {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>} 
//       <p className="main-content__date">Today, {new Date().toLocaleDateString()}</p> 
//       <div className="main-content__task-container">
//         {tasks.map((task, index) => (
//           <div key={index} className="main-content__task">
//             <input type="checkbox" id={`task-${index}`} className="main-content__task--checkbox" />
//             <label htmlFor={`task-${index}`} className="main-content__task--label">{task.task}</label>
//             <span className="main-content__task--time">{task.start_time} - {task.end_time}</span>
//           </div>
//         ))}
//       </div>
//       <button className="main-content__add--task">+ Add new Task ⌘N</button>
//     </main>
//   );
// }

// export default MiddleContainer;
import React, { useEffect, useState } from 'react';
import './MiddleContainer.scss';

function MiddleContainer({ selectedList }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  // Fetch tasks based on selected list
  useEffect(() => {
    if (selectedList) {
      const getTasks = async () => {
        setLoading(true); // Set loading state before fetching
        try {
          const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
          if (!response.ok) {
            throw new Error('Network response for tasks was not ok');
          }
          const tasksData = await response.json();
          setTasks(tasksData);
        } catch (error) {
          console.error('Error fetching tasks:', error);
          setError('Failed to fetch tasks.');
        } finally {
          setLoading(false); // Reset loading state
        }
      };
      getTasks();
    }
  }, [selectedList]); 

  return (
    <main className="main-content">
      {loading ? (
        <div className="main-content__loading">Loading tasks...</div>
      ) : error ? (
        <div className="main-content__error">{error}</div>
      ) : (
        <>
          {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>}
          <div className="main-content__task-container">
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <div key={task.id} className="main-content__task">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    className="main-content__task--checkbox"
                    defaultChecked={task.status === 'completed'}
                  />
                  <label htmlFor={`task-${task.id}`} className="main-content__task--label">{task.task}</label>
                  <span className="main-content__task--time">
                    {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
                  </span>
                </div>
              ))
            ) : (
              <div>No tasks available for "{selectedList}".</div>
            )}
          </div>
          <button className="main-content__add--task">+ Add new Task ⌘N</button>
        </>
      )}
    </main>
  );
}

export default MiddleContainer;
