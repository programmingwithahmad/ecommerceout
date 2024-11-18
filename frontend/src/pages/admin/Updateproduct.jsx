import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const Updateproduct = () => {
    const navigate = useNavigate()
    const params = useParams()

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    let [shipping, setShipping] = useState('')
    const [photo, setPhoto] = useState('')
    const [Id, setId] = useState('')

//get Single Product
    const getSingleProduct = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/single-product/${params.slug}`)
            console.log(res?.data.product)
            setName(res?.data.product.name)
            setDescription(res?.data.product.description)
            setPrice(res?.data.product.price)
            setCategory(res?.data.product.category._id)
            setQuantity(res?.data.product.quantity)
            setShipping(res?.data.product.shipping)
            setId(res?.data.product)


        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        getSingleProduct()
    }, []) 


//get All categories
const getAllCategories = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/get-category`)
        setCategories(res?.data.category)
        // console.log(res.data.category)
        // if(res && res.data.success){
        //     toast.success(res.data.message) }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
    }
    
    useEffect(() => {
        getAllCategories()
    }, [])

    // handle Update
    const handleUpdate = async (e) => {
        try {
            e.preventDefault()
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('shipping', shipping)
            photo && productData.append('photo', photo)
            console.log(name, description, shipping, quantity, price, category,photo, Id)
            const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/update-product/${Id._id}`, productData)
            console.log(productData)
            if(res?.data.success){
                toast.success(res.data.message)
                setName('')
                setDescription('')
                setPrice('')
                setCategory('')
                setQuantity('')
                setShipping('')
                setPhoto('')
            }
            navigate('/dashboard/admin/products')
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

// handle Delete 
    const handleDelete = async () => {
        try {
            const answer = window.prompt('Type "yes" to delete this item')
            if (answer === 'yes') {
                const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/delete-product/${Id._id}`)
                console.log(res)
                if(res?.data.success){
                    toast.success(res.data.message)
                    navigate('/dashboard/admin/products')
                }
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

  return (
    <Layout>
          <div className="container-fluid my-3 pt-3 ps-5">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu/>
            </div>
            <div className="col-md-9">
              <h3 className='text-center text-secondary'>Update | Delete </h3>
              <div className='w-75 m-auto my-3'>

              <div className='my-3'>
   <select className="form-select " value={category}  aria-label="Default select example" onChange={(ev)=>{setCategory(ev.target.value)}}>
 {categories.map((e)=>{
     return(
         <option key={e._id} value={e._id}>{e.name}</option>
     )
 })}

</select>

              </div>
              
     <div className="input-group mb-3">
  <input type="file" className="form-control" accept='image/*' onChange={(e)=>setPhoto(e.target.files[0])} />
</div>

{photo ? (
    <div className='mb-3 text-center'>
    <img src={URL.createObjectURL(photo)} alt="Product_Photo" height={'200px'} className='img img-responsive border rounded' />
</div>
) : (
    <div className='mb-3 text-center'>
    <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${Id._id}`} alt="Product_Photo" height={'200px'} className='img img-responsive border rounded' />
</div>
)}

<div className="mb-3">
    <input type="text" className="form-control" placeholder='Name' value={name} onChange={(ev)=>setName(ev.target.value)}/>
  </div>
  <div className="mb-3">
  <textarea className='form-control' placeholder='Description' value={description} onChange={(ev)=>setDescription(ev.target.value)}/>
  </div>
  <div className="mb-3">
    <input type="number" className="form-control" placeholder='Price' value={price} onChange={(ev)=>setPrice(ev.target.value)}/>
  </div>
  <div className="mb-3">
    <input type="number" className="form-control" placeholder='Quantity' value={quantity} onChange={(ev)=>setQuantity(ev.target.value)}/>
  </div>
  <div className="mb-3">
    <select value={shipping} className="form-select"  onChange={(ev)=>setShipping(ev.target.value)}>
        <option value="false">No</option>
        <option value="true">Yes</option>
    </select>
  </div>
  <div className="mb-3 container">
    <div className="row">
    <button type='button' className="btn btn-primary col me-2" onClick={handleUpdate}>Update Product</button>
    <button type='button' className="btn btn-danger col ms-2" onClick={handleDelete}>Delete Product</button>
    </div>
  </div>

</div>

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default Updateproduct