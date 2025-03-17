import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const UNSPLASH_URL = "https://api.unsplash.com/search/photos?page=1&query={PLACE}&client_id="+import.meta.env.VITE_ACCESS_KEY


export default function UserTripCard({trip}) {

    const [photo, setPhoto] = useState('/placeholder.jpg');

    useEffect(() => {
        if (trip?.userSelection?.location) {
            getPlacePhoto(trip.userSelection.location);
        }
    }, [trip]);

    const getPlacePhoto = async (trip) => {
        try {
            const response = await fetch(UNSPLASH_URL.replace('{PLACE}', encodeURIComponent(trip)));
            const data = await response.json();
            
            if (data.results.length > 0) {
                setPhoto(data.results[0].urls.regular); // Set first image from results
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };

  return (
    <Link to={'/view-trip/'+trip?.id}>
        <div className='hover:scale-105 transition-all'>
            <img src={photo} className='object-cover rounded-xl h-[250px] w-full'/>
            <div>
                <h2 className='uppercase font-bold text-lg'>{trip?.userSelection?.location}</h2>
                <h2 className='text-md text-gray-600'>{trip?.userSelection?.noofdays} days trip</h2>
                <h2 className='text-md text-gray-500'>{trip?.userSelection?.budget} budget</h2>
            </div>
        </div>
    </Link>
  )
}
