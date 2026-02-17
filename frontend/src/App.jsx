import React from 'react'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AddItem from './pages/AddItem'
import ItemDetails from './pages/ItemDetails'
import Chat from './pages/Chat'
import Profile from './pages/Profile'
import Support from './pages/Support'
import Navbar from './components/Navbar'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/add-item' element={<AddItem/>}/>
        <Route path='/item/:id' element={<ItemDetails/>}/>
        <Route path='/chat/:id' element={<Chat/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='support' element={<Support/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
