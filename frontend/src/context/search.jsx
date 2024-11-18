import { createContext, useContext, useState} from "react";

const Mycontext = createContext();




export const Searchprovider = ({children}) => {
  const [auth, setAuth] = useState({
    keyword : '',
    results : []
  })



   
  return (
    <>
       <Mycontext.Provider value={[auth, setAuth]}>
            {children}
       </Mycontext.Provider>
    </>
  )
}


// Custom Hook
export const  useSearch = () => useContext(Mycontext);



