import React, { useEffect, useState } from "react";
import "./ListsContainer.scss";
import ListsButton from "../ListsButton/ListsButton";
import MiddleContainer from "../MiddleContainer/MiddleContainer";

function ListsContainer() {
  const [taskLists, setTaskLists] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState("");
  const [newListName, setNewListName] = useState("");
  const [inputError, setInputError] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

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

  const handleListClick = (listName) => {
    setSelectedList(listName);
  };

  const handleNewListChange = (e) => {
    setNewListName(e.target.value);
    setInputError("");
  };

  const handleCreateNewList = async () => {
    if (!newListName.trim()) {
      setInputError(true);
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8080/api/lists/task-lists",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: newListName, userId: user.id }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create new list.");
      }

      const newList = await response.json();
      setTaskLists((prevLists) => [...prevLists, newList]);
      setNewListName("");
      setInputError("");
      setShowInput(false);
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };

  const handleShowInput = () => {
    setShowInput(true);
  };
  const handleCreateNewTask = async (e) => {
    e.preventDefault();
    const newTask = {
      task: taskName,
      start_time: startTime,
      end_time: endTime,
      list_id: selectedList,
      user_id: user.id,
    };
    try {
      const response = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to create new task.");
      }

      const result = await response.json();
      console.log("New task ID:", result.taskId);

      setTaskLists((prev) => [...prev, newTask]);

      // Clear form fields
      setTaskName("");
      setStartTime("");
      setEndTime("");
      setSelectedList("");
    } catch (error) {
      console.error("Error creating new task:", error);
    }
  };

  if (loading) {
    return <div className="sidebar">Loading...</div>;
  }

  if (error) {
    return <div className="sidebar">Error: {error}</div>;
  }

  return (
    <>
      <div className="sidebar">
        <div className="sidebar__title">
          {user ? `${user.username} AcTrack` : "Your AcTrack"}
        </div>

        <form onSubmit={handleCreateNewTask} className="task-form">
          <label htmlFor="task-name">Task Name:</label>
          <input
            type="text"
            id="task-name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
          />

          <label htmlFor="start-time">Start Time:</label>
          <input
            type="datetime-local"
            id="start-time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />

          <label htmlFor="end-time">End Time:</label>
          <input
            type="datetime-local"
            id="end-time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />

          <label htmlFor="task-list">Select List:</label>
          <select
            id="task-list"
            value={selectedList}
            onChange={(e) => setSelectedList(e.target.value)}
            required
          >
            <option value="">Select a list</option>
            {taskLists.map((list) => (
              <option key={list.id} value={list.id}>
                {list.name}
              </option>
            ))}
          </select>

          <button type="submit" className="submit-btn">
            Add Task
          </button>
        </form>
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

        {showInput && (
          <div className="create__box">
            <div className="sidebar__create">
              <input
                type="text"
                value={newListName}
                onChange={handleNewListChange}
                placeholder="New List Name"
                className="sidebar__create--list-input"
              />
              <button
                className="sidebar__create--list-btn"
                onClick={handleCreateNewList}
              >
                Add
              </button>
            </div>
            {inputError && (
              <div className="sidebar__create--error-message">
                List name cannot be Empty!
              </div>
            )}
          </div>
        )}

        <button className="sidebar__new--btn" onClick={handleShowInput}>
          + Create new List ⌘L
        </button>
      </div>
      <MiddleContainer selectedList={selectedList} />
    </>
  );
}

export default ListsContainer;
