import React, { useState } from 'react'
import Title from '../../components/owner/Title'
import { assets } from '../../assets/assets'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const AddItem = () => {
   const {axios,currency}=useAppContext()

  const[image,setImage]=useState(null)
  const[item,setItem]=useState({
    brand:"",
    model:"",
    year:0,
    pricePerMonth:0,
    category:"",
    location:"",
    description:"",
  })

  const [isLoading,setIsLoading]=useState(false)
  const onSubmitHandler=async(e)=>{
    e.preventDefault()
    if(isLoading) return null
    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image',image)
      formData.append('itemData',JSON.stringify(item))

      const {data} = await axios.post('/api/owner/add-item',formData)
      if(data.success){
        toast.success(data.message)
        setImage(null)
        setItem({
          brand:"",
          model:"",
          year:0,
          pricePerMonth:0,
          category:"",
          location:"",
          description:"",
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <div className='px-4 py-10 md:px-10 flex-1'>
      <Title title="Add New Item" subTitle="Fill in details to list a new itemfor booking, including pricing, availabilty, and item specification."/>
      <form onSubmit={onSubmitHandler} className='flex flex-col gap-5 text-gray-500 text-sm mt-6 max-w-xl'>
        {/* Item Image */}
        <div className='flex items-center gap-2 w-full'>
          <label htmlFor="item-image">
            <img src={image ? URL.createObjectURL(image) : assets.upload_icon} alt=""  className='h-14 rounded cursor-pointer'/>
            <input type="file" id='item-image' accept='image/*' hidden onChange={e=> setImage(e.target.files[0])}/>
          </label>
          <p className='text-sm text-gray-500'>Upload a picture of your item</p>
        </div>

        {/* Item brand and model */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Brand</label>
            <input type="text" placeholder='e.g. Samsung,Apple,Mi,Lg....' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={item.brand} onChange={e=>setItem({...item,brand:e.target.value})}/>
          </div>

           <div className='flex flex-col w-full'>
            <label>Model</label>
            <input type="text" placeholder='e.g. X2,M3,AD7' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={item.model} onChange={e=>setItem({...item,
              model:e.target.value})}/>
          </div>
        </div>

        {/* Item year,price and category */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
          <div className='flex flex-col w-full'>
            <label>Year</label>
            <input type="number" placeholder='2025' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={item.year} onChange={e=>setItem({...item,
              year:e.target.value})}/>
          </div>

           <div className='flex flex-col w-full'>
            <label>Monthly Price({currency})</label>
            <input type="number" placeholder='100' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={item.pricePerMonth} onChange={e=>setItem({...item,
              pricePerMonth:e.target.value})}/>
          </div>

          <div className='flex flex-col w-full'>
            <label>Category</label>
            <select onChange={e=>setItem({...item,category:e.target.value})} value={item.category} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a category</option>
              <option value="electronics">Electronics</option>
              <option value="furniture">Furniture</option>
              <option value="cooking appliances">Cooking appliances</option>
              <option value="Vehicle">Vehicle</option>
            </select>
          </div>
        </div>

        <div className='flex flex-col w-full'>
          <label>Location</label>
            <select onChange={e=>setItem({...item,location:e.target.value})} value={item.location} className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none'>
              <option value="">Select a Location</option>
              <option value="Gas">Mohali</option>
              <option value="Diesel">Chandigarh</option>
              <option value="Electric">Punjab</option>
            </select>
        </div>

        <div className='flex flex-col w-full'>
            <label>Description</label>
            <textarea rows={5} placeholder='e.g. A fully functional automatic washing machine' required className='px-3 py-2 mt-1 border border-borderColor rounded-md outline-none' value={item.description} onChange={e=>setItem({...item,
              description:e.target.value})}></textarea>
          </div>

          <button className='flex items-center gap-2 px-4 py-2.5 mt-4 bg-blue-600 text-white rounded-md font-medium w-max cursor-pointer'>
            <img src={assets.tick_icon} alt="" />
            {isLoading? 'Listing...' : "List Your Item"}
          </button>

      </form>
    </div>
  )
}

export default AddItem
