import React from 'react'
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import { useAuth } from '../../context/auth';

const Adashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
        <div className="container-fluid my-3 pt-3 ps-5">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu/>
            </div>
            <div className="col-md-9">
            <h3 className='text-center text-secondary'>Admin Details</h3>
              <div className=" w-75 m-auto mt-3">
                <h6><b>Admin Name:</b></h6>
                <p>{auth?.user.name}</p>
                <hr />
                <h6><b>Admin Email:</b></h6>
                <p>{auth?.user.email}</p>
                <hr />
                <h6><b>Admin Contact:</b></h6>
                <p>{auth?.user.phone}</p>
                <hr />
                <h6><b>Admin Address:</b></h6>
                <p>{auth?.user.address}</p>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Adashboard;