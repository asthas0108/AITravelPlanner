import Header from '@/components/custom/Header';
import { Button } from '@/components/ui/button'
import { getPlaceDetails } from '@/service/GlobalAPI';
import React, { useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io"

// const PHOTO_REF_URL = "https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key="+import.meta.env.VITE_GOOGLE_PLACE_API_KEY
const UNSPLASH_URL = "https://api.unsplash.com/search/photos?page=1&query={PLACE}&client_id="+import.meta.env.VITE_ACCESS_KEY

export default function InfoSection({trip}) {

    const [photo, setPhoto] = useState('/placeholder.jpg');

    // useEffect(() => {
    //     trip && getPlacePhoto();
    // }, [trip]);

    useEffect(() => {
        if (trip?.userSelection?.location) {
            getPlacePhoto(trip.userSelection.location);
        }
    }, [trip]);

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

    // const getPlacePhoto = async () => {

    //     const data = {
    //         textQuery: trip?.userSelection?.location?.label
    //     }

    //     const result = await getPlaceDetails(data).then(resp => {
    //         console.log(resp.data.places[0].photos[3].name);

    //         const photo_url = PHOTO_REF_URL.replace('{NAME}', resp.data.places[0].photos[3].name) 
    //         console.log(photo_url)
    //         setPhoto(photo_url);
    //     })
    // }

  return (
    <>
        
        <div>
        <img src={photo} className='h-[350px] w-full object-cover rounded-lg'/>
        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl uppercase'>{trip?.userSelection?.location}</h2>
                <div className='flex gap-5'>
                    <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-800 text-xs md:text-lg'>📆 {trip?.userSelection?.noofdays} Days</h2>

                    <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-800 text-xs md:text-lg'>💰 Budget: {trip?.userSelection?.budget}</h2>

                    <h2 className='p-1 px-3 bg-gray-100 rounded-full text-gray-800 text-xs md:text-lg'>🥂 No. of people travelling: {trip?.userSelection?.traveler}</h2>
                </div>
                <p className='text-xl mt-4'>Your perfect <span className='capitalize font-bold'>{trip?.userSelection?.location}</span> itinerary is ready! <br/> Get set for an amazing journey filled with unforgettable experiences! 🚗🥂</p>
            </div>

            {/* <Button>
                <IoIosSend/>
            </Button> */}
        </div>
    </div>
    </>
  )
}
