// import React, { useEffect, useState } from "react";
// import "./ListsContainer.scss";

// function ListsContainer() {
//   const [taskLists, setTaskLists] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedList, setSelectedList] = useState("");
//   const [tasks, setTasks] = useState([]); 

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/users/1");
//         if (!response.ok) {
//           throw new Error("Network response for user was not ok");
//         }
//         const userData = await response.json();
//         setUser(userData);
//         await getTaskLists(userData.id);
//       } catch (error) {
//         setError("Failed to fetch user or task lists.");
//         console.error("Error getting user or lists:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     const getTaskLists = async (userId) => {
//       try {
//         const response = await fetch(
//           `http://localhost:8080/api/lists/task-lists?userId=${userId}`
//         );
//         if (!response.ok) {
//           throw new Error("Network response for task lists was not ok");
//         }
//         const data = await response.json();
//         setTaskLists(data);
//       } catch (error) {
//         setError("Failed to fetch task lists.");
//         console.error("Error fetching task lists:", error);
//       }
//     };

//     getUser();
//   }, []);

//   useEffect(() => {
//     const getTasks = async () => {
//       if (selectedList) {
//         try {
//           const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
//           if (!response.ok) {
//             throw new Error("Network response for tasks was not ok");
//           }
//           const tasksData = await response.json();
//           setTasks(tasksData);
//         } catch (error) {
//           setError("Failed to fetch tasks.");
//           console.error("Error fetching tasks:", error);
//         }
//       }
//     };

//     getTasks();
//   }, [selectedList]); 

//   const handleListClick = (listName) => {
//     console.log("Selected List:", listName);
//     setSelectedList(listName);
//   };

//   if (loading) {
//     return <div className="sidebar">Loading...</div>;
//   }

//   if (error) {
//     return <div className="sidebar">Error: {error}</div>;
//   }

//   return (
//     <div className="sidebar">
//       <div className="sidebar__title">
//         {user ? `${user.username} AcTrack` : "Your AcTrack"}
//       </div>
//       {taskLists.length === 0 ? (
//         <div className="sidebar__no-list">No task lists available.</div>
//       ) : (
//         <ul className="sidebar__lists">
//           {taskLists.map((list) => (
//             <li key={list.id} className="sidebar__lists--item">
//               <button
//                 className="sidebar__lists--button"
//                 onClick={() => handleListClick(list.name)}
//               >
//                 {list.name}
//               </button>
//               <span className="sidebar__lists--count">{list.count || 0}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//       <button className="sidebar__new--btn">+ Create new List ⌘L</button>
      
//       {/* Display tasks for the selected list */}
//       {selectedList && (
//         <div className="sidebar__tasks">
//           <h3>Tasks for "{selectedList}"</h3>
//           {tasks.length > 0 ? (
//             <ul className="sidebar__tasks--list">
//               {tasks.map((task) => (
//                 <li key={task.id} className="sidebar__tasks--item">
//                   <input
//                     type="checkbox"
//                     id={`task-${task.id}`}
//                     className="sidebar__tasks--checkbox"
//                     defaultChecked={task.status === "completed"}
//                   />
//                   <label htmlFor={`task-${task.id}`} className="sidebar__tasks--label">
//                     {task.task}
//                   </label>
//                   <span className="sidebar__tasks--time">
//                     {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <div>No tasks available for "{selectedList}".</div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// }

// export default ListsContainer;

import React, { useEffect, useState } from "react";
import "./ListsContainer.scss";
import ListsButton from "../ListsButton/ListsButton"; // Assuming you need this import for some other functionality

function ListsContainer() {
  const [taskLists, setTaskLists] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState("");
  const [tasks, setTasks] = useState([]); // New state for tasks

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/1");
        if (!response.ok) {
          throw new Error("Network response for user was not ok");
        }
        const userData = await response.json();
        setUser(userData);
        await getTaskLists(userData.id);
      } catch (error) {
        setError("Failed to fetch user or task lists.");
        console.error("Error getting user or lists:", error);
      } finally {
        setLoading(false);
      }
    };

    const getTaskLists = async (userId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/lists/task-lists?userId=${userId}`
        );
        if (!response.ok) {
          throw new Error("Network response for task lists was not ok");
        }
        const data = await response.json();
        setTaskLists(data);
      } catch (error) {
        setError("Failed to fetch task lists.");
        console.error("Error fetching task lists:", error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      if (selectedList) {
        try {
          const response = await fetch(`http://localhost:8080/api/tasks?listName=${selectedList}`);
          if (!response.ok) {
            throw new Error("Network response for tasks was not ok");
          }
          const tasksData = await response.json();
          setTasks(tasksData);
        } catch (error) {
          setError("Failed to fetch tasks.");
          console.error("Error fetching tasks:", error);
        }
      }
    };

    getTasks();
  }, [selectedList]); // Fetch tasks when selectedList changes

  const handleListClick = (listName) => {
    // console.log("Selected List:", listName);
    setSelectedList(listName);
  };

  if (loading) {
    return <div className="sidebar">Loading...</div>;
  }

  if (error) {
    return <div className="sidebar">Error: {error}</div>;
  }

  return (
    <div className="sidebar">
      <div className="sidebar__title">
        {user ? `${user.username} AcTrack` : "Your AcTrack"}
      </div>
      {taskLists.length === 0 ? (
        <div className="sidebar__no-list">No task lists available.</div>
      ) : (
        <ul className="sidebar__lists">
          {taskLists.map((list) => (
            <li key={list.id} className="sidebar__lists--item">
              <button
                className="sidebar__lists--button"
                onClick={() => handleListClick(list.name)}
              >
                {list.name}
              </button>
              <span className="sidebar__lists--count">{list.count || 0}</span>
            </li>
          ))}
        </ul>
      )}
      <button className="sidebar__new--btn">+ Create new List ⌘L</button>
      
      {/* Display tasks for the selected list */}
      {selectedList && (
        <div className="sidebar__tasks">
          {/* <h3>Tasks for "{selectedList}"</h3> */}
          {tasks.length > 0 ? (
            <ul className="sidebar__tasks--list">
              {tasks.map((task) => (
                <li key={task.id} className="sidebar__tasks--item">
                  <input
                    type="checkbox"
                    id={`task-${task.id}`}
                    className="sidebar__tasks--checkbox"
                    defaultChecked={task.status === "completed"}
                  />
                  <label htmlFor={`task-${task.id}`} className="sidebar__tasks--label">
                    {task.task}
                  </label>
                  <span className="sidebar__tasks--time">
                    {new Date(task.start_time).toLocaleString()} - {new Date(task.end_time).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div>No tasks available for "{selectedList}".</div>
          )}
        </div>
      )}
    </div>
  );
}

export default ListsContainer;

