import React from 'react'
import Usermenu from '../Components/Layouts/Usermenu';
import Layout from '../Components/Layouts/Layout';

const Orders = () => {
  return (
    <div>
        <Layout title={" Order Dashboard "}>
            <div className='row'>
                <div className='col-md-3'>
                    <Usermenu/>
                </div>
                <div className='col-md-9'>
                    <h1>User Orders</h1>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Orders