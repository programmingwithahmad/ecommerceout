import Layout from "../components/Layout/Layout";
import toast from "react-hot-toast";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";

const Search = () => {


  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [cart, setCart] = useCart();


  return (
    <Layout>
      <div className="container-fluid my-3 py-3">
        <div className="row">
          <div className="col-md-12">
            <h5 className="text-center text-danger">Search Results</h5>
            <div className="text-end me-5">
              <small>Result shows : {values?.results?.length}</small>
            </div>
            {!(values?.results?.length) &&  (<>
            <h6 className="text-center mt-5">Products not Found</h6>
            </>)}
            <div className="row row-cols-1 row-cols-md-5 g-4 mx-3 my-1">
            {values?.results?.map((e)=> {
            return(
<div className="col" key={e._id}>
  <div className="card text-bg-light" style={{height:'347px'}}>
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
        })}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
