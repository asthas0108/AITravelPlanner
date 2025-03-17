import React from 'react'
import PlaceCardItem from './PlaceCardItem'

export default function PlacesToVisit({trip}) {
  return (
    <div className='mt-12' >
        <h2 className='font-semibold text-2xl mt-5'>Wanderlust-Worthy Spots</h2>

        <div className='mt-5'>
            {
                trip?.tripData?.travelPlan?.itinerary.map((item, index) => {
                    return (
                        <div className='mt-5'>
                            <h2 className='font-medium text-lg'>{item.day}</h2>
                            <h2><span className='font-semibold'>Best time to visit: </span>{item.bestTime}</h2>
                            <div className='grid grid-cols-2 gap-5 mt-5'>
                                {
                                    item.plan.map((place, index) => {
                                        return(
                                            <div className=''>
                                                
                                                <PlaceCardItem place={place}/>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}
