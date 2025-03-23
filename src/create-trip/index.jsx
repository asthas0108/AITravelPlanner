import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input"
import { AI_PROMPT, BudgetTravelsList, SelectTravelsList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/AIModal';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {FcGoogle} from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/FirebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai"
import { useNavigate } from 'react-router-dom';
import Header from '@/components/custom/Header';


export default function CreateTrip() {

  const [place, setPlace] = useState();
  const [formData, setFormData] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserDetails(codeResp),
    onError: (err) => console.log(err)
  })

  const onGenerateTrip = async () => {

    const user = localStorage.getItem("user");

    if(!user){
      setOpenDialog(true);
      return;
    }

    if(formData?.noofdays && formData?.noofdays > 5 && !formData?.location || !formData?.budget || !formData?.traveler){
      toast("Please enter all the details")
      return;
    }

    setLoading(true)

    console.log(formData);
    const FINAL_PROMPT = AI_PROMPT.replace('{location}', formData?.location)
    .replace('{totalDays}', formData?.noofdays)
    .replace('{traveler}', formData?.traveler)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.noofdays)
    console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());

    setLoading(false)

    saveAiTrip(result?.response?.text())

  }

  const getUserDetails = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers: {
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((res) => {
      console.log(res);
      localStorage.setItem("user", JSON.stringify(res.data));
      setOpenDialog(false)
      onGenerateTrip()
    })
  }

  const saveAiTrip = async (tripData) => {

    setLoading(true)

    const docID = Date.now().toString();
    const user = JSON.parse(localStorage.getItem("user"));

    await setDoc(doc(db, "AITrips", docID), {
      userSelection: formData,
      tripData: JSON.parse(tripData),
      userEmail: user.email,
      id: docID,
    });

    setLoading(false);
    navigate('/view-trip/'+docID)
  }

  return (
    <>
      <Header/>
      
      <div className='max-w-6xl m-auto sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      {/* <img src='/photo.jpg' className='h-[350px] w-full object-cover rounded-lg'/>
      
      <h2 className='font-bold text-3xl mt-10 text-center'>Tell Us About Your Dream Trip</h2>
      <p className='mt-3 text-gray-500 text-xl text-center'>Just share a few details, and we'll craft the perfect itinerary for you!</p> */}

<div className="relative">
  <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black/40 p-4 rounded-lg">
    <h2 className="font-bold text-3xl text-center">Tell Us About Your Dream Trip</h2>
    <p className="mt-3 text-xl text-center">Just share a few details, and we'll craft the perfect itinerary for you!</p>
  </div>
  <img src="/pic5.jpg" className="h-[350px] w-full object-cover rounded-lg" />
</div>





      <div className='mt-10 flex flex-col gap-9'>
        <div>
          <h2 className='text-xl my-3 font-medium'>Where do you want to go?</h2>

          <Input
            type="text" placeholder="Enter your dream destination"
            onChange={(v) => {
              setPlace(v.target.value)
              handleInputChange('location', v.target.value)
              console.log(v.target.value);
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning to travel? (atmost 5 days)</h2>

          <Input
            type="number" placeholder="Example. 3"
            onChange={(e) => {
              handleInputChange('noofdays', e.target.value)
              console.log(e.target.value);
            }}
          />
        </div>

        <div className='flex gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your budget ?</h2>
          <div className='grid md:grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
            {
              BudgetTravelsList.map((item, index) => {
                return (
                  <div key={index}
                    onClick={() => {
                      handleInputChange('budget', item.title)
                    }}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                      ${formData?.budget==item.title && `shadow-lg border-black`}`}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.description}</h2>
                  </div>
                )
              })
            }
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who will you travel with on your next trip?</h2>
          <div className='grid md:grid-cols-3 gap-5 mt-5 sm:grid-cols-1'>
            {
              SelectTravelsList.map((item, index) => {
                return (
                  <div key={index} 
                    onClick={() => {
                      handleInputChange('traveler', item.people)
                    }}
                    className={`p-4 border cursor-pointer rounded-lg hover:shadow-lg
                      ${formData?.traveler==item.people && `shadow-lg border-black`}`}>
                    <h2 className='text-4xl'>{item.icon}</h2>
                    <h2 className='font-bold text-lg'>{item.title}</h2>
                    <h2 className='text-sm text-gray-500'>{item.description}</h2>
                  </div>
                )
              })
            }
          </div>
        </div>
        </div>
      </div>


      <div className='my-10 justify-end flex'>
         {/* <img src='/traveler.jpg' className='h-[35px] w-[35px] object-cover rounded-lg'/> */}
        <Button
          disabled={loading}
          onClick={onGenerateTrip} 
        >
          {
            loading ? 
            <AiOutlineLoading3Quarters className='h-10 w-10 animate-spin'/>
            :
            "Let's Go !"
          }
        </Button>
      </div>
      
      <Dialog open = {openDialog}>
        
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              
              <img src=''/>
              <h2 className='font-bold text-lg mt-7'>Sign In With Google</h2>
              <p>Sign in with Google authentication securely.</p>

              <Button 
                
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"> 
                <FcGoogle className='h-10 w-10'/>
                Sign In
              </Button>

            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      
    </div>
    </>
  )

  
}
