import React, { useEffect, useState } from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'


const Products = () => {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
try {
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/get-product`)
    console.log(res.data.products)
    setProducts(res.data.products)
    //if(res && res.data.success){
    //toast.success(res.data.message) }
} catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
}
    }

    useEffect(() => {
        getAllProducts()
    }, [])
  return (
    <Layout>
        <div className="container-fluid my-3 pt-3 ps-5">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu/>
            </div>
            <div className="col-md-9">
              <h3 className='text-center text-secondary'>All Products <span className="badge bg-danger">{products.length}</span> </h3>

              <div className="row row-cols-1 row-cols-md-4 g-4 mx-3 my-1">
        {products.map((e)=> {
            return(
<Link to={`/dashboard/admin/product/${e.slug}`} style={{textDecoration:'none'}} key={e._id}>
<div className="col">
  <div className="card text-bg-light" style={{height:'280px'}}>
    <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${e._id}`} className="card-img-top" alt={e.name + " img..."} height={'200px'}/>
    <div className="card-body overflow-hidden text-truncate">
      <h6 className="card-title text-center bg-body-secondary">{e.name}</h6>
      <small className="card-text">{e.description}</small>
    </div>
  </div>
</div>
</Link>
            )
        })}
        </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Products