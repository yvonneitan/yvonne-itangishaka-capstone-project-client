import React, { useEffect, useState } from "react";
import Sidebar from '../SideBar/SideBar';
import MiddleContainer from '../MiddleContainer/MiddleContainer';
import TaskForm from '../TaskForm/TaskForm';
import "./CompletedLists.scss"

function CompletedLists() {
  const [taskLists, setTaskLists] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState("");
  const [newListName, setNewListName] = useState("");
  const [inputError, setInputError] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showCreateButton, setShowCreateButton] = useState(true); 

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
//         await getCompletedTasks(); 
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

//     const getCompletedTasks = async () => {
//       try {
//         const response = await fetch("http://localhost:8080/api/tasks/completed");
//         if (!response.ok) {
//           throw new Error("Network response for completed tasks was not ok");
//         }
//         const data = await response.json();
//         setCompletedTasks(data);
//       } catch (error) {
//         setError("Failed to fetch completed tasks.");
//         console.error("Error fetching completed tasks:", error);
//       }
//     };

//     getUser();
//   }, []);

//   const handleListClick = (listName) => {
//     setSelectedList(listName);
//   };

//   const handleNewListChange = (e) => {
//     setNewListName(e.target.value);
//     setInputError("");
//   };

//   const handleCreateNewList = async () => {
//     if (!newListName.trim()) {
//       setInputError(true);
//       return;
//     }

//     try {
//       const response = await fetch(
//         "http://localhost:8080/api/lists/task-lists",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ name: newListName, userId: user.id }),
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to create new list.");
//       }

//       const newList = await response.json();
//       setTaskLists((prevLists) => [...prevLists, newList]);
//       setNewListName("");
//       setInputError("");
//       setShowInput(false);
//       setShowCreateButton(true); 
//     } catch (error) {
//       console.error("Error creating new list:", error);
//     }
//   };

//   const handleShowInput = () => {
//     setShowInput(true);
//     setShowCreateButton(false); 
//   };

//   const handleShowTaskForm = () => {
//     setShowTaskForm(true); 
//   };

//   const handleCancelTask = () => {
//     setShowTaskForm(false); 
//     setTaskName(""); 
//     setStartTime("");
//     setEndTime(""); 
//     setSelectedList("");
//   };

//   const handleCancelCreateList = () => {
//     setShowInput(false); 
//     setNewListName(""); 
//     setInputError("");
//     setShowCreateButton(true); 
//   };

//   const handleCreateNewTask = async (e) => {
//     e.preventDefault();
//     const newTask = {
//       task: taskName,
//       start_time: startTime,
//       end_time: endTime,
//       list_id: selectedList,
//       user_id: user.id,
//     };
//     try {
//       const response = await fetch("http://localhost:8080/api/tasks", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(newTask),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to create new task.");
//       }

//       const result = await response.json();
//       console.log("New task ID:", result.taskId);

//       setTaskLists((prev) => [...prev, newTask]);

//       handleCancelTask(); 
//     } catch (error) {
//       console.error("Error creating new task:", error);
//     }
//   };

//   if (loading) {
//     return <div className="sidebar">Loading...</div>;
//   }

//   if (error) {
//     return <div className="sidebar">Error: {error}</div>;
//   }

//   return (
//     <>
//       <Sidebar
//         user={user}
//         taskLists={taskLists}
//         selectedList={selectedList}
//         onListClick={handleListClick}
//         showInput={showInput}
//         newListName={newListName}
//         onNewListChange={handleNewListChange}
//         onCreateNewList={handleCreateNewList}
//         onShowInput={handleShowInput}
//         inputError={inputError}
//         onCancelCreateList={handleCancelCreateList}
//       />
//       <div className="task-completed">
//         <MiddleContainer selectedList={selectedList} />
//         <h2 className="task-completed__title">Completed Tasks</h2>
//         <ul>
//           {completedTasks.length === 0 ? (
//             <li className="task-completed__none">No completed tasks available.</li>
//           ) : (
//             completedTasks.map((task) => (
//               <li key={task.id} className="task-completed__none">{task.task}</li> 
//             ))
//           )}
//         </ul>
//         {!showTaskForm && (
//           <button className="task-form__add--task" onClick={handleShowTaskForm}>
//             + Add new Task ⌘N
//           </button>
//         )}
//         {showTaskForm && (
//           <TaskForm
//             taskName={taskName}
//             setTaskName={setTaskName}
//             startTime={startTime}
//             setStartTime={setStartTime}
//             endTime={endTime}
//             setEndTime={setEndTime}
//             selectedList={selectedList}
//             setSelectedList={setSelectedList}
//             taskLists={taskLists}
//             onCancelTask={handleCancelTask}
//             onCreateNewTask={handleCreateNewTask}
//           />
//         )}
//       </div>
//     </>
//   );
// }

// export default CompletedLists;
// import React, { useEffect, useState } from "react";
// import Sidebar from '../SideBar/SideBar';
// import MiddleContainer from '../MiddleContainer/MiddleContainer';
// import TaskForm from '../TaskForm/TaskForm';
// import "./CompletedLists.scss";

// function CompletedLists() {
//   const [taskLists, setTaskLists] = useState([]);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/1");
        if (!response.ok) throw new Error("Network response for user was not ok");
        const userData = await response.json();
        setUser(userData);
        await getTaskLists(userData.id);
        await getCompletedTasks();
      } catch (error) {
        setError("Failed to fetch user or task lists.");
        console.error("Error getting user or lists:", error);
      } finally {
        setLoading(false);
      }
    };

    const getTaskLists = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/lists/task-lists?userId=${userId}`);
        if (!response.ok) throw new Error("Network response for task lists was not ok");
        const data = await response.json();
        setTaskLists(data);
      } catch (error) {
        setError("Failed to fetch task lists.");
        console.error("Error fetching task lists:", error);
      }
    };

    const getCompletedTasks = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/tasks/completed");
        if (!response.ok) throw new Error("Network response for completed tasks was not ok");
        const data = await response.json();
        setCompletedTasks(data);
      } catch (error) {
        setError("Failed to fetch completed tasks.");
        console.error("Error fetching completed tasks:", error);
      }
    };

    getUser();
  }, []);

  // Filter task lists to exclude completed tasks
  const activeTasks = taskLists.filter(
    (task) => !completedTasks.find((completed) => completed.id === task.id)
  );

  if (loading) return <div className="sidebar">Loading...</div>;
  if (error) return <div className="sidebar">Error: {error}</div>;

  return (
    <>
      <Sidebar
        user={user}
        taskLists={activeTasks} // Pass active tasks to Sidebar
        taskCount={activeTasks.length} // Pass active task count to Sidebar
      />
      <div className="task-completed">
        <MiddleContainer selectedList={selectedList} />
        <h2 className="task-completed__title">Completed Tasks</h2>
        <ul>
          {completedTasks.length === 0 ? (
            <li className="task-completed__none">No completed tasks available.</li>
          ) : (
            completedTasks.map((task) => (
              <li key={task.id} className="task-completed__none">{task.task}</li>
            ))
          )}
        </ul>
      </div>
    </>
  );
}

export default CompletedLists;
