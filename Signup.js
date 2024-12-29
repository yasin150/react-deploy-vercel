import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'

// import { useNavigate } from 'react-router-dom'

export default function Signup() {
 
  const navigate = useNavigate();
    const [cnic, setCnic] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/signup', { cnic, email, password });
      
      alert('Sign up successful');
      navigate('/login')
      
    } catch (error) {
      alert('Error Already registered');
    }
  };

  return (
    <div  className='backgroundss d-flex justify-content-center align-items-center bg-primary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2 className='text-center'>Sign up</h2>

    <form onSubmit={handleSubmit}>
    <div className='mb-3'>
    <label htmlFor="text"><strong>Cnic</strong></label>
      <input className='form-control ' type="text" value={cnic} onChange={(e) => setCnic(e.target.value)} placeholder="CNIC" required />
      </div>
      <div className='mb-3'>
      <label htmlFor="email"><strong>Email</strong></label>
      <input className='form-control ' type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      </div>
      <div className='mb-3'>
      <label htmlFor="password"><strong>Password</strong></label>
      <input className='form-control ' type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      </div>
      <button type="submit" className='btn btn-success w-100'>Sign Up</button>
      <p>You are agree to your terms and policies</p>
       <Link to="/login" className='btn btn-default border w-100 bg-light '><strong>Log in</strong></Link>

    </form>
    </div>
    </div>
    
  )
}
