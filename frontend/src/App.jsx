import React, { useState } from 'react'
import {Route,Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/owner/Dashboard'
import AddItem from './pages/owner/AddItem'
import ItemDetails from './pages/ItemDetails'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Support from './pages/Support'
import Navbar from './components/Navbar'
import Layout from './pages/owner/Layout'
import ManageItems from './pages/owner/ManageItems'
import MyListings from './pages/owner/MyListings'
import Cart from './pages/Cart'
import Footer from './components/Footer'

const App = () => {
  const [showLogin,setShowLogin]=useState(false)
  const isOwnerPath= useLocation().pathname.startsWith('/owner')
  return (
    <>
    {!isOwnerPath && <Navbar setShowLogin={setShowLogin}/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/item/:id' element={<ItemDetails/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='support' element={<Support/>}/>
        <Route path='/owner' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='add-items' element={<AddItem/>}/>
        <Route path='manage-items' element={<ManageItems/>}/>
        <Route path='my-listings' element={<MyListings/>}/>
        </Route>
      </Routes>
      <Footer/>
      </>
  )
}

export default App
