import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'


const Categories = () => {
    const params = useParams()
    const [products, setProducts] = useState([])
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    // http://localhost:3000/api/v1/product/product-category/kids-collection

    const getProductCategory = async() => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
            console.log(res)
            if(res && res.data.success){
                //toast.success(res.data.message)
                setProducts(res.data.products)
            }
        } catch (error) {
            console.log(error)
           // toast.error(error.response.data.message) 
          }
    }

    useEffect(() => {
    getProductCategory()
    }, [params.slug])
    



  return (
    <Layout>
        <br />
       <p className='text-center'><b>Category:</b>  {params.slug}</p>
       <p className='text-center'><b>Found:</b> {products.length}</p>
        <div className='container-fluid'>
        <div className="row row-cols-1 row-cols-md-5 g-4 mx-3 my-1 mb-5">
        {products.map((e)=> {
            return(

<div className="col" key={e._id}>
  <div className="card text-bg-light" style={{height:'347px'}}>
    <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${e._id}`} className="card-img-top" alt={e.name + " img..."} height={'200px'}/>
    <div className="card-body">
      <h6 className="card-title text-center bg-body-secondary">{e.name}</h6>
      <small className="card-text">{e.description.substring(0,25)} ...</small>
      <h5 className="card-subtitle mb-2 text-muted mt-1"><b>Price: {e.price} $</b></h5>
      <div className='row'>
      <button type="button" className="btn btn-primary me-1 col" onClick={()=>navigate(`/product/${e.slug}`)}>Details</button>
      <button type="button" className="btn btn-success ms-1 col" onClick={()=>{setCart([...cart,e]);
        localStorage.setItem('cart', JSON.stringify([...cart,e]));
        toast.success('Item Added')}}>Cart</button>
      </div>
    </div>
  </div>
</div>
            )
        })}
        </div>
        </div>
       
    </Layout>
  )
}

export default Categories