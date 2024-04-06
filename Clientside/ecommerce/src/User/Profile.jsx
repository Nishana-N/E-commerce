import React from 'react';
import Layout from '../Components/Layouts/Layout';
import Usermenu from '../Components/Layouts/Usermenu';

const Profile = () => {
  return (
    <div>
        <Layout title={"Profile Dashboard "}>
            <div className='row'>
                <div className='col-md-3'>
                    <Usermenu/>
                </div>
                <div className='col-md-9'>
                    <h1> User Profile</h1>
                </div>
            </div>
        </Layout>
    </div>
  )
}

export default Profile