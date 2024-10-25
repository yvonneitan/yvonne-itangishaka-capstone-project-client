
import React, { useState } from 'react'; 
import "./LoginPage.scss";
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
      <h2 className="login-container__header">Login</h2>
      <form onSubmit={handleLogin} className="login-container__form">
        <div className='login-container__user'>
          <label className='login-container__label'>Username:</label>
          <div className="login-container__user--items">
          <img src={userIcon} alt="" className="login-container__user--icon" />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Type your user name"
            required
            className='login-container__user--name'
          />
          </div>
        </div>
        <div className="login-container__password">
          <label className='login-container__label'>Password:</label>
          <div className="login-container__password--items">
          <img src={passwordIcon} alt="" className="login-container__password--icon" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Type your password"
            required
            className='login-container__password--text'
          />
          </div>
        </div>
        <button type="submit" className="login-container__button">LOGIN</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default LoginPage;
