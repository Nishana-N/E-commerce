import React from 'react';
import Layout from '../Components/Layouts/Layout';
import { Link } from 'react-router-dom';
import './pagenotfound.css'

const Pagenotfound = () => {
  return (
    <div>
      <Layout title={"Go Back - Page Not Found"}>
        <div className='pagenotfound'>

          <div className="container ">
            <h1>404 Error: Page Not Found</h1>
            <p>The page you are looking for does not exist or has been moved.</p>
            <Link to="/" className="cta-button">Go to Homepage</Link>
          </div>
          </div>
      </Layout>
    
    </div >
  )
}

export default Pagenotfound