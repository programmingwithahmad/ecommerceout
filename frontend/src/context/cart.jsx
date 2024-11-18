import { createContext, useContext, useState, useEffect } from "react";

const Mycontext = createContext();




export const Cartprovider = ({children}) => {
  const [cart, setCart] = useState([])
  

   const data = JSON.parse(localStorage.getItem('cart'))

   useEffect(() => {
   data && setCart(data)
   },[])



  return (
    <>
       <Mycontext.Provider value={[cart, setCart]}>
            {children}
       </Mycontext.Provider>
    </>
  )
}


// Custom Hook
export const  useCart = () => useContext(Mycontext);
