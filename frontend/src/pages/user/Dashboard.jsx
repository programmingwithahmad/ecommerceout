import React from 'react'
import Layout from '../../components/Layout/Layout';
import UserMenu from '../../components/Layout/UserMenu';
import { useAuth } from '../../context/auth';

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  return (
    <Layout>
         <div className="container-fluid my-3 py-3 ps-5">
          <div className="row">
            <div className="col-md-3">
              <UserMenu/>
            </div>
            <div className="col-md-9">
            <h4 className='text-center text-secondary'><b>Customer Details</b></h4>
              <div className=" w-75 m-auto mt-3">
                <h6><b>Customer Name:</b></h6>
                <p>{auth?.user.name}</p>
                <hr />
                <h6><b>Customer Email:</b></h6>
                <p>{auth?.user.email}</p>
                <hr />
                <h6><b>Customer Contact:</b></h6>
                <p>{auth?.user.phone}</p>
                <hr />
                <h6><b>Customer Address:</b></h6>
                <p>{auth?.user.address}</p>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Dashboard;