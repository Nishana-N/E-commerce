import React from 'react'
import privacy from '../../public/Images/privacy.jpg';
import Layout from '../Components/Layouts/Layout';

const Policy = () => {
  return (
    <div>
      <Layout title={"Privacy Policy"}>
        <div className='container'>
          <div className='row'>
            <div className='col-md-6'>
              <img src={privacy} style={{padding:"2rem 0rem"}} className='img-fluid' width="100%" height="100%" />
            </div>
            <div className='col-md-6'style={{padding:"4rem 0rem"}}>
              <p>Add Privacy Policy</p>
              <p>Add Privacy Policy</p>
              <p>Add Privacy Policy</p>
              <p>Add Privacy Policy</p>
              <p>Add Privacy Policy</p>
              <p>Add Privacy Policy</p>
              <p>Add Privacy Policy</p>

            </div>
          </div>
        </div>
      </Layout>

    </div>
  )
}

export default Policy;