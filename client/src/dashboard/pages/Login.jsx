import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import storeContext from '../../context/storeContext';
import { base_url } from '../../config/config'; 
import './style.css';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(storeContext);
  const [loader, setLoader] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to handle password visibility

  const [state, setState] = useState({
    email: '',
    password: ''
  });

  const inputHandle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState); // Toggle password visibility
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      const { data } = await axios.post(`${base_url}/api/login`, state);
      setLoader(false);
      localStorage.setItem('newsToken', data.token);
      toast.success(data.message);
      dispatch({
        type: 'login_success',
        payload: {
          token: data.token
        }
      });
      navigate('/dashboard');
    } catch (error) {
      setLoader(false);
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Login failed. Please try again.');
      }
    }
  };

  return (
    <div className='body-login'>
      <div className="login-box">
        <h2 className="login-heading">Login</h2> {/* Add class for styling */}
        <form onSubmit={submit}>
          <div className="user-box">
            <input
              value={state.email}
              required
              onChange={inputHandle}
              name="email"
              autoComplete="off"
            />
            <label>Username</label>
          </div>
          <div className="user-box">
            <input
              onChange={inputHandle}
              required
              value={state.password}
              type={showPassword ? 'text' : 'password'} // Handle input type toggle
              name="password"
              autoComplete="off"
            />
            <label>Password</label>
            <div className="show-password-icon" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Toggle eye icon */}
            </div>
          </div>

          <div className="button-form">
            <button id="submit" type="submit">
              {loader ? 'Loading...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
