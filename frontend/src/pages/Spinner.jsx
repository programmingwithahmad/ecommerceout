import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const Spinner = ({path='login'}) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate();
    const location = useLocation();

useEffect(() => {
const interval = setInterval(() => {
    setCount((ini)=> --ini)
}, 1000);
count === 0 && navigate(`/${path}`, {state: location.pathname});
return () => clearInterval(interval);
}, [count, navigate, location, path])



  return (
    <>
  <div className="d-flex flex-column justify-content-center align-items-center" style={{height:'100vh'}}>
  <h3 className='text-center'>redirecting to you in {count} seconds</h3>
  <div className="spinner-border" role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>

    </>
  )
}

export default Spinner