import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User successfully logged in!');
        // Redirect to the home page after successful login
        navigate('/todo'); // Replace '/home' with the path to your home page
      } else {
        const responseData = await response.json();
        // Handle specific error response from the backend
        if (responseData.error === 'Invalid login credentials') {
          toast.error('Invalid login credentials', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.error('Failed to log in:', responseData.error);
        }
      }

    } catch (error) {
      console.error('Error posting login data:', error);
    }
  };

  return (
    <div className='body-login'>
      <div className="text-center">
        <div className='card-login'>
          <main className="form-signin w-100 m-auto">
            <h1 className="h3 mb-3 fw-normal" style={{ color: 'aliceblue' }}>Login</h1>
            <form onSubmit={handleSubmit}>
              {/* ... your input fields and form elements ... */}
              <input
            type="email"
            className="form-control n1"
            id="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type={showPassword ? 'text' : 'password'}
            className="form-control n1"
            id="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            className="form-check-input"
            type="checkbox"
            name="show-password"
            id="show-password"
            checked={showPassword}
            onChange={handleShowPasswordChange}
          />
          <label style={{ color: 'aliceblue' }} className="form-check-label" htmlFor="show-password">
          Show Password
        </label>
        <br/>
              <button className="w-100 btn btn-lg btn-primary" type="submit">Login</button>
              <br />
              <br />
              <h5 style={{ color: 'aliceblue' }}>
                <Link to='/register' className="w-100 text-white">Don't Have an Account?</Link>
              </h5>
              <br />
            </form>
            <p style={{ color: 'aliceblue' }}>&copy; 1999-2025</p>
          </main>
        </div>
      </div>
      {/* Add the ToastContainer at the top level */}
      <ToastContainer />
    </div>
  );
};

export default Login;
