import React from 'react'
import UserMenu from '../../components/Layout/UserMenu'
import Layout from '../../components/Layout/Layout'
import { useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import toast from 'react-hot-toast'

const Profile = () => {
  const [auth, setAuth] = useAuth()

  const [profile, setProfile] = useState({
    name: auth.user.name,
    email: auth.user.email,
    phone: auth.user.phone,
    address: auth.user.address
})

const abc = (e) => {
setProfile({...profile,[e.target.name]:e.target.value})
}

const submitController = async(e) => {
  try {
    e.preventDefault();
    const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/profile`, profile);
    if (res && res?.data?.success){
    let abc = JSON.parse(localStorage.getItem('auth'))
    abc.user = res.data.updating
    localStorage.setItem('auth', JSON.stringify(abc))
    //   console.log(res?.data?.updating)
      toast.success(res?.data?.message);
    }
    else{
      toast.error(res.data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.response.data.message);
  }

}


  return (
    <Layout>
        <div className="container-fluid my-3 py-3 ps-5">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
              <div className="row" >
                <div className="col-md-6 m-auto">
                <h5 className='text-center'>My Profile</h5> 
        <form onSubmit={submitController}>
        <div className="mb-2">
    <label htmlFor="exampleInputName" className="form-label">Name</label>
    <input type="text" className="form-control" id="exampleInputName" aria-describedby="emailHelp" name='name' size={30} required onChange={abc} value={profile.name}/>
  </div>
        <div className="mb-2">
    <label htmlFor="exampleInputEmail" className="form-label">Email</label>
    <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" name='email' size={30} onChange={abc} disabled value={profile.email}/>
  </div>
  <div className="mb-2">
    <label htmlFor="exampleInputPhone" className="form-label">Phone</label>
    <input type="number" className="form-control" id="exampleInputPhone" required name='phone' onChange={abc} value={profile.phone}/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputAddress" className="form-label">Address</label>
    <input type="text" className="form-control" id="exampleInputAddress" required name='address' onChange={abc} value={profile.address}/>
  </div>
  <div className='d-grid'>
  <button type="submit" className="btn btn-warning mt-2">Update Profile</button>
  </div>
</form>
                </div>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Profile