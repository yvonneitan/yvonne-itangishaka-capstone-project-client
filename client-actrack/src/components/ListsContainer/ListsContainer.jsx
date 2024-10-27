import React, { useEffect, useState } from "react";
import "./ListsContainer.scss";
import MiddleContainer from "../MiddleContainer/MiddleContainer";
import errorIcon from "../../assets/icons/error-24px.svg";
import editIcon from "../../assets/icons/edit-24px.svg";
import DeleteModal from "../DeleteModal/DeleteModal";
import deleteIcon from "../../assets/icons/delete_outline-24px.svg";

function ListsContainer({ showForm }) {
  const [taskLists, setTaskLists] = useState([]);
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
  const [editingListId, setEditingListId] = useState(null);
  const [editedListName, setEditedListName] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [originalListName, setOriginalListName] = useState(""); 

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/users/1");
        if (!response.ok)
          throw new Error("Network response for user was not ok");

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

    getUser();
  }, []);

  const getTaskLists = async (userId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/lists/task-lists?userId=${userId}`
      );
      if (!response.ok)
        throw new Error("Network response for task lists was not ok");

      const data = await response.json();
      setTaskLists(data);
    } catch (error) {
      setError("Failed to fetch task lists.");
      console.error("Error fetching task lists:", error);
    }
  };

  const handleListClick = (listName) => setSelectedList(listName);

  const handleNewListChange = (e) => {
    setNewListName(e.target.value);
    setInputError("");
  };

  const handleOpenDeleteModal = (taskId) => {
    setListToDelete(taskId);
    setDeleteModalOpen(true);
  };
  const handleCloseDeleteModal = () => {
    setDeleteModalOpen(false);
    setListToDelete(null);
  };
  const handleConfirmDelete = async () => {
    const idToDelete = Number(listToDelete);
    console.log("Attempting to delete task list with ID:", idToDelete);

    try {
      const response = await fetch(
        `http://localhost:8080/api/lists/task-lists/${idToDelete}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error("Failed to delete task");

      await getTaskLists(user.id);

      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
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
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: newListName, userId: user.id }),
        }
      );

      if (!response.ok) throw new Error("Failed to create new list.");

      await getTaskLists(user.id);

      setNewListName("");
      setInputError("");
      setShowInput(false);
      setShowCreateButton(true);
    } catch (error) {
      console.error("Error creating new list:", error);
    }
  };
  const handleShowInput = () => {
    setShowInput(true);
    setShowCreateButton(false);
  };

  const handleShowTaskForm = () => setShowTaskForm(true);

  const handleCancelTask = () => {
    setShowTaskForm(false);
    setTaskName("");
    setStartTime("");
    setEndTime("");
    setSelectedList("");
  };

  const handleCancelCreateList = () => {
    setShowInput(false);
    setNewListName("");
    setInputError("");
    setShowCreateButton(true);
  };

  const handleEditList = (listId, listName) => {
    setEditingListId(listId);
    setEditedListName(listName);
    setOriginalListName(listName); 
  };

  const handleEditChange = (e) => setEditedListName(e.target.value);

  const handleCancelEdit = () => {  
    setEditingListId(null);      
    setEditedListName(originalListName);
    setInputError(false);        
};


  const handleUpdateList = async () => {
    if (!editedListName.trim()) {
      setInputError(true);
      return;
    }

    if (editedListName === originalListName) {
      handleCancelEdit();
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8080/api/lists/task-lists/${editingListId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: editedListName }),
        }
      );
      if (!response.ok) throw new Error("Failed to update the list.");

      await getTaskLists(user.id);
      setEditingListId(null);
      setEditedListName("");
      setOriginalListName(""); // Clear original name
    } catch (error) {
      console.error("Error updating the list:", error);
    }
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
      console.log("res", response.body);
      const result = await response.json();
      console.log("New task ID:", result.taskId);
      console.log("Result", result);

      getTaskLists(user.id);
      handleCancelTask();
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
        {taskLists.length === 0 ? (
          <div className="sidebar__no-list">No task lists available.</div>
        ) : (
          <ul className="sidebar__lists">
            {taskLists.map((list) => (
              <li key={list.id} className="sidebar__lists--item">
                {editingListId === list.id ? (
                  <div className="sidebar__lists--change">
                    <input
                      type="text"
                      value={editedListName}
                      onChange={handleEditChange}
                      onBlur={handleUpdateList} 
                      className="sidebar__lists--edit-input"
                    />
                    <button
                      onClick={handleUpdateList}
                      className="sidebar__lists--save-button"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="sidebar__lists--cancel-button"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      className="sidebar__lists--button"
                      onClick={() => handleListClick(list.name)}
                    >
                      {list.name}
                    </button>
                    <span className="sidebar__lists--count">
                      {list.count || 0}
                    </span>
                    <button
                      onClick={() => handleOpenDeleteModal(list.id)}
                      className="main-content__task--delete-button"
                    >
                      <img
                        src={deleteIcon}
                        alt="delete icon"
                        className="main-content__task--delete-icon"
                      />
                    </button>
                    <button
                      onClick={() => handleEditList(list.id, list.name)}
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
              {inputError && (
                <div className="sidebar__create--error">
                  <img
                    src={errorIcon}
                    alt="Warning Icon"
                    className="sidebar__create--error-icon"
                  />
                  <div className="sidebar__create--error-message">
                    List name cannot be empty!
                  </div>
                </div>
              )}
              <div className="sidebar__create--buttons">
                <button
                  className="sidebar__create--list-add-btn"
                  onClick={handleCreateNewList}
                >
                  Add List
                </button>
                <button
                  type="button"
                  className="sidebar__create--list-cancel-btn"
                  onClick={handleCancelCreateList}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {showCreateButton && showForm !== false && (
          <button className="sidebar__new--btn" onClick={handleShowInput}>
            + Create new List ⌘L
          </button>
        )}
      </div>
      <div className="task-form">
        <MiddleContainer selectedList={selectedList} />

        {!showTaskForm && showForm !== false && (
          <button className="task-form__add--task" onClick={handleShowTaskForm}>
            + Add new Task ⌘N
          </button>
        )}

        {showTaskForm && (
          <form onSubmit={handleCreateNewTask} className="task-form__container">
            <label htmlFor="end-time" className="task-form__label">
              Task:
            </label>

            <input
              type="text"
              id="task-name"
              className="task-form__input"
              placeholder="Enter your Task"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />

            <label htmlFor="start-time" className="task-form__label">
              Start date and time:
            </label>
            <input
              type="datetime-local"
              id="start-time"
              className="task-form__input"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />

            <label htmlFor="end-time" className="task-form__label">
              End date and time :
            </label>
            <input
              type="datetime-local"
              id="end-time"
              className="task-form__input"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
            <label htmlFor="end-time" className="task-form__label">
              List:
            </label>

            <select
              id="task-list"
              className="task-form__select"
              value={selectedList}
              onChange={(e) => setSelectedList(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a list
              </option>
              {taskLists.map((list) => (
                <option key={list.id} value={list.id}>
                  {list.name}
                </option>
              ))}
            </select>
            <div className="task-form__btn">
              <button type="submit" className="task-form__btn--submit">
                Add Task
              </button>
              <button
                type="button"
                className="task-form__btn--cancel"
                onClick={handleCancelTask}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default ListsContainer;
