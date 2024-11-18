import  { useEffect, useState } from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'
import { Prices } from '../components/Prices'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/cart'

const HomePage = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [checked, setChecked] = useState([])
    const [radio, setRadio] = useState([])
    const [page, setPage] = useState(1)
    const [total, setTotal] = useState(0)
    const navigate = useNavigate()
    const [cart, setCart] = useCart()
    const place = [1,2,3,4,5,6,7,8,9]

    console.log(page)

// getAllProducts
    const getAllProducts = async () => {
try {
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-list/${page}`)
    console.log(res.data.products)
    setProducts(res.data.products)
    //if(res && res.data.success){
        //toast.success(res.data.message) }
} catch (error) {
    console.log(error)
    //toast.error(error.response.data.message)
}
    }

    useEffect(() => {
    if(!checked.length || !radio.length)    getAllProducts()
    }, [checked.length, radio.length])

    //get All categories
const getAllCategories = async () => {
  try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/get-category`)
      setCategories(res?.data.category)
       console.log(res.data.category)
      // if(res && res.data.success){
      //     toast.success(res.data.message) }
  } catch (error) {
      console.log(error)
      // toast.error(error.response.data.message)
  }
  }
  
  useEffect(() => {
      getAllCategories()
      productCount()
  }, [])

  // handleFilter
  const handleFilter = (value, id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter((item) => item!== id)
    }
    setChecked(all)
  }

  // filtered product
  const filterProduct = async() => {
  try {
    console.log(radio)
    console.log('Hello')
    const filter = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-filters`, {checked, radio})
    //console.log(filter.data.products)
    //console.log(filter)
    if(filter && filter.data.success){
      // toast.success(filter.data.message)
      setProducts(filter.data.products)
    }
  } catch (error) {
    console.log(error)
    // toast.error(error.response.data.message)
  }
  }

useEffect(() => {
if(checked.length || radio.length) filterProduct() 

}, [checked, radio])

const nextPage = async()=> {
  try {
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-list/${page}`)
    console.log(res.data.products)
    setProducts(res.data.products)
    // if(res && res.data.success){
    //     toast.success(res.data.message) }
} catch (error) {
    console.log(error)
    // toast.error(error.response.data.message)
}
}

useEffect(() => {
nextPage()
}, [page])

const productCount = async() => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-count`)
    console.log(res.data.total)
    setTotal(res.data.total)
    // if(res && res.data.success){
    //     toast.success(res.data.message) }
}catch{
  console.log('error')
  // toast.error('error.response.data.message')
}
} 


  return (
    <Layout>
        <div className="container-fluid mt-3 p-3">
          <div className="row">
            <div className="col-md-2">
              <div>
              <h5>&#169; Filter by Categories</h5>
              {categories?.map((e) => {
                return (
                  <div className="form-check" key={e._id}>
                    <input 
                      className="form-check-input"
                      type="checkbox"
                      onChange={(ev) => {
                      handleFilter(ev.target.checked, e._id)
                      }}
                    />
                    <label className="form-check-label">{e.name}</label>
                  </div>
                )
              })}
              </div>
              <hr />
              <div className='mt-3'>
                <h5>&#167; Filter by Prices</h5>
                {Prices.map((e) => {
                  return (
                    <div className="form-check" key={e._id}>
                      <input 
                        className="form-check-input"
                        type="radio"
                        name="exampleRadios"
                        onChange={()=>setRadio(e.array)}
                      />
                      <label className="form-check-label">{e.name}</label>
                    </div>
                  )
                })}
              </div>
              <div className='d-flex flex-column'>
                <button className="btn btn-warning mt-2" onClick={(e)=>{window.location.reload() && e.preventDefault()}}>Clear Filters</button>
              </div>
              <div className='mt-3'>
                <img src={'/images/flyers.png'} alt="" height={'335px'} width={'200px'}/>
              </div>

            </div>
            <div className="col-md-10 home">
              <div className='text-end me-5'><small>Result shows : {products?.length}</small></div>
               {page>1 && products.length==0 &&  <h6 className='text-center my-5'><u>No more products found</u></h6>}
              <div className="row row-cols-1 row-cols-md-5 g-3 mx-3 mb-5 my-2">
        {products?.length ? products?.map((e)=> {
            return(

<div className="col" key={e._id}>
  <div className="card text-bg-light" style={{height:'342px'}}>
    <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${e._id}`} className="card-img-top" alt={e.name + " img..."} height={'200px'}/>
    <div className="card-body">
      <h6 className="card-title text-center bg-body-secondary">{e.name}</h6>
      <small className="card-text">{e.description.substring(0,21)} ...</small>
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
        }) : place?.map(p => {
          return(

            <div className="col" key={p}>
              <div className="card text-bg-light placeholder-glow" aria-hidden="true" style={{height:'342px'}}>
                <img  className="card-img-top placeholder" height={'200px'} aria-hidden='true'/>  
                <div className="card-body placeholder-glow">
                  <h6 className="card-title text-center bg-body-secondary"><span className="placeholder col-7"></span></h6>
                  <small className="card-text"><span className="placeholder col-12"></span></small>
                  <h5 className="card-subtitle mb-2 py-2 text-muted mt-1"><b><span className="placeholder col-9"></span></b></h5>
                  <div className='row'>
                  <button type="button" className="btn btn-primary me-1 disabled placeholder col" aria-disabled="true"></button>
                  <button type="button" className="btn btn-success ms-1 disabled placeholder col" aria-disabled="true"></button>
                  </div>
                </div>
              </div>
            </div>
                        )

        })}
        </div>

<div className='d-grid'>
<div className='col mt-2 text-center'><small>Page : {page}</small></div>
  <div className='col'>
<nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center mt-3">
    <li className={`page-item ${page==1 && 'disabled'}`} onClick={()=>setPage(page>1 ? page-1 : 1)}>
      <Link  className="page-link" aria-label="Previous">
        <span aria-hidden="true">«</span>
      </Link>
    </li>
    <li className={`page-item ${page==1 && 'active'}`} onClick={()=>setPage(1)}><Link className="page-link">1</Link></li>
    <li className={`page-item ${page==2 && 'active'}`} onClick={()=>setPage(2)}><Link className="page-link">2</Link></li>
    <li className={`page-item ${page==3 && 'active'}`} onClick={()=>setPage(3)}><Link className="page-link">3</Link></li>
    <li className={`page-item ${page>3 && 'active'}`} onClick={()=>{products.length ? setPage(page+1) : setPage(page-1) }}>
      <Link className="page-link" aria-label="Next">
        <span aria-hidden="true">»</span>
      </Link>
    </li>
  </ul>
</nav>
</div>
</div>
<br />


            </div>
          </div>
        </div>
    </Layout>
  )
}

export default HomePage








    // const [auth, setAuth] = useAuth(); 

    //     <p className='pink'>HomePage</p>
    //     <pre>{JSON.stringify(auth, null, 4)}</pre>
    