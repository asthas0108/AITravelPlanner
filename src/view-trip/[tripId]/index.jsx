import { db } from '@/service/FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner';
import InfoSection from '../components/InfoSection';
import Hotels from '../components/Hotels';
import PlacesToVisit from '../components/PlacesToVisit';
import Footer from '../components/Footer';
import Header from '@/components/custom/Header';

export default function ViewTrip() {

    const {tripId} = useParams();
    const [trip, setTrip] = useState([]);

    useEffect(() => {
        tripId && getTripData();
    }, [tripId])

    const getTripData = async () => {
        const docRef =  doc(db, 'AITrips', tripId);
        const docSnap = await getDoc(docRef);

        if(docSnap.exists()){
            console.log("document", docSnap.data());
            setTrip(docSnap.data());
        }else{
            console.log("no such doc found");
            toast("no trip found");
        }
    }

  return (
    <>
    <Header/>
        <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
        {/* info */}

        <InfoSection trip = {trip}/>
        <hr/>

        {/* daily plan */}

        <PlacesToVisit trip={trip}/>
        <hr className='mt-5'/>

        {/* hotels */}

        <Hotels trip={trip}/>

        <hr className='mt-5'/>

        {/* <footer></footer> */}

        <Footer trip={trip}/>
    </div>
    </>
  )
}
