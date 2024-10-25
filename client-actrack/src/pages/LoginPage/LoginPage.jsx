
import React, { useState } from 'react'; 
import './LoginPage.scss';
import userIcon from "../../assets/icons/user.svg";
import passwordIcon from "../../assets/icons/password.svg";
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); 

  const handleLogin = async (e) => {
    e.preventDefault();

    // Fake user login credentials
    const fakeUser = "yvonneitan@example.com";
    const fakePassword = "password123";

    if (username === fakeUser && password === fakePassword) {
      setMessage("Login successful!");
      navigate("/home");
    } else {
      setMessage('Login failed: Invalid username or password'); 
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='login-container__user'>
          <label className='login-container__label'>Username:</label>
          <img src={userIcon} alt="" className="user__icon" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className='login-container__user--name'
          />
        </div>
        <div>
          <label className='login-container__label'>Password:</label>
          <img src={passwordIcon} alt="" className="password__icon" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='login-container__user--password'
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
