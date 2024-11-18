import React from 'react'
import { NavLink,Link } from 'react-router-dom'

const AdminMenu = () => {
  return (
    <>
  <div className="text-center">
    <div className="list-group">
    <Link to='/dashboard/admin' className='text-decoration-none'><h4 className='text-secondary'>Admin Panel</h4></Link>
    <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action" id='amenu'>Create Category</NavLink>
    <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action" id='amenu'>Create Product</NavLink>
    <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action" id='amenu'>Products</NavLink>
    <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action" id='amenu'>Orders</NavLink>
    <NavLink to="/dashboard/admin/show-users" className="list-group-item list-group-item-action" id='amenu'>All Users</NavLink>
    </div>
  </div>
    </>
  )
}

export default AdminMenu