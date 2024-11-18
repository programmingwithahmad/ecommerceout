import React, { useEffect, useRef, useState } from 'react'
import Layout from '../components/Layout/Layout'
import { useAuth } from '../context/auth'
import { useCart } from '../context/cart'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import dropin from 'braintree-web-drop-in';
import toast from 'react-hot-toast'


const Cartpage = () => {
    const [auth, setAuth] = useAuth()
    const [cart, setCart] = useCart()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const dropinContainer = useRef(null);
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const removeItem = (pid) =>{
        try {
            const myCart = [...cart]
            const index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
           console.log(error) 
        }
    }

    const totalPrice = () => {
        let total = 0;
        cart.map((p) => {
            total = total + p.price
        })
        return total.toLocaleString('abc', {style: 'currency', currency: 'USD'})
    }



    useEffect(() => {

        const brainTree = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/braintree/token`)
                setClientToken(res.data.clientToken.clientToken)
                const instance = await dropin?.create({
                    authorization: res.data.clientToken.clientToken,
                    container: '#abc'
                })
                setInstance(instance)
                    console.log(instance)
    
            } catch (error) {
                console.log('Braintree Error',error)
            }
        }

        brainTree()

        return () => {
            if (instance) {
              instance.teardown()}}
        
    }, [auth?.token])

    const handlePayment = async() => {
        try {
            setLoading(true)
            const {nonce} = await instance?.requestPaymentMethod()
            const res = await axios.post(`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/braintree/payment`,{nonce, cart})
            setLoading(false)
            localStorage?.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success(res.data.message)
        } catch (error) {
            console.error(error)
            setLoading(false)
        }
      };
    

  return (
    <Layout>
        <div className="container mb-5">
            <div className="row">
                <div className="col-md-12">
                {auth.token && <h5 className='text-center mt-1 bg-light'>{`Hellö    |   "${auth?.user?.name}"`}</h5>}
                {cart?.length>0 && <h5 className='text-center mt-1 bg-light'>You have {cart.length} items in your cart</h5>}
                {auth.token ? '': <h5 className='text-center mt-1 text-danger'>Please Login to CheckOut</h5>}
                </div>
            </div>
            <div className="row">
                <div className="col-md-8">
                    {cart?.map((p, i) => {
                        return(
                            <div className="row card d-flex flex-row" key={i}>
                             <div className="col-md-3">
                             <img src={`${import.meta.env.VITE_REACT_APP_API}/api/v1/product/product-photo/${p._id}`} alt={p.name + " img..."} height={'130px'} width={'130px'}/>
                             </div>
                             <div className="col-md-9">
                                 <h6>{p.name}</h6>
                                 <p>{p.description.substring(0,100)}</p>
                                 <div className="btn-group" role="group" aria-label="Basic example">
                  <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={()=>{setCart([...cart,p]); toast.success('Item Added')}}> Add + </button>
                  <button className="btn btn-danger ms-end" onClick={()=>{removeItem(p._id)}}>Sub -</button>
                  {/* <button type="button" className="btn btn-danger" onClick={()=>{removeItem(p._id); toast.success('Item Removed') }}> Subtract - </button> */}
                </div>
                                 <p className='mt-3'>Price: ${p.price}</p>
                                 
                             </div>
                            </div>
                        )
                    })}
                </div>
                <div className="col-md-4">
                   <h4 className='text-center'>Cart Summary</h4>
                   <p className='text-center'>Total | CheckOut | Payment</p>
                   <hr />
                   <h6 className='text-center'>Total: {totalPrice()}</h6>
                   {auth?.user ? (
                    //  when we use more than two lines than it is mandatory to use fragments
                    <>
                    <h6>Address: </h6>
                    <p>{auth.user.address}</p>
                    <div className='text-center'>
                        <button className="btn btn-outline-warning" onClick={()=>navigate('/dashboard/user/profile')}>Update Address</button>
                    </div>     
                    </>
                   ) : (!auth?.token && (
                        <>
                        <div className='text-center mt-5'>
                            <button className="btn btn-outline-warning" onClick={()=>navigate('/login', {state:'/cart '})}>Login to CheckOut</button>
                        </div>
                        </>
                    )
                    
                   )}

                  <div className='mt-2 text-center'>
                    {!clientToken || !cart?.length ? ('') : (<>
                        <div id='abc'></div>
                    <button onClick={handlePayment} className='btn btn-success' disabled={!clientToken || !auth?.user?.address || !instance || !cart?.length}>{loading ? 'Processong' : 'Purchase'}</button>
                    </>)}
                    </div>
                </div>
            </div>
        </div>
    </Layout>
  )
}

export default Cartpage