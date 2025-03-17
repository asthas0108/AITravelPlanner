import React from 'react'
import { Link } from 'react-router-dom'
import HotelCardItem from './HotelCardItem'

export default function Hotels({trip}) {
  return (
    <div className=''>
        <h2 className='font-semibold text-2xl mt-5'>Hotel Recommendations</h2>

        {/* <div className='grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6'> */}
        <div className='grid grid-cols-3 gap-7 mt-5'>
          {
            trip?.tripData?.travelPlan?.hotels?.map((hotel, index) => {
              return (
                <HotelCardItem hotel={hotel}/>
              )
            })
          }
        </div>
    </div>
  )
}
