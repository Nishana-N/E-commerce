import React, {useEffect, useState} from 'react'
import Usermenu from '../Components/Layouts/Usermenu';
import Layout from '../Components/Layouts/Layout';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);

    const order = async() => {
        try {
            const response  = axios.get("http://localhost:8080/api/v1/auth/orders");
            setOrders(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    
useEffect(() => {
 order()
}, [])





  return (
    <div>
        <Layout title={" Order Dashboard "}>
            <div className='row'>
                <div className='col-md-3'>
                    <Usermenu/>
                </div>
                <div className='col-md-9'>
                    {JSON.stringify(orders,null,4)}
                
                    
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Orders