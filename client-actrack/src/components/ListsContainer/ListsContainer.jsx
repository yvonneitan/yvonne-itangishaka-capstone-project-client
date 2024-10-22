import React, { useEffect, useState } from 'react';
import './ListsContainer.scss';
import ListsButton from '../ListsButton/ListsButton'

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

    getUser(); 
  }, []);

  return (
    <div className="sidebar">
    
      <div className="sidebar__title">{user ? `${user.username} AcTrack` : 'Your AcTrack'}</div>
      {taskLists.length === 0 ? (
        <div>No task lists available.</div>
      ) : (
        <ul className="sidebar__lists">
          {taskLists.map((list) => (
            <li key={list.id} className="sidebar__lists--item"> 
              {/* <button className="sidebar__lists--button">
                {list.name}
              </button> */}
                <ListsButton listName={list.name} />
              <span className="sidebar__lists--count">{list.count}</span>
            </li>
          ))}
        </ul>
      )}
      <button className="sidebar__new--btn">+ Create new List ⌘L</button>
    </div>
  );
}

export default ListsContainer;
