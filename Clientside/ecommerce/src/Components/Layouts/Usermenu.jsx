import React from 'react';
import { Link } from 'react-router-dom';

const Usermenu = () => {
  return (
    <div>
        <div className='text-center'>
        <div className='list-group'>
            <h1>User Panel</h1>
            <Link to="/dashboard/user/orders" className="list-group-item list-item-action">
                Orders
            </Link>

            <Link to="/dashboard/user/profile" className="list-group-item list-item-action">
                Profile
            </Link>
            
           

        </div>

    </div>
    </div>
  )
}

export default Usermenu