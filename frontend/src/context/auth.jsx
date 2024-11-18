import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";

const Mycontext = createContext();




export const Authprovider = ({children}) => {
  const [auth, setAuth] = useState({
    user:null,
    token:"",
  })

  axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`

  const parseData = JSON.parse(localStorage.getItem('auth'))

  useEffect(() => {
    parseData && setAuth({...auth, user: parseData.user, token: parseData.token});
//eslint-disable-next-line
  },[]);
  


  return (
    <>
       <Mycontext.Provider value={[auth, setAuth]}>
            {children}
       </Mycontext.Provider>
    </>
  )
}


// Custom Hook
export const  useAuth = () => useContext(Mycontext);



