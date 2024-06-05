import React, { useState, useEffect } from 'react';
import Layout from '../Components/Layouts/Layout';
import Usermenu from '../Components/Layouts/Usermenu';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Profile.css"
import { useAuth } from '../Context/Auth';
import toast from 'react-hot-toast';



const Profile = () => {
    const [auth, setAuth] = useAuth();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("")
    

    useEffect(() => {
      const { email, name, phone, address } = auth?.user;
      setName(name);
      setPhone(phone);
      setEmail(email);
      setAddress(address);
    }, [auth?.user])
    

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
           const { data} = await axios.put("http://localhost:8080/api/v1/auth/profile", {
                name,
                email,
                password,
                address,
                phone,
                
            });
            if( data?. error){
                toast.error(data?.error);
            } else {
                setAuth({ ...auth, user: data?.updatedUser });
                let ls = localStorage.getItem("auth");
                ls = JSON.parse(ls);
                ls.user = data. updatedUser;
                localStorage.setItem("auth", JSON.stringify(ls));
                toast.success("profile updated successfully")
            }
            
        } catch (error) {
            console.log(error);
            toast.error("something went wrong")
        }
       
            
    }

    return (
        <div>
            <Layout title={"Profile Dashboard "}>
                <div className='row '>
                    <div className='col-md-3'>
                        <Usermenu />
                    </div>
                    <div className='col-md-9 '>
                        <h1> User Profile</h1> 
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
                          
                            </div>

                            <div className='input-box'>
                                <label htmlFor='address'>
                                    <strong>Address</strong>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter Your Address"
                                    autoComplete="off"
                                    name="address"
                                    value={address}

                                    onChange={(e) => setAddress(e.target.value)}
                                />
                           
                            </div>


                            <button type="submit" >
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Profile