// import React, { useEffect, useState } from 'react';
// import './MiddleContainer.scss';
// import editIcon from "../../assets/icons/edit-24px.svg";
// import DeleteModal from '../DeleteModal/DeleteModal'; 
// import deleteIcon from "../../assets/icons/delete_outline-24px.svg";


// function MiddleContainer({ selectedList }) {
//   const [user, setUser] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [taskEditValue, setTaskEditValue] = useState("");
//   const [startTimeEdit, setStartTimeEdit] = useState("");
//   const [endTimeEdit, setEndTimeEdit] = useState("");
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
//   const [completeTask, setCompleteTask]=useState();

//   // Fetch user data
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/users/1');
//         if (!response.ok) throw new Error('Network response for user was not ok');
//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error('Error getting user:', error);
//       }
//     };
//     getUser();
//   }, []);

//   // Fetch tasks based on selected list
//   useEffect(() => {
//     if (selectedList) {
//       setTasks([]);
//       const getTasks = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
//           if (!response.ok) throw new Error('Network response for tasks was not ok');
//           const tasksData = await response.json();
//           setTasks(tasksData);
//         } catch (error) {
//           console.error('Error fetching tasks:', error);
//         }
//       };
//       getTasks();
//     }
//   }, [selectedList]);

//   // const completChecked=()=>{
//     const handleToggleComplete = async (taskId) => {
//       try {
//         const taskToUpdate = tasks.find(task => task.id === taskId);
//         const updatedTask = { ...taskToUpdate, completed: !taskToUpdate.completed };
    
//         const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json' },
//           body: JSON.stringify(updatedTask),
//         });
    
//         if (!response.ok) throw new Error('Failed to update task');
    
//         setTasks(tasks.map(task => (task.id === taskId ? updatedTask : task)));
//       } catch (error) {
//         console.error('Error updating task completion:', error);
//       }
//     };
    


//   // };

//   const handleEditClick = (task) => {
//     setEditTaskId(task.id);
//     setTaskEditValue(task.task);
//     setStartTimeEdit(new Date(task.start_time).toISOString().slice(0, -1));
//     setEndTimeEdit(new Date(task.end_time).toISOString().slice(0, -1));
//   };

//   const handleCancelEdit = () => {
//     setEditTaskId(null);
//     setTaskEditValue("");
//     setStartTimeEdit("");
//     setEndTimeEdit("");
//   };

//   const handleOpenDeleteModal = (taskId) => {
//     setTaskToDelete(taskId);
//     setDeleteModalOpen(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteModalOpen(false);
//     setTaskToDelete(null);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/tasks/${taskToDelete}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) throw new Error('Failed to delete task');

//       // Remove the deleted task from the state
//       setTasks(tasks.filter(task => task.id !== taskToDelete));
//       handleCloseDeleteModal();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   // Fetch user data
//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/users/1');
//         if (!response.ok) throw new Error('Network response for user was not ok');
//         const userData = await response.json();
//         setUser(userData);
//       } catch (error) {
//         console.error('Error getting user:', error);
//       }
//     };
//     getUser();
//   }, []);

//   // Fetch tasks based on selected listß
//   useEffect(() => {
//     if (selectedList) {
//       setTasks([]);
//       const getTasks = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
//           if (!response.ok) throw new Error('Network response for tasks was not ok');
//           const tasksData = await response.json();
//           setTasks(tasksData);
//         } catch (error) {
//           console.error('Error fetching tasks:', error);
//         }
//       };
//       getTasks();
//     }
//   }, [selectedList]);

//   const formatDateForDatabase = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().slice(0, 19).replace('T', ' ');
//   };
  
//   const handleSaveEdit = async (taskId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           task: taskEditValue,
//           start_time: formatDateForDatabase(startTimeEdit),
//           end_time: formatDateForDatabase(endTimeEdit),
//         }),
//       });
//       if (!response.ok) throw new Error('Failed to update task');
  
//       setTasks(tasks.map(task => 
//         task.id === taskId ? { ...task, task: taskEditValue, start_time: startTimeEdit, end_time: endTimeEdit } : task
//       ));
//       setEditTaskId(null);
//     } catch (error) {
//       console.error('Error saving task edit:', error);
//     }
//   };

//   const formatDate = (date) => {
//     const options = { weekday: 'short' };
//     const weekday = new Intl.DateTimeFormat('en-US', options).format(date);
//     const day = date.getDate();
//     const monthOptions = { month: 'short' };
//     const month = new Intl.DateTimeFormat('en-US', monthOptions).format(date);
//     const year = date.getFullYear();

//     const suffix = (day) => {
//       if (day > 3 && day < 21) return 'th';
//       switch (day % 10) {
//         case 1: return 'st';
//         case 2: return 'nd';
//         case 3: return 'rd';
//         default: return 'th';
//       }
//     };

//     return `Today, ${weekday} ${day}${suffix(day)}, ${month} ${year}`;
//   };

  
//   return (
//     <main className="main-content">
//       {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>}
//       <p className="main-content__date">{formatDate(new Date())}</p>

//       <div className="main-content__task-container">
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <div key={task.id} className="main-content__task">
//               <input type="checkbox" id={`task-${task.id}`} className="main-content__task--checkbox" />
//               {editTaskId === task.id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={taskEditValue}
//                     onChange={(e) => setTaskEditValue(e.target.value)}
//                     className="main-content__task--edit-input"
//                   />
//                   <input
//                     type="datetime-local"
//                     value={startTimeEdit}
//                     onChange={(e) => setStartTimeEdit(e.target.value)}
//                     className="main-content__task--edit-time"
//                   />
//                   <input
//                     type="datetime-local"
//                     value={endTimeEdit}
//                     onChange={(e) => setEndTimeEdit(e.target.value)}
//                     className="main-content__task--edit-time"
//                   />
//                   <button onClick={() => handleSaveEdit(task.id)} className="main-content__task--save-button">
//                     Save
//                   </button>
//                   <button onClick={handleCancelEdit} className="main-content__task--cancel-button">
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <label htmlFor={`task-${task.id}`} className="main-content__task--label">{task.task}</label>
//                   <span className="main-content__task--time">
//                     {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
//                   </span>
//                   <button onClick={() => handleOpenDeleteModal(task.id)} className="main-content__task--delete-button">
//                   <img src={deleteIcon} alt="edit icon" className="main-content__task--edit-icon"/>
//                   </button>
//                   <button onClick={() => handleEditClick(task)} className="main-content__task--edit-button">
//                     <img src={editIcon} alt="edit icon" className="main-content__task--edit-icon"/>
//                   </button>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           selectedList ? (
//             <div className="main-content__error--task">{`Your "${selectedList}" List is Empty!`}</div>
//           ) : (
//             <div className="main-content__select--list">Select an AcTrack list to see your tasks.</div>
//           )
//         )}
//       </div>
//       <DeleteModal 
//         isOpen={deleteModalOpen}
//         onClose={handleCloseDeleteModal}
//         onConfirm={handleConfirmDelete}
//       />
//     </main>
//   );
// }

// export default MiddleContainer;
// import React, { useEffect, useState } from 'react';
// import './MiddleContainer.scss';
// import editIcon from "../../assets/icons/edit-24px.svg";
// import DeleteModal from '../DeleteModal/DeleteModal'; 
// import deleteIcon from "../../assets/icons/delete_outline-24px.svg";


// function MiddleContainer({ selectedList }) {
//   const [user, setUser] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [editTaskId, setEditTaskId] = useState(null);
//   const [taskEditValue, setTaskEditValue] = useState("");
//   const [startTimeEdit, setStartTimeEdit] = useState("");
//   const [endTimeEdit, setEndTimeEdit] = useState("");
//   const [deleteModalOpen, setDeleteModalOpen] = useState(false);
//   const [taskToDelete, setTaskToDelete] = useState(null);
  


//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/api/users/1');
//         if (!response.ok) throw new Error('Network response for user was not ok');
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
//       setTasks([]);
//       const getTasks = async () => {
//         try {
//           const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
//           if (!response.ok) throw new Error('Network response for tasks was not ok');
//           const tasksData = await response.json();
//           setTasks(tasksData);
//         } catch (error) {
//           console.error('Error fetching tasks:', error);
//         }
//       };
//       getTasks();
//     }
//   }, [selectedList]);

  
//   const handleToggleComplete = async (taskId, updatedStatus) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ is_completed: updatedStatus ? 1 : 0 })
//       });
  
//       if (!response.ok) {
//         throw new Error('Failed to update task');
//       }
  
//       const data = await response.json();
  
//       setTasks(prevTasks =>
//         prevTasks.map(task =>
//           task.id === taskId ? { ...task, is_completed: updatedStatus } : task
//         )
//       );
  
//     } catch (error) {
//       console.error('Error updating task completion:', error);
//     }
//   };
  
//   const handleEditClick = (task) => {
//     setEditTaskId(task.id);
//     setTaskEditValue(task.task);
//     setStartTimeEdit(new Date(task.start_time).toISOString().slice(0, -1));
//     setEndTimeEdit(new Date(task.end_time).toISOString().slice(0, -1));
//   };

//   const handleCancelEdit = () => {
//     setEditTaskId(null);
//     setTaskEditValue("");
//     setStartTimeEdit("");
//     setEndTimeEdit("");
//   };

//   const handleOpenDeleteModal = (taskId) => {
//     setTaskToDelete(taskId);
//     setDeleteModalOpen(true);
//   };

//   const handleCloseDeleteModal = () => {
//     setDeleteModalOpen(false);
//     setTaskToDelete(null);
//   };

//   const handleConfirmDelete = async () => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/tasks/${taskToDelete}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) throw new Error('Failed to delete task');

//       setTasks(tasks.filter(task => task.id !== taskToDelete));
//       handleCloseDeleteModal();
//     } catch (error) {
//       console.error('Error deleting task:', error);
//     }
//   };

//   const formatDateForDatabase = (dateString) => {
//     const date = new Date(dateString);
//     return date.toISOString().slice(0, 19).replace('T', ' ');
//   };
  
//   const handleSaveEdit = async (taskId) => {
//     try {
//       const response = await fetch(`http://localhost:8080/api/tasks/${taskId}`, {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           task: taskEditValue,
//           start_time: formatDateForDatabase(startTimeEdit),
//           end_time: formatDateForDatabase(endTimeEdit),
//         }),
//       });
//       if (!response.ok) throw new Error('Failed to update task');
  
//       setTasks(tasks.map(task => 
//         task.id === taskId ? { ...task, task: taskEditValue, start_time: startTimeEdit, end_time: endTimeEdit } : task
//       ));
//       setEditTaskId(null);
//     } catch (error) {
//       console.error('Error saving task edit:', error);
//     }
//   };

//   const formatDate = (date) => {
//     const options = { weekday: 'short' };
//     const weekday = new Intl.DateTimeFormat('en-US', options).format(date);
//     const day = date.getDate();
//     const monthOptions = { month: 'short' };
//     const month = new Intl.DateTimeFormat('en-US', monthOptions).format(date);
//     const year = date.getFullYear();

//     const suffix = (day) => {
//       if (day > 3 && day < 21) return 'th';
//       switch (day % 10) {
//         case 1: return 'st';
//         case 2: return 'nd';
//         case 3: return 'rd';
//         default: return 'th';
//       }
//     };

//     return `Today, ${weekday} ${day}${suffix(day)}, ${month} ${year}`;
//   };

  
//   return (
//     <main className="main-content">
//       {user && <h2 className="main-content__greeting">Good day, {user.username}</h2>}
//       <p className="main-content__date">{formatDate(new Date())}</p>

//       <div className="main-content__task-container">
//         {tasks.length > 0 ? (
//           tasks.map((task) => (
//             <div key={task.id} className="main-content__task">
//               <input 
//                 // type="checkbox" 
//                 // id={`task-${task.id}`} 
//                 // className="main-content__task--checkbox" 
//                 // checked={task.completed} 
//                 // onChange={() => handleToggleComplete(task.id)} 
//                 type="checkbox" 
//   id={`task-${task.id}`} 
//   className="main-content__task--checkbox" 
//   checked={!!task.completed} // Convert to boolean to avoid undefined issues
//   onChange={() => handleToggleComplete(task.id)} 
//               />
//               {editTaskId === task.id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={taskEditValue}
//                     onChange={(e) => setTaskEditValue(e.target.value)}
//                     className="main-content__task--edit-input"
//                   />
//                   <input
//                     type="datetime-local"
//                     value={startTimeEdit||""}
//                     onChange={(e) => setStartTimeEdit(e.target.value)}
//                     className="main-content__task--edit-time"
//                   />
//                   <input
//                     type="datetime-local"
//                     value={endTimeEdit||""}
//                     onChange={(e) => setEndTimeEdit(e.target.value)}
//                     className="main-content__task--edit-time"
//                   />
//                   <button onClick={() => handleSaveEdit(task.id)} className="main-content__task--save-button">
//                     Save
//                   </button>
//                   <button onClick={handleCancelEdit} className="main-content__task--cancel-button">
//                     Cancel
//                   </button>
//                 </>
//               ) : (
//                 <>
//                   <label htmlFor={`task-${task.id}`} className="main-content__task--label">{task.task}</label>
//                   <span className="main-content__task--time">
//                     {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
//                   </span>
//                   <button onClick={() => handleOpenDeleteModal(task.id)} className="main-content__task--delete-button">
//                     <img src={deleteIcon} alt="delete icon" className="main-content__task--edit-icon"/>
//                   </button>
//                   <button onClick={() => handleEditClick(task)} className="main-content__task--edit-button">
//                     <img src={editIcon} alt="edit icon" className="main-content__task--edit-icon"/>
//                   </button>
//                 </>
//               )}
//             </div>
//           ))
//         ) : (
//           selectedList ? (
//             <div className="main-content__error--task">{`Your "${selectedList}" List is Empty!`}</div>
//           ) : (
//             <div className="main-content__select--list">Select an AcTrack list to see your tasks.</div>
//           )
//         )}
//       </div>
//       <DeleteModal 
//         isOpen={deleteModalOpen}
//         onClose={handleCloseDeleteModal}
//         onConfirm={handleConfirmDelete}
//       />
//     </main>
//   );
// }

// export default MiddleContainer;
import React, { useEffect, useState } from "react";
import "./MiddleContainer.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

function MiddleContainer({ selectedList }) {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [editTaskId, setEditTaskId] = useState(null);
  const [taskEditValue, setTaskEditValue] = useState("");
  const [startTimeEdit, setStartTimeEdit] = useState("");
  const [endTimeEdit, setEndTimeEdit] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/1");
        if (!response.ok)
          throw new Error("Network response for user was not ok");
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error("Error getting user:", error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (selectedList) {
      setTasks([]);
      const getTasks = async () => {
        try {
          const response = await fetch(
            `http://localhost:8080/api/tasks?listName=${selectedList}`
          );
          if (!response.ok)
            throw new Error("Network response for tasks was not ok");
          const tasksData = await response.json();
          setTasks(tasksData);
        } catch (error) {
          console.error("Error fetching tasks:", error);
        }
      };
      getTasks();
    }
  }, [selectedList]);

  // const handleToggleComplete = async (taskId, updatedStatus) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/api/tasks/${taskId}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({ is_completed: updatedStatus ? 1 : 0 }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to update task");
  //     }

  //     const data = await response.json();

  //     setTasks((prevTasks) =>
  //       prevTasks.map((task) =>
  //         task.id === taskId ? { ...task, is_completed: updatedStatus } : task
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Error updating task completion:", error);
  //   }
  // };

  const handleToggleComplete = async (taskId, updatedStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ is_completed: updatedStatus ? 1 : 0 }),
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to update task");
      }
  
      // const updatedTaskResponse = await response.json(); // Assuming you return the updated task from your API
  
      // setTasks((prevTasks) =>
      //   prevTasks.map((task) =>
      //     task.id === taskId ? { ...task, is_completed: updatedTaskResponse.is_completed } : task
      //   )
      const updatedTaskResponse = await response.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? updatedTaskResponse : task
        )
      );
      
      
    } catch (error) {
      console.error("Error updating task completion:", error);
    }
  };
  
  const handleEditClick = (task) => {
    setEditTaskId(task.id);
    setTaskEditValue(task.task);
    setStartTimeEdit(new Date(task.start_time).toISOString().slice(0, -1));
    setEndTimeEdit(new Date(task.end_time).toISOString().slice(0, -1));
  };

  const handleCancelEdit = () => {
    setEditTaskId(null);
    setTaskEditValue("");
    setStartTimeEdit("");
    setEndTimeEdit("");
  };

  const handleOpenDeleteModal = (listId) => {
    setTaskToDelete(listId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete task");

      setTasks(tasks.filter((task) => task.id !== taskToDelete));
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const formatDateForDatabase = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace("T", " ");
  };

  const handleSaveEdit = async (taskId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tasks/${taskId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            task: taskEditValue,
            start_time: formatDateForDatabase(startTimeEdit),
            end_time: formatDateForDatabase(endTimeEdit),
          }),
        }
      );
      if (!response.ok) throw new Error("Failed to update task");

      setTasks(
        tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                task: taskEditValue,
                start_time: startTimeEdit,
                end_time: endTimeEdit,
              }
            : task
        )
      );
      setEditTaskId(null);
    } catch (error) {
      console.error("Error saving task edit:", error);
    }
  };

  const formatDate = (date) => {
    const options = { weekday: "short" };
    const weekday = new Intl.DateTimeFormat("en-US", options).format(date);
    const day = date.getDate();
    const monthOptions = { month: "short" };
    const month = new Intl.DateTimeFormat("en-US", monthOptions).format(date);
    const year = date.getFullYear();

    const suffix = (day) => {
      if (day > 3 && day < 21) return "th";
      switch (day % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `Today, ${weekday} ${day}${suffix(day)}, ${month} ${year}`;
  };

  return (
    <main className="main-content">
      {user && (
        <h2 className="main-content__greeting">Good day, {user.username}</h2>
      )}
      <p className="main-content__date">{formatDate(new Date())}</p>

      <div className="main-content__task-container">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <div key={task.id} className="main-content__task">
              <input
                // type="checkbox"
                // id={`task-${task.id}`}
                // className="main-content__task--checkbox"
                // checked={task.completed}
                // onChange={() => handleToggleComplete(task.id)}
                type="checkbox"
                id={`task-${task.id}`}
                className="main-content__task--checkbox"
                checked={task.is_completed === 1} // Assuming is_completed is 1 for completed and 0 for not completed
                onChange={() => handleToggleComplete(task.id)}
              />
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
                    value={startTimeEdit || ""}
                    onChange={(e) => setStartTimeEdit(e.target.value)}
                    className="main-content__task--edit-time"
                  />
                  <input
                    type="datetime-local"
                    value={endTimeEdit || ""}
                    onChange={(e) => setEndTimeEdit(e.target.value)}
                    className="main-content__task--edit-time"
                  />
                  <button
                    onClick={() => handleSaveEdit(task.id)}
                    className="main-content__task--save-button"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="main-content__task--cancel-button"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <label
                    htmlFor={`task-${task.id}`}
                    className="main-content__task--label"
                  >
                    {task.task}
                  </label>
                  <span className="main-content__task--time">
                    {new Date(task.start_time).toLocaleString()} -{" "}
                    {new Date(task.end_time).toLocaleString()}
                  </span>
                  <button
                    onClick={() => handleOpenDeleteModal(task.id)}
                    className="main-content__task--delete-button"
                  >
                    <img
                      src={deleteIcon}
                      alt="delete icon"
                      className="main-content__task--edit-icon"
                    />
                  </button>
                  <button
                    onClick={() => handleEditClick(task)}
                    className="main-content__task--edit-button"
                  >
                    <img
                      src={editIcon}
                      alt="edit icon"
                      className="main-content__task--edit-icon"
                    />
                  </button>
                </>
              )}
            </div>
          ))
        ) : selectedList ? (
          <div className="main-content__error--task">{`Your "${selectedList}" List is Empty!`}</div>
        ) : (
          <div className="main-content__select--list">
            Select an AcTrack list to see your tasks.
          </div>
        )}
      </div>
       <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="Are you sure you want to delete this Task?"
      />
    </main>
  );
}

export default MiddleContainer;