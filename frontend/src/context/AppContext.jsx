import { useContext } from "react";
import { createContext } from "react";
import axios from 'axios'
import {toast} from 'react-hot-toast'
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL

export const AppContext = createContext();

export const AppProvider=({children})=>{

    const navigate=useNavigate()
    const currency =import.meta.env.VITE_CURRENCY
    const[token,setToken]=useState(null)
    const[user,setUser]=useState(null)
    const[isOwner,setIsOwner]=useState(false)
    const[showLogin,setShowLogin]=useState(false)
    const[showRegister,setShowRegister]=useState(false)
    const[pickupDate,setPickupDate]=useState('')
    const[returnDate,setReturnDate]=useState('')
    const[items,setItems]=useState([])

    //function to check if user is logged in
    const fetchUser=async()=>{
        try {
           const {data} = await axios.get('/api/user/data')
           if(data.success){
            setUser(data.user)
            setIsOwner(data.user.role==='owner')
           }
           else{
            navigate('/')
           }
        } catch (error) {
            toast.error(error.message)
        }
    }

    //function to fetch all Items from server
    const fetchItems=async()=>{
        try {
            const {data} = await axios.get('/api/user/items')
            fetchItems()
            data.success? setItems(data.items):toast.error(data.message)
        } catch (error){
            toast.error(error.message)
        }
    }

    //function to logout the user
    const logout =()=>{
        localStorage.removeItem('token')
        setToken(null)
        setUser(null)
        setIsOwner(false)
        axios.defaults.headers.common['Authorization']=''
        toast.success('You have been logged out')
    }

    //useEffect to retrive token from local storage
    useEffect(()=>{
        const token=localStorage.getItem('token')
        setToken(token)
        fetchItems()
    },[])

    //useEffect to fetch user data when token is available
    useEffect(()=>{
        if(token){
            axios.defaults.headers.common['Authorization']=`${token}`
            fetchUser()
        }
    },[token])

    const value={
        navigate,
        currency,axios,user,setUser,token,setToken,isOwner,setIsOwner,fetchUser,showLogin,setShowLogin,logout,fetchItems,items,setItems,pickupDate,setPickupDate,returnDate,setReturnDate,showRegister,setShowRegister
    }

    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    return useContext(AppContext)
}