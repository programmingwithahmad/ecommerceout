import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import Pagenotfound from './pages/Pagenotfound'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/user/Dashboard'
import { Privateroute } from './components/Routes/Private'
import Getemail from './pages/Getemail'
import Otpforgot from './pages/Otpforgot'
import Changepassword from './pages/Changepassword'
import { Admin } from './components/Routes/Admin'
import Adashboard from './pages/admin/Adashboard'
import CreateCategory from './pages/admin/CreateCategory'
import CreateProduct from './pages/admin/CreateProduct'
import Users from './pages/admin/Users'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import Products from './pages/admin/Products'
import Updateproduct from './pages/admin/Updateproduct'
import Search from './pages/Search'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import Cartpage from './pages/Cartpage'
import AdminOrders from './pages/admin/AdminOrders'


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/'           element={<HomePage/>} />
        <Route path='/cart'           element={<Cartpage/>} />
        <Route path='/about'      element={<About/>} />
        <Route path='/contact'    element={<Contact/>} />
        <Route path='/policy'     element={<Policy/>} />
        <Route path='/register'   element={<Register/>} />
        <Route path='/login'      element={<Login/>} />
        <Route path='/logout'     element={<HomePage/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/product/:slug' element={<ProductDetails/>} />
        <Route path='/category/:slug' element={<Categories/>} />

        <Route path='/dashboard'       element={<Privateroute/>} >
          <Route path='user' element={<Dashboard/>} />
          <Route path='user/profile' element={<Profile/>} />
          <Route path='user/orders' element={<Orders/>} />
        </Route>
        <Route path='/dashboard'       element={<Admin/>} >
          <Route path='admin' element={<Adashboard/>} />
          <Route path='admin/create-category' element={<CreateCategory/>} />
          <Route path='admin/create-product' element={<CreateProduct/>} />
          <Route path='admin/products' element={<Products/>} />
          <Route path='admin/product/:slug' element={<Updateproduct/>} />
          <Route path='admin/show-users' element={<Users/>} />
          <Route path='admin/orders' element={<AdminOrders/>} />
        </Route>

        <Route path='/forgot'           element={<Getemail/>} />
        <Route path='/otpforgot'           element={<Otpforgot/>} />
        <Route path='/changepassword'           element={<Changepassword/>} />
        <Route path='*'           element={<Pagenotfound/>} />

      </Routes>
    </>
  )
}

export default App;