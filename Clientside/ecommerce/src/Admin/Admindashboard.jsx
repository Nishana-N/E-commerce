import React from 'react'
import Layout from '../Components/Layouts/Layout'
import { useAuth } from '../Context/Auth'
import Adminmenu from '../Components/Layouts/Adminmenu';

const Admindashboard = () => {
  const [auth] = useAuth();
  return (
    
        <Layout title={"Admin Dashboard"}>
          <h1>Admin dashboard</h1>
          <div className='container-fluid m-10 p10'>
            <div className='row'>
              <div className='col-md-3'>
                <Adminmenu/>
              </div>
              <div className='col-md-10' style={{display:"flex"}}>
                <div className='card w-75 p-3 m-7' style={{marginTop:"10px"}}>
                  <h3>Admin Name : {auth?.user?.name}</h3>
                  <h3>Admin Email : {auth?.user?.email}</h3>
                  <h3>Admin Contact : {auth?.user?.phone}</h3>
                </div>
              </div>
            </div>
          </div>
        
        </Layout>
    
  )
}

export default Admindashboard