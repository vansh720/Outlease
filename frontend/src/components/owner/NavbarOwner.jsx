import React from 'react'
import { assets, dummyUserData } from '../../assets/assets'
import { Link } from 'react-router-dom';

const NavbarOwner = () => {
    const user= dummyUserData;
  return (
    <div className='flex items-center justify-between px-6 md:px-10 py-1 text-white relative border-b transition-all'>
      <Link to='/'>
         <img src={assets.Logo} alt="" className='h-12'/>
      </Link>
      <p className='text-black'>Welcome,{user.name || "Owner"}</p>
    </div>
  )
}

export default NavbarOwner
