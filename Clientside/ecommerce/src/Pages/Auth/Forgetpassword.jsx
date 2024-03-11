import React, { useState } from 'react'
import Layout from '../../Components/Layouts/Layout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './forgetpassword.css';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

const Forgetpassword = () => {
  const [email, setEmail] = useState();
  const [newPassword, setNewPassword] = useState();
  const [answer, setAnswer] = useState();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8080/api/v1/auth/forgot-password", { email, newPassword })
      .then(res => {
        navigate("/login")
      }).catch(err => console.log(err))
  }

  return (
    <Layout title={"forgot-password"}>
      <div className='forgetpassword'>

        <div className='wrapper'>

          <h2>Forgot Password ?</h2>

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
                value={email}
                onChange={(e) => setEmail(e.target.value)}

              />
              <FaUser className='icon' />
            </div>

            <div className='input-box'>
              <label htmlFor="password">
                <strong>New Password</strong>
              </label>
              <input
                type="password"
                placeholder="Enter New Password"
                name="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <FaLock className='icon' />
            </div>

            <div className='input-box'>
              <label htmlFor='answer'>
                <strong>Answer</strong>
              </label>
              <input
                type="text"
                placeholder="Enter Your Answer"
                autoComplete="off"
                name="answer"
                value={answer}

                onChange={(e) => setAnswer(e.target.value)}
              />
              <MdQuestionAnswer className='icon' />
            </div>

            <button type="submit" >
              Submit
            </button>


          </form>
        </div>
      </div>
    </Layout>
  )
}

export default Forgetpassword;