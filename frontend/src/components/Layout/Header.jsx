import React from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import toast from 'react-hot-toast';
import SearchInput from '../Form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';






const Header = () => {
    const [auth, setAuth] = useAuth();
    const category = useCategory();

    const [cart, setCart] = useCart();
    
    const handleLogout = () => {
    setAuth({...auth, user:null, token:''})
    localStorage.removeItem('auth')
    toast.success('LogOut Successfully')
    }




  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary ">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to={'/'} className="navbar-brand"><svg width="30px" height="30px" viewBox="0 0 1024 1024" className="icon" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M960.1 258.4H245.8l-36.1-169H63.9v44h110.2l26.7 125 100.3 469.9 530 0.4v-44l-494.4-0.3-22.6-105.9H832l128.1-320.1z m-65 44L855.6 401H276.3l-21.1-98.6h639.9zM304.8 534.5L279.7 417h569.5l-47 117.5H304.8z" fill="#39393A" /><path d="M375.6 810.6c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52m0-20c-39.7 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.3-72-72-72zM732 810.6c28.7 0 52 23.3 52 52s-23.3 52-52 52-52-23.3-52-52 23.3-52 52-52m0-20c-39.7 0-72 32.2-72 72s32.2 72 72 72c39.7 0 72-32.2 72-72s-32.3-72-72-72zM447.5 302.4h16v232.1h-16zM652 302.4h16v232.1h-16z" fill="#E73B37" /><path d="M276.3 401l3.4 16-3.4-16z" fill="#343535" /></svg>
  &nbsp; E - Store</Link>
 <div className='ms-auto'>
 <SearchInput/>
 </div>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to={'/'} className="nav-link">Home</NavLink>
        </li>
 <li className="nav-item dropdown">
  <NavLink to={'/category'} className="nav-link dropdown-toggle dash" role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Category
  </NavLink>
  <ul className="dropdown-menu">
    {category?.map((e) => {
     return(
      <li key={e._id}><NavLink to={`/category/${e.slug}`} className="dropdown-item dash">{e.name}</NavLink></li>
     )
    })}

  </ul>
</li>

        {!auth.user ? (<>
            <li className="nav-item">
          <NavLink to={'/register'} className="nav-link">Register</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to={'/login'} className="nav-link">Login</NavLink>
        </li>
        </>) : (
            <>
 <li className="nav-item dropdown">
  <NavLink to={`/dashboard/${auth.user.role===1 ? 'admin' : 'user'}`} className="nav-link dropdown-toggle dash"  role="button" data-bs-toggle="dropdown" aria-expanded="false" >
 {auth.user.role===1 ? (<>Admin</>) : (<>User</>)}
  </NavLink>
  <ul className="dropdown-menu"> 
    <li><NavLink to={`/dashboard/${auth.user.role===1 ? 'admin' : 'user'}`}  className="dropdown-item dash">{auth.user.role===1 ? (<>Dashboard</>) : (<>Dashboard</>)}</NavLink></li>
    <li><NavLink to={'/logout'} className="dropdown-item" onClick={handleLogout}>LogOut</NavLink></li>
  </ul>
</li>    

            </> 
        )}
        <li className="nav-item">
          <NavLink to={'/cart'} className="nav-link">CART <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" color='gray' fill="currentColor" className="bi bi-cart3" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .49.598l-1 5a.5.5 0 0 1-.465.401l-9.397.472L4.415 11H13a.5.5 0 0 1 0 1H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l.84 4.479 9.144-.459L13.89 4zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg><span className="badge rounded-pill translate-middle ms-2 bg-danger">{cart?.length}</span></NavLink>
        </li>
      </ul>
    </div>
  </div>
</nav>


    </>
  )
}

export default Header;