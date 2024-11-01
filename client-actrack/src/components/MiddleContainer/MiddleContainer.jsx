import React, { useEffect, useState } from "react";
import "./MiddleContainer.scss";
import editIcon from "../../assets/icons/edit-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";
import { fetchData } from "../../utils/utils.js";

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
        const userData = await fetchData("/users/1");
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
      getTasks();
    }
  }, [selectedList]);

  const getTasks = async () => {
    try {
      const tasksData = await fetchData(`/tasks?listName=${selectedList}`);
      setTasks(tasksData);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleToggleComplete = async (taskId) => {
    const task = tasks.find((task) => task.id === taskId);
  
    if (!task) {
      console.error("Task not found.");
      return;
    }
  
    const updatedStatus = task.is_completed === 0 ? 1 : 0; 
  
    try {
      const updatedTaskResponse = await fetchData(`/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_completed: updatedStatus }),
      });
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId ? { ...task, is_completed: updatedStatus } : task
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

  const handleOpenDeleteModal = (taskId) => {
    setTaskToDelete(taskId);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetchData(`/tasks/${taskToDelete}`, { method: "DELETE" });
      setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskToDelete));
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
      await fetchData(`/tasks/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task: taskEditValue,
          start_time: formatDateForDatabase(startTimeEdit),
          end_time: formatDateForDatabase(endTimeEdit),
        }),
      });
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
                type="checkbox"
                id={`task-${task.id}`}
                className="main-content__task--checkbox"
                checked={task.is_completed === 1}
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
        ) : selectedList.id ? (
          <div className="main-content__error--task">{`Your "${selectedList}" List is Empty!`}</div>
        ) : (
          <div className="main-content__error--task">Select a list to view its tasks</div>
        )}
      </div>

      {deleteModalOpen && (
          <DeleteModal
            isOpen={deleteModalOpen}
            onClose={handleCloseDeleteModal}
            onConfirm={handleConfirmDelete}
            title="Confirm Deletion"
            message="Are you sure you want to delete this Task?"/>
      )}
    </main>
  );
}

export default MiddleContainer;
