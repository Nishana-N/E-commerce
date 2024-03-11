import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className=' my-5 ' style={{ backgroundColor: 'rgb(51,53,66)' }}>
            <div
                className="text-center p-4"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <p style={{ color: 'white', fontSize: '30px' }}>
                    All Rights Reserved © 😆 😆
                </p>

                <p style={{ color: 'white' }}>
                    <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>
                        About
                    </Link>
                    &nbsp;   | &nbsp;
                    <Link to="/contact" style={{ textDecoration: 'none', color: 'white' }}>
                        Contact
                    </Link>
                    &nbsp;  | &nbsp;
                    <Link to="/policy" style={{ textDecoration: 'none', color: 'white' }}>
                        Privacy Policy
                    </Link>
                </p>
            </div>



        </div>
    )
}

export default Footer