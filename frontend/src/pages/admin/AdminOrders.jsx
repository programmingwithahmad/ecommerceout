import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { useAuth } from "../../context/auth";
import moment from "moment";
import axios from "axios";
import toast from "react-hot-toast";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();
  const [status, setStatus] = useState(["Not_Process","Process","Delivered","Canceled"])

//  /order-status
  const getOrders = async () => {
    const order = await axios.get(
      `${import.meta.env.VITE_REACT_APP_API}/api/v1/auth//all-orders`
    );
    setOrders(order?.data?.ordered);
    //toast.success(order?.data?.message);
  };

  useEffect(() => {
    auth?.token && getOrders();
  }, []);

  const handleUpdateStatus = async (status, orderId) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/order-status`, {status, orderId});
      getOrders()
      toast.success(res.data.message);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }




  return (
    <Layout>
      <div className="container-fluid my-3 pt-3 ps-5">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h3 className="text-center text-secondary">Ordered Products</h3>
            {!orders.length &&  (<>
              <div className="alert alert-warning" role="alert">
                No orders found.
              </div>
            </>)}

            {orders?.map((o, i) => {
              return (
                <div className="shadow" key={o._id}>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span className=" badge rounded text-bg-success">
                            {i + 1}
                          </span>
                        </th>
                        <th scope="col">Status</th>
                        <th scope="col">Buyer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td></td>
                        <td>
                          <select defaultValue={o?.status} className="form-select form-select-sm" aria-label="Small select example" onChange={(e)=>{handleUpdateStatus(e?.target?.value, o?._id)}} >
                           {status?.map((s)=>{
                             return <option value={s} key={o._id}>{s}</option>
                           })} 
                          </select>
                        </td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o.createdAt)?.calendar()}</td>
                        <td>{o?.payment?.success ? "Success" : "Failed"}</td>
                        <td>{o?.product?.length}</td>
                      </tr>
                      <tr>
                        <td></td>
                        <td colSpan={3}><b>Address:</b> {o?.buyer?.address}</td>
                        <td><b>Phone:</b></td>
                        <td>{o?.buyer?.phone}</td>
                      </tr>
                    </tbody>
                  </table>
                  {o?.product?.map((p) => {
                    return (
                      <div className="d-flex flex-row" key={p._id}>
                        <div className="col-md-3">
                          <img
                            src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                            alt={p.name + " img..."}
                            height={"130px"}
                            width={"130px"}
                          />
                        </div>
                        <div className="col-md-9">
                          <h6>{p.name}</h6>
                          <p>{p.description.substring(0, 100)}</p>
                          <p>Price: ${p.price}</p>
                        </div>
                      </div>
                    );
                  })}
                  <div
                    className="mb-2"
                    style={{ height: "4px", background: "orange" }}
                  ></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
