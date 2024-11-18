import React from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'

const CreateCategory = () => {
    const [categories, setCategories] = useState([])
    const [updateName, setUpdateName] = useState('')
    const [categoryId, setCategoryId] = useState(null)
    const [name, setName] = useState('')






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
    //toast.error(error.response.data.message)
}
}

useEffect(() => {
    getAllCategories()
}, [])

// Create Category
    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/create-category`, {name})
            setName('')
            if(res && res.data.success){
            toast.success(res.data.message)
            getAllCategories()
            getAllCategories()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

// Update Category

const handleUpdate = async (e) => {
    try {
        e.preventDefault()
        const res = await axios.put(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/update-category/${categoryId}`, {name: updateName})
        console.log(res)
        if(res && res.data.success){
            toast.success(res.data.message)
            setUpdateName('')
            getAllCategories()
        }
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    }
}

// Delete a category

const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/delete-category/${id}`)
        console.log(res)
        if(res && res.data.success){
            toast.success(res.data.message)
            getAllCategories()
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
              <h3 className='text-center text-secondary'>Manage Categories</h3>
              <div className="p-3">
              <form onSubmit={handleSubmit}>

<div className="input-group my-3 w-75 m-auto">
  <input type="text" className="form-control" placeholder="New Category" value={name} aria-label="Recipient's username" aria-describedby="button-addon2" onChange={(event)=>setName(event.target.value)}/>
  <button className="btn btn-success" type="submit" id="button-addon2"> Enter </button>
</div>

  
</form>
              </div>
              <div>
              <table className="table w-75 m-auto">
  <thead>
    <tr>
      <th scope="col">&nbsp;&nbsp;&nbsp;&nbsp; Name</th>
      <th scope="col" style={{textAlign:'right'}}>Actions &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</th>
    </tr>
  </thead>
  <tbody style={{direction:'reverse'}}>
    
      {categories?.map((e) => {
        return (
            <tr key={e._id} >
              <td>{e.name}</td>
              <td style={{textAlign:'end'}}>
                <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setUpdateName(e.name); setCategoryId(e._id)}}> Edit </button>
                  <button type="button" className="btn btn-danger" onClick={()=>{handleDelete(e._id)}}> Delete </button>
                </div>
              </td>
            </tr>
        )
     })} 

  </tbody>
</table>

              </div>
            </div>
          </div>
        </div>

<div className="modal fade mt-25" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Category</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" />
      </div>
      <form onSubmit={handleUpdate}>
      <div className="modal-body">
      <input className="form-control" type="text" onChange={(e)=>setUpdateName(e.target.value)} value={updateName} aria-label="default input example"/>


      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss='modal'>Close</button>
        <button type="submit" className="btn btn-success"  data-bs-dismiss="modal">Save changes</button>
      </div>
      </form>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default CreateCategory