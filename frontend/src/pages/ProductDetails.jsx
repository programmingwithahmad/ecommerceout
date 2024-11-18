import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useCart } from '../context/cart'



// Get Product Details 
const ProductDetails = () => {
    const [product, setProduct] = useState({})
    const [relatedProducts, setRelatedProducts] = useState([])
    const params = useParams()
    const navigate = useNavigate()
    const [cart, setCart] = useCart()

const getProduct = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
        if(res && res.data.success){
            //toast.success(res.data.message)
            setProduct(res.data.product)
            getSimilarProduct(res?.data?.product?._id, res?.data?.product?.category?._id)
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}

useEffect(() => {
   if(params?.slug) getProduct()
}, [params?.slug])


// Get Similar Products when showing a product detail
const getSimilarProduct = async (pid,cid) => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`)
        if(res && res.data.success){
            //toast.success(res.data.message)
            setRelatedProducts(res.data.products) }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}





  return (
    <Layout>
        <div className="container-fluid my-3 py-3">
        <h5 className='text-center mb-5 text-success'>Product Details</h5>
          <div className="row">
            <div className="col-md-6 px-5">
                <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${product._id}`} alt={product.name}  height={'300px'} />
            </div>

            <div className="col-md-6">
              <div className="card w-75 p-3">
                <b>Name :</b>  {product.name}
                <br />
                <b>Description :</b>  {product.description}
                <br />
                <b>Price :</b> $ {product.price}
                <br />
                <b>Category :</b> {product?.category?.name}
                <button className='btn btn-warning mt-4' onClick={()=>{setCart([...cart,product]);
        localStorage.setItem('cart', JSON.stringify([...cart,product]));
        toast.success('Item Added')}}>Add to Cart</button>
              </div>
            </div>
          </div>
          {/* <hr /> */}
          <h5 className='text-center mt-5'>Related Products</h5>
          {relatedProducts.length <1 && (<p className='text-center my-5'>No similar products Found</p>)}
          <div className="row row-cols-1 row-cols-md-5 g-4 mx-3 my-1">
          {relatedProducts.map((e)=> {
            return(

<div className="col" key={e._id}>
  <div className="card text-bg-light" style={{height:'347px'}}>
    <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${e._id}`} className="card-img-top" alt={e.name + " img..."} height={'200px'}/>
    <div className="card-body">
      <h6 className="card-title text-center bg-body-secondary">{e.name}</h6>
      <small className="card-text">{e.description.substring(0,27)} ...</small>
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

export default ProductDetails