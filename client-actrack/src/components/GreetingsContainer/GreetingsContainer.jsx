import React from 'react'
import ListsContainer from '../ListsContainer/ListsContainer'


function GreetingsContainer() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/users/1'); 
        if (!response.ok) {
          throw new Error('Network response for user was not ok');
        }
        const userData = await response.json();
        setUser(userData);
      } catch (error) {
        console.error('Error getting user user:', error);
      }
    };

    getUser();
  
  }, []);

  return (
    <>
    <div className="main-content">
    {user && <h2>Good morning, {user.username}</h2>} 
    <p>Today, {new Date().toLocaleDateString()}</p>   
</div>
</>
  );
}

export default GreetingsContainer;
