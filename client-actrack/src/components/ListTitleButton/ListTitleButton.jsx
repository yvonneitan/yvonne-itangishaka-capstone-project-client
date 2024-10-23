// import React, { useEffect, useState } from 'react';
// import './ListTitleButton.scss'; // Adjust the path to your styles if needed

// function ListTitleButton() {
//   const [taskLists, setTaskLists] = useState([]);
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const getUser = async () => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/users/1`);
//         if (!response.ok) {
//           throw new Error('Network response for user was not ok');
//         }
//         const userData = await response.json();
//         setUser(userData);
//         await getTaskLists(userData.id); // Fetch task lists after setting user
//       } catch (error) {
//         console.error('Error getting user:', error);
//       }
//     };

//     const getTaskLists = async (userId) => {
//       try {
//         const response = await fetch(`http://localhost:8080/api/lists/task-lists?userId=${userId}`);
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         const data = await response.json();
//         setTaskLists(data);
//       } catch (error) {
//         console.error('Error fetching task lists:', error);
//       }
//     };

//     getUser();
//   }, []);

//   return (
//     <div className="sidebar__title">
//       {user ? `${user.username} AcTrack` : 'Your AcTrack'}
//       {taskLists.length === 0 ? (
//         <div>No task lists available.</div>
//       ) : (
//         <ul className="task-lists">
//           {taskLists.map((list) => (
//             <li key={list.id}>
//               <span className="list-name">{list.name}</span>
//               <span className="sidebar__lists--count">{list.count}</span>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ListTitleButton;
