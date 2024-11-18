import React from 'react'
import Layout from '../components/Layout/Layout'
import { useState } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate()
    const [reg, setreg] = useState({
        name: '',
        email: '',
        password: '',
        phone:'',
        address:''
    })

const abc = (e) => {
setreg({...reg,[e.target.name]:e.target.value})
}

const handler = async(event) => {
    try {
        event.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/register`,reg);
    console.log(res);
    if(res && res.data.success){
        toast.success(res.data.message,{duration: 5000})
    }
    else{
        toast.error(res.data.message,{duration: 5000})
    }
    navigate('/login');
    } catch (error) {
        console.log(error);
        toast.error('Something went wrong',{duration: 4000});
    }
    
}

  return (
    <Layout>

<div className="container register">
  <div className="row" >
    <div className="col-sm-8 ">
        <div className='register_img'>
        <img src="/images/register.jpg" alt="" width={'55%'} height={'auto'} style={{borderRadius:'10px', transform: 'scaleX(1)', marginRight:'auto'}} />
        </div>
    </div>
    <div className="col-sm-4">
        <div className='register_inner'>
        <h5><u>Registration</u></h5> 
        <form onSubmit={handler}>
        <div className="mb-2">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" name='name' size={30} required value={reg.name} onChange={abc}/>
  </div>
        <div className="mb-2">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" name='email' size={30} required value={reg.email} onChange={abc}/>
  </div>
        <div className="mb-2">
    <label htmlFor="exampleInputPassword" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" name='password' size={30} required value={reg.password} onChange={abc}/>
  </div>
  <div className="mb-2">
    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
    <input type="number" className="form-control" id="exampleInputPhone" required name='phone' value={reg.phone} onChange={abc}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAddress" required name='address' value={reg.address} onChange={abc}/>
  </div>
  <div className='d-grid'>
  <button type="submit" className="btn btn-warning mt-2">Submit</button>
  </div>
</form>

        </div>

    </div>
  </div>
</div>

    </Layout>
  )
}

export default Register