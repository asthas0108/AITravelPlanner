import React from 'react'
import { Link } from 'react-router-dom'

export default function HotelCardItem({hotel}) {
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+", "+hotel?.hotelAddress} target='_blank'>
        <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src='/photo.jpg' className='rounded-xl h-[180px] w-full object-cover'/>
            <div className='my-2 p-1'>
                <h2 className='font-medium'>{hotel.hotelName}</h2>
                <h2 className='text-md text-gray-600'>📍{hotel.hotelAddress}</h2>


                <div className='mt-3'>

                    {/* <p className='text-md'><span className='font-semibold'>Description: </span>{hotel.description}</p> */}
                    <p className=''><span className='font-semibold'>Price: </span>{hotel.price}</p>
                    <p><span className='font-semibold'>Rating: </span> {hotel.rating}⭐</p>
                </div>

            </div>
        </div>
    </Link>
  )
}
