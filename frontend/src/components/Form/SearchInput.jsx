import React from 'react'
import { useSearch } from '../../context/search'
import toast from 'react-hot-toast'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const SearchInput = () => {
  const [values, setValues] = useSearch()
  const navigate = useNavigate()
 
  const handleSubmit = async(e) => {
    try {
        e.preventDefault()
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/search/${values.keyword}`)
        setValues({...values, results: res?.data.products})
        navigate('/search')
    } catch (error) {
        console.log(error)
        toast.error(error.response.data.message)
    } 
  }

  return (
    <div>
        <form onSubmit={handleSubmit}>
        {/* <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search..." value={values.keyword} onChange={(e)=>setValues({...values, keyword: e.target.value})} aria-label="Search" aria-describedby="button-addon2"/>
          <div className="input-group-append">
            <button className="btn btn-outline-success" type="button" id="button-addon2">Search</button>
          </div>
        </div> */}
           <div className="d-flex flex-column flex-sm-row w-100 gap-1">
            <input type="text" className="form-control"  size={30} placeholder="Search .." onChange={(e)=>setValues({...values, keyword: e.target.value})}/>
            <button className="btn btn-outline-success" type="submit">Search</button>
            </div>
        </form>
    </div>
  )
}

export default SearchInput