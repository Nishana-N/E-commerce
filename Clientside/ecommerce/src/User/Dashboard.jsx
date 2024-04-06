import React from 'react'
import Usermenu from '../Components/Layouts/Usermenu';
import Layout from '../Components/Layouts/Layout';
import { useAuth } from '../Context/Auth';

const Dashboard = () => {
  const [auth] = useAuth();
  return (
    <div>
        <Layout title={"User Dashboard"}>
          
          <div className='container-fluid m-10 p10'>
            <div className='row'>
              <div className='col-md-3'>
                <Usermenu/>
              </div>
              <div className='col-md-10' style={{display:"flex"}}>
                <div className='card w-75 p-3 m-7' style={{marginTop:"10px"}}>
                  <h3>User Name : {auth?.user?.name}</h3>
                  <h3>User Email : {auth?.user?.email}</h3>
                  <h3>User Address : {auth?.user?.address}</h3>
                </div>
              </div>
            </div>
          </div>
        
        </Layout>
    </div>
  )
}

export default Dashboard