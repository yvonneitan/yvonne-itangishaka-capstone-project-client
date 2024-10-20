import React, { useEffect, useState } from 'react';
import './ListsContainer.scss';

function ListsContainer() {
  const [taskLists, setTaskLists] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Function to get the user
    const getUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/users/1`); // Fetching the user
        if (!response.ok) {
          throw new Error('Network response for user was not ok');
        }
        const userData = await response.json();
        setUser(userData);
        // After setting the user, fetch the task lists for this user
        await getTaskLists(userData.id); // Pass the user ID
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    // Function to get task lists for the specified user ID
    const getTaskLists = async (userId) => {
      try {
        const response = await fetch(`http://localhost:8080/api/lists/task-lists?userId=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTaskLists(data);
      } catch (error) {
        console.error('Error fetching task lists:', error);
      }
    };

    getUser(); // Initiate the user fetching
  }, []);

  return (
    <aside className="sidebar">
      {/* Use the fetched user's name, or "Yvonne AcTrack" if not loaded yet */}
      <div className="sidebar-title">{user ? `${user.username} AcTrack` : 'Yvonne AcTrack'}</div>
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
