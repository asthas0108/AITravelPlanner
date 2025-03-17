import Header from '@/components/custom/Header';
import { db } from '@/service/FirebaseConfig';
import { collection, doc, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UserTripCard from './components/UserTripCard';

export default function MyTrips() {

    const navigate = useNavigate();

    const [userTrips, setUserTrips] = useState([])

    useEffect(() => {
        getUserTrips()
    },[])

    const getUserTrips = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if(!user){
            navigate("/");
            return;
        }

        setUserTrips([])

        const q = query(collection(db, "AITrips"), where('userEmail','==',user?.email))
        const querySnapShot = await getDocs(q);
        querySnapShot.forEach((doc) => {
            console.log(doc.id, '==', doc.data());
            setUserTrips(prev => [...prev, doc.data()])
        })
    }

  return (
    <>
        <Header/>
        <div className='max-w-6xl m-auto sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
            <h2 className='font-bold text-3xl'>My Trips</h2>

            <div className='grid grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
                {
                    userTrips?.length > 0 ?  userTrips.map((trip, index) => {
                        return (
                            <UserTripCard trip={trip} key={index}/>
                        )
                    }):
                    [1,2,3,4,5,6].map((item, index) => {
                        <div key={index} className='h-[250px] w-full bg-slate-400 animate-pulse rounded-xl'>

                        </div>
                    })
                }
            </div>
        </div>
    </>
  )
}
