import React from 'react';
import Layout from '../Components/Layouts/Layout';
import contactimage from '../../public/Images/contactus.jpeg';
import './contact.css';
import { MdMarkEmailRead } from "react-icons/md";
import { TfiHeadphoneAlt } from "react-icons/tfi";
import { FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div>
        <Layout title={"Contact Us"}>
        <div className='section'>
          <div className='row'>
            <div className='col-md-6 c1'>
              <img src={contactimage} alt='contactimage' className='img-fluid' width="100%" height="100%" />
            </div>
            <div className='col-md-6 c2'>
              <button>CONTACT US</button>
              <p className='me-auto'>  Any query info about product feel free to call anytime we 24X7 available</p>
              <p> <MdMarkEmailRead />     www.help@ecommerceapp.com</p>
              <p> <FaPhoneAlt />          012-3456789</p>
              <p><TfiHeadphoneAlt />      1800-0000-0000 (toll free)</p>
            </div>
          </div>
        </div>
      </Layout>
    </div>
  )
}

export default Contact