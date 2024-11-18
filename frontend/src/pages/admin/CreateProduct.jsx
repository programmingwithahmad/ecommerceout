import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import AdminMenu from '../../components/Layout/AdminMenu'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const CreateProduct = () => {
const navigate = useNavigate()

    const [categories, setCategories] = useState([])
    const [name, setName] = useState('')
    const [discription, setDiscription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [shipping, setShipping] = useState('')
    const [photo, setPhoto] = useState('')


//get All categories
const getAllCategories = async () => {
    try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/get-category`)
        setCategories(res.data.category)
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

    const handleCreate = async (e) => {
        try {
           // e.preventDefault()
            const productData = new FormData()
            productData.append('name', name)
            productData.append('description', discription)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('shipping', shipping)
            productData.append('photo', photo)
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/create-product`, productData)
            if(res?.data.success){
                toast.success(res.data.message)
                setName('')
                setDiscription('')
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

  return (
    <Layout>
          <div className="container-fluid my-3 pt-3 ps-5">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu/>
            </div>
            <div className="col-md-9">
              <h3 className='text-center text-secondary'>Create Products</h3>
              <div className='w-75 m-auto my-3'>

              <div className='my-3'>
   <select className="form-select " defaultValue={'abc'}  aria-label="Default select example" onChange={(ev)=>{setCategory(ev.target.value)}}>
 <option value="abc" disabled className='d-none'>Select category</option>
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

{photo && (
    <div className='mb-3 text-center'>
    <img src={URL.createObjectURL(photo)} alt="Product_Photo" height={'200px'} className='img img-responsive border rounded' />
</div>
)}

<div className="mb-3">
    <input type="text" className="form-control" placeholder='Name' value={name} onChange={(ev)=>setName(ev.target.value)}/>
  </div>
  <div className="mb-3">
  <textarea className='form-control' placeholder='Description' value={discription} onChange={(ev)=>setDiscription(ev.target.value)}/>
  </div>
  <div className="mb-3">
    <input type="number" className="form-control" placeholder='Price' value={price} onChange={(ev)=>setPrice(ev.target.value)}/>
  </div>
  <div className="mb-3">
    <input type="number" className="form-control" placeholder='Quantity' value={quantity} onChange={(ev)=>setQuantity(ev.target.value)}/>
  </div>
  <div className="mb-3">
    <select defaultValue={'abc'} className="form-select"  onChange={(ev)=>setShipping(ev.target.value)}>
    <option value="abc" disabled className='d-none'>Select shipping</option>
        <option value="0">No</option>
        <option value="1">Yes</option>
    </select>
  </div>
  <div className="mb-3 d-grid ">
    <button type='button' className="btn btn-success" onClick={handleCreate}>Create Product</button>
  </div>

</div>

            </div>
          </div>
        </div>
    </Layout>
  )
}

export default CreateProduct


// name: {
//     type: String,
//     required: true
// },
// slug: {
//     type: String,
//     required: true
// },
// description: {
//     type: String,
//     required: true
// },
// price: {
//     type: Number,
//     required: true
// },
// category: {
//     type: mongoose.ObjectId,
//     ref: 'categories',
//     required: true
// },
// quantity: {
//     type: Number,
//     required: true
// },
// photo: {
//     data: Buffer,
//     contentType: String
// },
// shipping: {
//     type: Boolean,
//     default: false 
// }