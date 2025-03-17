import React from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export default function PlaceCardItem({place}) {
  return (
    <div className='border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
        {/* <div className='w-1/4'>
            <img src='/placeholder.jpg' className='object-cover'/>
        </div> */}
        <div className="w-1/4">
            <img src="/placeholder.jpg" className="w-full h-full object-cover" />
        </div>

        <div className='w-3/4'>
            <h2 className='font-bold text-lg'>{place.placeName}</h2>
            <p className='text-sm text-gray-500'>{place.placeDetails}</p>
            <h2 className='mt-4'>{place.travelTime}</h2>
            <Link className='flex gap-2 items-center' to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
                <FaMapLocationDot className='text-blue-500'/>
                <p className='text-blue-500'>Open in map</p>
            </Link>
        </div>
        
    </div>
  )
}
