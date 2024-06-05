import React from 'react'
import Layout from '../Components/Layouts/Layout'
import Adminmenu from '../Components/Layouts/Adminmenu'

const User = () => {
  return (
    <div>
        <Layout title={"Dashboard user"}>
            <div className='row'>
                <div className='col-md-3'>
                    <Adminmenu/>
                </div>
                <div className='col-md-9'>
                    <h1>Users</h1>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default User;