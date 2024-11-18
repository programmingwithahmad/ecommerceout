import React from 'react'
import { NavLink, Link } from 'react-router-dom'

const UserMenu = () => {
  return (
    <>
    <div className="text-center">
    <div className="list-group">
    <Link to='/dashboard/user' className='text-decoration-none'><h4 className='text-secondary'>Manage My Profile</h4></Link>
    <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
    <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">Orders</NavLink>
    </div>
  </div>
    </>
  )
}

export default UserMenu