import React, { useEffect, useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import Title from '../../components/owner/Title'

const ManageItems = () => {
  const currency = import.meta.env.VITE_CURRENCY
  const [items,setItems]=useState([])
  const fetchOwnerItems=async()=>{
    setItems(dummyCarData)
  }

  useEffect(()=>{
    fetchOwnerItems()
  },[])
  return (
    <div className='px-4 pt-10 md:px-10 w-full'>
      <Title title="Manage Items" subTitle="View all listed items, update their details, or remove them from the booking platform"/>
      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
        <table className='w-full border-collapse text-left text-sm text-gray-500'>
          <thead className='text-gray-500'>
            <tr>
              <th className='p-3 font-medium'>Item</th>
              <th className='p-3 font-medium max-md:hidden'>Category</th>
              <th className='p-3 font-medium'>Price</th>
              <th className='p-3 font-medium max-md:hidden'>Status</th>
              <th className='p-3 font-medium'>Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item,index)=>(
              <tr key={index} className='border-t border-borderColor'>
                <td className='p-3 flex items-center gap-3'>
                  <img src={item.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover'/>
                  <div className='max-md:hidden'>
                    <p className='font-medium'>{item.brand}{item.model}</p>
                    <p className='text-xs text-gray-500'>{item.seating_capacity} | {item.transmission}</p>
                  </div>
                </td>
                <td className='p-3 max-md:hidden'>{item.category}</td>
                <td className='p-3'>{currency}{item.pricePerDay}/day</td>
                <td className='p-3 max:md-hidden'>
                  <span className={`px-3 py-1 rounded-full text-xs ${item.isAvailable ? 'bg-green-100 text-green-500' : 'bg-red-100 text-red-500'}`}>
                    {item.isAvailable ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className='flex items-center p-3'>
                  <img src={item.isAvailable ? assets.eye_close_icon : assets.eye_icon} alt="" className='cursor-pointer'/>
                  <img src={assets.delete_icon} alt="" className='cursor-pointer'/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageItems
