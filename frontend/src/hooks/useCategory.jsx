import axios from 'axios';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast'



const useCategory = () => {
    const [category, setCategory] = useState([]);
    
    const getAllCategories = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_REACT_APP_API}/api/v1/category/get-category`)
            setCategory(res?.data.category)
            console.log(res.data.category)
            //if(res && res.data.success){
            //toast.success(res.data.message) }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message) }
        }

        useEffect(() => {
            getAllCategories()
        }, [])


        return category
}

export default useCategory