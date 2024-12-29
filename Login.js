import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const [cnic, setCnic] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setErrorMessage('');
  //   try {
  //     const response = await axios.post('http://localhost:5000/login', { cnic, password });
  //     setToken(response.data.token);
  

      
  //     if (response.data.role === 'admin') {
  //       navigate('/admin-dashboard'); 
  //     } else {
  //       navigate('/user-dashboard'); 
  //     }
  //   } catch (error) {
  //     setErrorMessage('CNIC or password not registered');
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await axios.post('http://localhost:5000/login', { cnic, password });
      setToken(response.data.token);
      localStorage.setItem('role', response.data.role); // Store role in localStorage
  
      if (response.data.role === 'admin') {
        navigate('/admin-dashboard');
      } else {
        navigate('/user-dashboard');
      }
    } catch (error) {
      setErrorMessage('CNIC or password not registered');
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <div className='backgrounds d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='text-center'>Log in</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <input
              className='form-control'
              type="text"
              value={cnic}
              onChange={(e) => setCnic(e.target.value)}
              placeholder="CNIC"
              required
            />
          </div>
          <div className='mb-3'>
            <input
              className='form-control'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          {errorMessage && <div className='text-danger'>{errorMessage}</div>}
          <button type="submit" className='btn btn-success w-100' disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
          <p>You agree to our terms and policies</p>
          <Link to="/signup" className='btn btn-default border w-100 bg-light'>
            <strong>Create Account</strong>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
