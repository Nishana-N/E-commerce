import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import Layout from '../../Components/Layouts/Layout';
import './Register.css';
import { FaUser } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { MdPhoneIphone } from "react-icons/md";
import { FaAddressBook } from "react-icons/fa";
import { MdQuestionAnswer } from "react-icons/md";

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [answer, setAnswer] = useState("");
    const [address, setAddress] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        axios.post("http://localhost:8080/api/v1/auth/register", {
            name,
            email,
            password,
            address,
            phone,
            answer
        })
            .then(res => {
                navigate('/login')
            })
            .catch(err => console.log(err))
    }
    return (
        <div>
            <Layout title={"Register"}>
                <div className='register'>
                    <div className='wrapper'>
                        <h2>Register</h2>
                        <form onSubmit={handleSubmit}>
                            <div className='input-box'>
                                <label htmlFor='name'>
                                    <strong>Name</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Name"
                                    autoComplete="off"
                                    name="name"
                                    value={name}
                                    
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <FaUser className='icon' />
                            </div>

                            <div className='input-box'>
                                <label htmlFor='email'>
                                    <strong>Email</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Email"
                                    autoComplete="off"
                                    name="email"
                                    value={email}
                                    
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <MdOutlineMailOutline className='icon' />
                            </div>

                            <div className='input-box'>
                            <label htmlFor='password'>
                                    <strong>Password</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Password"
                                    autoComplete="off"
                                    name="password"
                                    value={password}
                                    
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <FaLock className='icon' />
                            </div>

                            <div className='input-box'>
                            <label htmlFor='phone'>
                                    <strong>Phone</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Number"
                                    autoComplete="off"
                                    name="phone"
                                    value={phone}
                                    
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                                <MdPhoneIphone className='icon' />
                            </div>

                            <div className='input-box'>
                            <label htmlFor='address'>
                                    <strong>Adress</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Address"
                                    autoComplete="off"
                                    name="address"
                                    value={address}
                                  
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                                <FaAddressBook className='icon' />
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
                                Register
                            </button>

                            <div className='login-link'>
                            <p style={{color:"white"}}>Already have an account  <Link className='link' to="/login" >Login</Link></p>
                           
                            </div>


                        </form>
                    </div>
                </div>
                
            </Layout>
        </div>
    )
}

export default Register