import React, { useEffect, useState } from 'react';
import './ListsContainer.scss';

function ListsContainer() {
  const [taskLists, setTaskLists] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getTaskLists = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/task-lists'); 
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTaskLists(data);
      } catch (error) {
        console.error('Error fetching task lists:', error);
      }
    };

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
    getTaskLists();
  }, []);

  return (
    <aside className="sidebar">
      <div className="sidebar-title">{user ? user.username : 'Loading...'} AcTrack</div>
      {taskLists.length === 0 ? (
        <div>No task lists available.</div>
      ) : (
        <ul className="task-lists">
          {taskLists.map((list) => (
            <li key={list.id} className="task-list"> 
              <button>
                {list.name} <span>{list.count}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      <button className="add-list-btn">+ Create new List ⌘L</button>
    </aside>
  );
}

export default ListsContainer;
