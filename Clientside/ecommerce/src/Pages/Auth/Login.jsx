import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import Layout from '../../Components/Layouts/Layout';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import './Login.css';
import { useAuth } from '../../Context/Auth';

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()
  const [ auth, setAuth] = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/api/v1/auth/login', { email, password })
      .then(res => {
        
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state?.from   || "/")
      }).catch(err => console.log(err))
  }
  
  return (
    <Layout title={"Login"}>
      <div className='login'>
        <div className='wrapper'>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='input-box'>
              <label htmlFor="email">
                <strong>Email</strong>
              </label>
              <input
                type="email"
                placeholder="Enter Email"
                autoComplete="off"
                name="email"
                
                onChange={(e) => setEmail(e.target.value)}

              />
              <FaUser className='icon' />
            </div>
            <div className='input-box'>
              <label htmlFor="password">
                <strong>Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                name="password"
                
                onChange={(e) => setPassword(e.target.value)}
              />
              <FaLock className='icon' />
            </div>

            <div className='remember-forgot'>
              <label htmlFor="forgot-password">
                <input type='checkbox' />Rememeber Me
              </label>
              <Link to="/forgotpassword" className='link'>Forgot Password?</Link>
            </div>
            <button type="submit" >
              Login
            </button>

            <div className='register-link'>
              <p style={{color:"white"}}>Don't have an account?<Link className='link' to="/register">Register</Link> </p>
            </div>


          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Login