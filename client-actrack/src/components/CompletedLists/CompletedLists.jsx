import React, { useEffect, useState } from "react";
import Sidebar from '../SideBar/SideBar';
import MiddleContainer from '../MiddleContainer/MiddleContainer';
import "./CompletedLists.scss"
import { fetchData } from "../../utils/utils.js";

function CompletedLists() {
  const [taskLists, setTaskLists] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]); 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState("");
  useEffect(() => {
    // const getUser = async () => {
    //   try {
    //     const response = await fetch("http://localhost:8080/api/users/1");
    //     if (!response.ok) {
    //       throw new Error("Network response for user was not ok");
    //     }
    //     const userData = await response.json();
    //     setUser(userData);
    //     await getTaskLists(userData.id);
    //     await getCompletedTasks(); 
    //   } catch (error) {
    //     setError("Failed to fetch user or task lists.");
    //     console.error("Error getting user or lists:", error);
    //   } finally {
    //     setLoading(false);
    const getUser = async () => {
      try {
        const userData = await fetchData("/users/1");
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
    
    

    // const getTaskLists = async (userId) => {
    //   try {
    //     const response = await fetch(
    //       `http://localhost:8080/api/lists/task-lists?userId=${userId}`
    //     );
    //     if (!response.ok) {
    //       throw new Error("Network response for task lists was not ok");
    //     }
    //     const data = await response.json();
    //     setTaskLists(data);
    //   } catch (error) {
    //     setError("Failed to fetch task lists.");
    //     console.error("Error fetching task lists:", error);
    //   }
    // };
    const getTaskLists = async (userId) => {
      try {
        const data = await fetchData(`/lists/task-lists?userId=${userId}`);
        setTaskLists(data);
      } catch (error) {
        setError("Failed to fetch task lists.");
        console.error("Error fetching task lists:", error);
      }
    };
    

  //   const getCompletedTasks = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8080/api/tasks/completed");
  //       if (!response.ok) {
  //         throw new Error("Network response for completed tasks was not ok");
  //       }
  //       const data = await response.json();
  //       setCompletedTasks(data);
  //     } catch (error) {
  //       setError("Failed to fetch completed tasks.");
  //       console.error("Error fetching completed tasks:", error);
  //     }
  //   };

  //   getUser();
  // }, []);
  const getCompletedTasks = async () => {
    try {
      const data = await fetchData("/tasks/completed");
      setCompletedTasks(data);
    } catch (error) {
      setError("Failed to fetch completed tasks.");
    }
  };
    getUser();
  }, []);
  

  const handleListClick = (listName) => {
    setSelectedList(listName);
  };
  if (loading) {
    return <div className="sidebar">Loading...</div>;
  }

  if (error) {
    return <div className="sidebar">Error: {error}</div>;
  }
  

// Filter task lists to exclude completed tasks
const activeTasks = taskLists.filter(
  (task) => !completedTasks.find((completed) => completed.id === task.id)
);
  return (
    <>
      <Sidebar
        user={user}
        taskLists={taskLists}
        selectedList={selectedList}
        onListClick={handleListClick}
      />
      <div className="task-completed">
        <MiddleContainer selectedList={selectedList}/>
        <h2 className="task-completed__title">Completed Tasks!</h2>
        <ul>
          {completedTasks.length === 0 ? (
            <p className="task-completed__absent">No completed tasks available.</p>
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

