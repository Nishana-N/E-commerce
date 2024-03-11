import React from 'react'
import { NavLink } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <div className='text-center'>
        <div className='list-group'>
            <h1>Admin panel</h1>
            <NavLink to="/dashboard/admin/create-category" className="list-group-item list-item-action">
                Create Category
            </NavLink>

            <NavLink to="/dashboard/admin/create-product" className="list-group-item list-item-action">
                Create Product
            </NavLink>
            
           <NavLink to="/dashboard/admin/users" className="list-group-item list-item-action">
              Users
            </NavLink>

        </div>

    </div>
  )
}

export default Adminmenu