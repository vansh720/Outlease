import React, { useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import Title from '../../components/owner/Title'
import { useAppContext } from '../../context/AppContext'

const Dashboard = () => {

  const { axios, isOwner, currency, toast } = useAppContext()

  const [data, setData] = useState({
    totalItems: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  })

  const dashboardCards = [
    { title: "Total Items", value: data.totalItems, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Completed", value: data.completedBookings, icon: assets.listIconColored }
  ]

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get('/api/owner/dashboard')

      if (res.data.success) {
        setData(res.data.dashboardData)
      } else {
        toast.error(res.data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData()

      const interval = setInterval(() => {
        fetchDashboardData()
      }, 4000) 

      return () => clearInterval(interval)
    }
  }, [isOwner])

  return (
    <div className='px-4 pt-10 md:px-10 flex-1'>
      
      <Title 
        title="Admin Dashboard" 
        subTitle="Monitor overall platform performance including total items, bookings, revenue, and recent activities"
      />

      <div className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 max-w-4xl'>
        {dashboardCards.map((card, index) => (
          <div key={index} className='flex gap-2 items-center justify-between p-4 rounded-md border border-borderColor hover:shadow-md transition'>
            <div>
              <h1 className='text-xs text-gray-500'>{card.title}</h1>
              <p className='text-lg font-semibold'>{card.value}</p>
            </div>
            <div className='flex items-center justify-center w-10 h-10 rounded-full bg-gray/10'>
              <img src={card.icon} alt="" className='h-4 w-4' />
            </div>
          </div>
        ))}
      </div>

      <div className='flex flex-wrap items-start gap-6 mb-8 w-full'>

        <div className='p-4 md:p-6 border border-borderColor rounded-md max-w-lg w-full'>
          <h1 className='text-lg font-medium'>Recent Bookings</h1>
          <p className='text-gray-500'>Latest customer bookings</p>

          {data.recentBookings.length === 0 ? (
            <p className='text-sm text-gray-400 mt-4'>No bookings yet</p>
          ) : (
            data.recentBookings.map((booking, index) => (
              <div key={index} className='mt-4 flex items-center justify-between'>
                
                <div className='flex items-center gap-2'>
                  <div className='hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-gray/10'>
                    <img src={assets.listIconColored} alt="" className='h-5 w-5' />
                  </div>

                  <div>
                    <p>
                      {booking.item?.brand} {booking.item?.model}
                    </p>
                    <p className='text-sm text-gray-500'>
                      {new Date(booking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2 font-medium'>
                  <p className='text-sm text-gray-500'>
                    {currency}{booking.price}
                  </p>

                  <p className={`px-3 py-0.5 border rounded-full text-sm
                    ${booking.status === "completed" ? "text-green-600 border-green-300" :
                      booking.status === "pending" ? "text-yellow-600 border-yellow-300" :
                        "text-red-600 border-red-300"}`}>
                    {booking.status}
                  </p>
                </div>

              </div>
            ))
          )}
        </div>

        <div className='p-4 md:p-6 mb-6 border border-borderColor rounded-md w-full md:max-w-xs'>
          <h1 className='text-lg font-medium'>Monthly Revenue</h1>
          <p className='text-gray-500'>Revenue for current month</p>

          <p className='text-3xl mt-6 font-semibold text-blue-600'>
            {currency}{data.monthlyRevenue}
          </p>
        </div>

      </div>

    </div>
  )
}

export default Dashboard