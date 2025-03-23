import React, { useEffect, useState } from 'react';
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from 'react-router-dom';

const PEXELS_URL = "https://api.pexels.com/v1/search?query={PLACE}&per_page=1";
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

// const UNSPLASH_URL = "https://api.unsplash.com/search/photos?page=1&query={PLACE}&client_id=" + import.meta.env.VITE_ACCESS_KEY;

export default function PlaceCardItem({ place }) {
    const [photo, setPhoto] = useState('/pic3.jpg');

    useEffect(() => {
        if (place?.placeName) {
            getPlacePhoto(place.placeName);
        }
    }, [place]);

    const getPlacePhoto = async (place) => {
        try {
            const response = await fetch(`/api/getPlacePhoto?place=${encodeURIComponent(place)}`);
            const data = await response.json();
            
            if (data.photos.length > 0) {
                setPhoto(data.photos[0].src.medium);
            }
        } catch (error) {
            console.error("Error fetching image:", error);
        }
    };
    

    // const getPlacePhoto = async (place) => {
    //     try {
    //         const response = await fetch(PEXELS_URL.replace('{PLACE}', encodeURIComponent(place)), {
    //             headers: {
    //                 Authorization: PEXELS_API_KEY
    //             }
    //         });
    //         const data = await response.json();
            
    //         if (data.photos.length > 0) {
    //             setPhoto(data.photos[0].src.medium); // Set first image from results
    //         }
    //     } catch (error) {
    //         console.error("Error fetching image:", error);
    //     }
    // };

    return (
        <div className='border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
            <div className="w-1/4">
                <img src={photo} className="w-full h-[145px] object-cover" />
            </div>

            <div className='w-3/4'>
                <h2 className='font-bold text-lg'>{place.placeName}</h2>
                <p className='text-sm text-gray-500'>{place.placeDetails}</p>
                <h2 className='mt-4'>{place.travelTime}</h2>
                <h2><span className='font-semibold'>Best time to visit: </span>{place.bestTimeToVisit}</h2>
                <Link className='flex gap-2 items-center' to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
                    <FaMapLocationDot className='text-blue-500'/>
                    <p className='text-blue-500'>Open in map</p>
                </Link>
            </div>
        </div>
    );
}


// import React, { useEffect, useState } from 'react';
// import { FaMapLocationDot } from "react-icons/fa6";
// import { Link } from 'react-router-dom';

// const UNSPLASH_URL = "https://api.unsplash.com/search/photos?page=1&query={PLACE}&client_id="+import.meta.env.VITE_ACCESS_KEY

// export default function PlaceCardItem({place}) {

//     const [photo, setPhoto] = useState('/pic3.jpg');

//     useEffect(() => {
//             if (place?.placeName) {
//                 getPlacePhoto(place.placeName);
//             }
//         }, [place]);
    
//         const getPlacePhoto = async (place) => {
//             try {
//                 const response = await fetch(UNSPLASH_URL.replace('{PLACE}', encodeURIComponent(place)));
//                 const data = await response.json();
                
//                 if (data.results.length > 0) {
//                     setPhoto(data.results[0].urls.regular); // Set first image from results
//                 }
//             } catch (error) {
//                 console.error("Error fetching image:", error);
//             }
//         };

//   return (
//     <div className='border rounded-xl p-3 flex gap-5 hover:scale-105 transition-all hover:shadow-md cursor-pointer'>
//         {/* <div className='w-1/4'>
//             <img src='/placeholder.jpg' className='object-cover'/>
//         </div> */}
//         <div className="w-1/4">
//             <img src={photo} className="w-full h-[145px] object-cover" />
//         </div>

//         <div className='w-3/4'>
//             <h2 className='font-bold text-lg'>{place.placeName}</h2>
//             <p className='text-sm text-gray-500'>{place.placeDetails}</p>
//             <h2 className='mt-4'>{place.travelTime}</h2>
//             <h2><span className='font-semibold'>Best time to visit: </span>{place.bestTimeToVisit}</h2>
//             <Link className='flex gap-2 items-center' to={'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target='_blank'>
//                 <FaMapLocationDot className='text-blue-500'/>
//                 <p className='text-blue-500'>Open in map</p>
//             </Link>
//         </div>
        
//     </div>
//   )
// }
