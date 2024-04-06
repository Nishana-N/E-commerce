import React from 'react'
import { Link } from 'react-router-dom'

const Adminmenu = () => {
  return (
    <div className='text-center'>
        <div className='list-group'>
            <h1>Admin panel</h1>
            <Link to="/dashboard/admin/create-category" className="list-group-item list-item-action">
                Create Category
            </Link>

            <Link to="/dashboard/admin/create-product" className="list-group-item list-item-action">
                Create Product
            </Link>

            <Link to="/dashboard/admin/product" className="list-group-item list-item-action">
              Product
            </Link>

            <Link to="/dashboard/admin/product/:slug" className="list-group-item list-item-action">
             Update Product
            </Link>

            
           <Link to="/dashboard/admin/users" className="list-group-item list-item-action">
              Users
            </Link>

           

        </div>

    </div>
  )
}

export default Adminmenu