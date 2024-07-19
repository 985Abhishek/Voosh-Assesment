import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import authService from '../../services/authService';
import GoogleLoginComponent from './GoogleLogin';
import '/Login.css';


const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthData } = useContext(AuthContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await authService.login({ email, password });
      setAuthData(data);
      history.push('/board');
    } catch (error) {
      console.error(error);
      alert('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </div>
      <div className="google-login">
        <GoogleLoginComponent />
      </div>
    </div>
  );
};

export default Login;
