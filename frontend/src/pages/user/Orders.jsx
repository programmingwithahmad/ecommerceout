import React, { useEffect, useState } from "react";
import UserMenu from "../../components/Layout/UserMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import toast from "react-hot-toast";
import moment from "moment";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    const order = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/orders`);
    setOrders(order?.data?.ordered);
    // toast.success(order?.data?.message)
  };

  useEffect(() => {
    auth?.token && getOrders();
  }, []);

  return (
    <Layout>
      <div className="container-fluid my-3 py-3 ps-5">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-8 m-auto">
          <h5 className='text-center'>All Orders</h5>
          {!orders.length &&  (<>
              <div className="alert alert-warning" role="alert">
                No orders found.
              </div>
            </>)}
            {orders?.map((o, i) => {
              return (
                <div className="border shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">{i + 1}</th>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o.createdAt)?.calendar()}</td>
                        <td>{o?.payment?.success ? 'Success' : 'Failed'}</td>
                        <td>{o?.product?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  {o?.product?.map((p) => {
                        return(
                            <div className="d-flex flex-row" key={p._id}>
                             <div className="col-md-3">
                             <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name + " img..."} height={'130px'} width={'130px'}/>
                             </div>
                             <div className="col-md-9">
                                 <h6>{p.name}</h6>
                                 <p>{p.description.substring(0,100)}</p>
                                 <p>Price: ${p.price}</p>
                             </div>
                            </div>
                        )
                    })}
                    <div className="mb-2" style={{height:'4px', background:'orange'}}></div>
                </div>
              );

            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
