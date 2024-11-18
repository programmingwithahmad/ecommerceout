import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/auth'

const Footer = () => {
  const [auth, setAuth] = useAuth()

  const handleLogout = () => {
    setAuth({...auth, user:null, token:''})
    localStorage.removeItem('auth')
    toast.success('LogOut Successfully')
    }

  return (
    
<>
  <footer className="pt-5 px-5" style={{borderTop: 'solid orange', background:'#F8F9FA' }}>
    <div className="row">
      <div className="col-6 col-md-2 mb-3">
        <h5 style={{color: 'brown'}}>Browse</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><Link to={'/'} className="nav-link p-0 text-body-secondary"><i className="bi bi-houses"></i> Home</Link></li>
          <li className="nav-item mb-2"><Link to={`/dashboard/${auth?.user?.role===1 ? 'admin' : 'user'}`} className="nav-link p-0 text-body-secondary"><i className="bi bi-layout-text-window-reverse"></i> Dashboard</Link></li>
          <li className="nav-item mb-2"><Link to={'/login'} className="nav-link p-0 text-body-secondary"><i className="bi bi-box-arrow-in-right"></i> Log In</Link></li>
          <li className="nav-item mb-2"><Link to={'/logout'} className="nav-link p-0 text-body-secondary" onClick={handleLogout}><i className="bi bi-box-arrow-in-left"></i> Log Out</Link></li>
        </ul>
      </div>
      <div className="col-6 col-md-2 mb-3 ms-auto">
        <h5 style={{color: 'brown'}}>Get In Touch</h5>
        <ul className="nav flex-column">
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><i className="bi bi-telephone"></i> +12345678912</a></li>
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><i className="bi bi-envelope"></i> info.Estore@gmail.com</a></li>
          <hr />
          <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-body-secondary"><i className="bi bi-geo-alt-fill"></i> Pakistan</a></li>

        </ul>
      </div>
      <div className="col-md-6 ms-auto offset-md-1 mb-3">
     <div className="accordion accordion-flush" id="accordionFlushExample">
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
        <h6 className='text-secondary'>How can AI Virtual Assistant help?</h6>
      </button>
    </h2>
    <div id="flush-collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">The AI Virtual Assistant can show you our product catalog, help you cancel orders, check your order status, and connect you with customer care for any further assistance.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
      <h6 className='text-secondary'>Can I change or cancel my order after placing it?</h6>
      </button>
    </h2>
    <div id="flush-collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Order can be changed or canceled only if its status is “Not_Process”. After this period, we cannot guarantee modifications or cancellations as the order might have already been processed.</div>
    </div>
  </div>
  <div className="accordion-item">
    <h2 className="accordion-header">
      <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
        <h6 className='text-secondary'>How long does shipping take?</h6>
      </button>
    </h2>
    <div id="flush-collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
      <div className="accordion-body">Standard shipping typically takes 3-7 business days, depending on your location. Check your address carefully before to place an order.</div>
    </div>
  </div>
</div>

      </div>
    </div>
    <div className="d-flex flex-column flex-sm-row justify-content-between pt-4 mt-4 border-top">
      <p>2024 © E-store, All rights reserved.</p>
      <ul className="list-unstyled d-flex">
        <li className="ms-3"><a className="link-body-emphasis" href="#"></a><i className="bi bi-twitter-x"></i></li>
        <li className="ms-3"><a className="link-body-emphasis" href="#"></a><i className="bi bi-facebook"></i></li>
        <li className="ms-3"><a className="link-body-emphasis" href="#"></a><i className="bi bi-instagram"></i></li>
      </ul>
    </div>
  </footer>
</>

  )
}

export default Footer



