import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom' 

const UNSPLASH_URL = "https://api.unsplash.com/search/photos?page=1&query={PLACE}&client_id="+import.meta.env.VITE_ACCESS_KEY


export default function HotelCardItem({hotel}) {

  const [photo, setPhoto] = useState('/hotel.jpg');
  useEffect(() => {
    if (hotel?.hotelName) {
        getPlacePhoto(hotel.hotelName);
    }
}, [hotel]);

const getPlacePhoto = async (place) => {
    try {
        const response = await fetch(UNSPLASH_URL.replace('{PLACE}', encodeURIComponent(place)));
        const data = await response.json();
        
        if (data.results.length > 0) {
            setPhoto(data.results[0].urls.regular); // Set first image from results
        }
    } catch (error) {
        console.error("Error fetching image:", error);
    }
};
  return (
    <Link to={'https://www.google.com/maps/search/?api=1&query='+hotel?.hotelName+", "+hotel?.hotelAddress} target='_blank'>
        <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src={photo} className='rounded-xl h-[180px] w-full object-cover'/>
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
