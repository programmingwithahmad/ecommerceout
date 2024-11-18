import axios from "axios";
import { useAuth } from "../../context/auth"
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../../pages/Spinner";


export const Privateroute = () => {
    const [auth, setAuth] = useAuth();
    const [ok, setOk] = useState(false);
    

    // useEffect(() => {
    //     axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    // }, [auth.token]);


    useEffect(() => {
        const authCheck = async () => {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/auth/dashboard`)
        console.log(res)
           if (res.data.success){
            setOk(true)
          }else{
            setOk(false)
        }
        
        }

        if(auth?.token)  authCheck()
    },[auth?.token])

  
  
  return ok ? <Outlet/> : <Spinner/>


}


