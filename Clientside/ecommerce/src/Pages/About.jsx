import React from 'react';
import Layout from '../Components/Layouts/Layout';
import aboutus from '../../public/Images/Aboutus.jpeg'

const About = () => {
  return (
    <div>
    <Layout title={"About Us"}>
    <div className='container'>
      <div className='row'>
        <div className='col-md-6'>
          <img src={aboutus} className='img-fluid' alt='about image'/>
        </div>
        <div className='col-md-6' style={{padding:"9rem 1rem"}}>
          <p style={{fontSize:"1rem"}} >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco 
            laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
             in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat 
             cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </div>
    </div>
    </Layout>
    </div>
  )
}

export default About