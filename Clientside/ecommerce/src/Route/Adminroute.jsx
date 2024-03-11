import React, { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom';
import Spinner from '../Spinner';
import axios from 'axios';
import { useAuth } from '../Context/Auth';

export default function Adminroute () {
    const[ok,setOk] = useState(false)
    const [auth, setAuth] = useAuth();

    useEffect(() => {
        const authCheck = async () => {
            const res = await axios.get("http://localhost:8080/api/v1/auth/admin-auth");
            if (res.data.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if (auth?.token) authCheck()
    }, [auth?.token])
    return ok ? <Outlet /> : <Spinner path='/'/>
  
}

