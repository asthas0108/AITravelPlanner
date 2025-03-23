// import React from 'react'

// export default function options() {
//   return (
//     <div>options</div>
//   )
// }

export const SelectTravelsList = [
    {
        id: 1,
        title: "Just Me",
        description: "Solo adventures, endless discoveries",
        icon: "✈️",
        people: "1",
    },
    {
        id: 2,
        title: "A Couple",
        description: "Shared journeys, cherished moments",
        icon: "🥂",
        people: "2",
    },
    {
        id: 3,
        title: "Family & Friends",
        description: "Memorable journeys with loved ones",
        icon: "🏠",
        people: "3 to 5",
    },
    // {
    //     id: 4,
    //     title: "Friends",
    //     description: "A bunch of thrill-seekers",
    //     icon: "🚢",
    //     people: "3 to 5",
    // }
]

export const BudgetTravelsList = [
    {
        id: 1,
        title: "Budget-Friendly",
        description: "Travel smart and save more",
        icon: "💴",   
    },
    {
        id: 2,
        title: "Balanced ",
        description: "Comfort at a reasonable price",
        icon: "💰",
    },
    {
        id: 3,
        title: "Luxury",
        description: "Indulge in a premium experience",
        icon: "💸",
    }
]

export const AI_PROMPT =  "Generate Travel Plan for Location : {location}, for {totalDays} Days for {traveler} people with a {budget} budget, give me Hotels options list with name of hotel as 'hotelName', address as 'hotelAddress', hotel price as 'price', hotel image url, geo coordinates, hotel rating as 'rating', descriptions and suggest itinerary with placeName, placeDetails, Place Image Url, Geo Coordinates, ticket Pricing,  travelTime each of the location for {totalDays} days with each day plan with bestTimeToVisit on each location in JSON format."

