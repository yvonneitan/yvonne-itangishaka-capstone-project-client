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
      {/* <button className="main-content__add--task">+ Add new Task ⌘N</button> */}
    </main>
  );
}

export default MiddleContainer;
// import React, { useEffect, useState } from 'react';
// import './MiddleContainer.scss';

// function MiddleContainer({ selectedList, availableLists, onCreateTask }) {
//   const [user, setUser] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [showTaskForm, setShowTaskForm] = useState(false);
//   const [taskName, setTaskName] = useState("");
//   const [startTime, setStartTime] = useState("");
//   const [endTime, setEndTime] = useState("");
//   const [taskList, setTaskList] = useState(selectedList || "");

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

//     getUser();
//   }, []);

//   useEffect(() => {
//     if (selectedList) {
//       setTaskList(selectedList);  // Set the current selected list
//       setTasks([]);
//       const getTasks = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
//           if (!response.ok) {
//             throw new Error('Network response for tasks was not ok');
//           }
//           const tasksData = await response.json();
//           setTasks(tasksData);
//         } catch (error) {
//           console.error('Error fetching tasks:', error);
//         }
//       };
//       getTasks();
//     }
//   }, [selectedList]);

//   const handleAddNewTaskClick = () => {
//     setShowTaskForm(!showTaskForm);
//   };

//   const handleCreateNewTask = (e) => {
//     e.preventDefault();
//     onCreateTask({ taskName, startTime, endTime, taskList });
//     setTaskName("");
//     setStartTime("");
//     setEndTime("");
//     setShowTaskForm(false); // Hide the form after adding the task
//   };

//   return (
//     <main className="main-content">
//       {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>}
//       <p className="main-content__date">{new Date().toLocaleString()}</p> 

//       <div className="main-content__task-container">
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <div key={task.id} className="main-content__task">
//               <input type="checkbox" id={`task-${task.id}`} className="main-content__task--checkbox" />
//               <label htmlFor={`task-${task.id}`} className="main-content__task--label">{task.task}</label>
//               <span className="main-content__task--time">
//                 {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
//               </span>
//             </div>
//           ))
//         ) : (
//           selectedList ? (
//             <div>Your Task List is Empty!</div>
//           ) : (
//             <div>Select a list to see your tasks.</div>
//           )
//         )}
//       </div>

//       <button className="main-content__add--task" onClick={handleAddNewTaskClick}>
//         + Add new Task ⌘N
//       </button>

//       {showTaskForm && (
//         <form onSubmit={handleCreateNewTask} className="task-form__container">
//           <label htmlFor="task-name" className="task-form__label">Task:</label>
//           <input
//             type="text"
//             id="task-name"
//             className="task-form__input"
//             value={taskName}
//             onChange={(e) => setTaskName(e.target.value)}
//             required
//           />

//           <label htmlFor="start-time" className="task-form__label">From:</label>
//           <input
//             type="datetime-local"
//             id="start-time"
//             className="task-form__input"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             required
//           />

//           <label htmlFor="end-time" className="task-form__label">To:</label>
//           <input
//             type="datetime-local"
//             id="end-time"
//             className="task-form__input"
//             value={endTime}
//             onChange={(e) => setEndTime(e.target.value)}
//             required
//           />

//           <label htmlFor="task-list" className="task-form__label">List:</label>
//           <select
//             id="task-list"
//             className="task-form__input"
//             value={taskList}
//             onChange={(e) => setTaskList(e.target.value)}
//             required
//           >
//             <option value="">-- Select a List --</option>
//             {availableLists.map((list) => (
//               <option key={list} value={list}>{list}</option>
//             ))}
//           </select>

//           <button type="submit" className="task-form__submit-btn">
//             Add Task
//           </button>
//         </form>
//       )}
//     </main>
//   );
// }

// export default MiddleContainer;
