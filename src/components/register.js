import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/sign', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('User successfully registered!');
        // Optionally, reset the form fields after successful submission
        setFormData({
          fName: '',
          lName: '',
          email: '',
          password: '',
        });
      } else {
        const responseData = await response.json();
        // Handle specific error response from the backend
        if (responseData.error === "User already exists with this email") {
          toast.error(responseData.error, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        } else {
          console.error('Failed to register user:', responseData.error);
        }
      }
    } catch (error) {
      console.error('Error posting form data:', error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPasswordChange = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className='body'>
      <div className="text-center">
      <div className='card-register'>

      <main className="form-signin w-100 m-auto">
        <h1 className="h3 mb-3 fw-normal" style={{ color: 'aliceblue' }}>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control n1"
            id="fName"
            name="fName"
            placeholder="FirstName"
            value={formData.fName}
            onChange={handleChange}
          />
          <input
            type="text"
            className="form-control n1"
            id="lName"
            name="lName"
            placeholder="LastName"
            value={formData.lName}
            onChange={handleChange}
          />
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
          <br />
          <button className="w-100 btn btn-lg btn-primary" type="submit">Sign Up</button>
          <br />
          <br />
          <h5 style={{ color: 'aliceblue' }}>
            <Link to='/' className="w-100 text-white">Have an account?</Link>
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

export default SignUpForm;
