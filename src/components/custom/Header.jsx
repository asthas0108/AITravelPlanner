import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {FcGoogle} from "react-icons/fc";
import axios from 'axios';


export default function Header() {

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    console.log(user);
  },[]);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => getUserDetails(codeResp),
    onError: (err) => console.log(err)
  })

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
      navigate("/")
    })
  }

  return (
    <div className='p-3 shadow-sm flex justify-between items-center px-5'>
        <div className='flex items-center justify-center'>
        <img src='/logo.webp' className='h-[50px] w-[50px]'/>
        <h2 className='font-bold text-2xl'>VoyaAI</h2>
        </div>
        <div>
            {
              user ? 
              <div className='flex items-center gap-4'>

                <a href='/create-trip'><Button variant="outline"   className="rounded-full cursor-pointer">+ Create Trip</Button></a>

                <a href='/my-trips'><Button variant="outline"   className="rounded-full cursor-pointer">My Trips</Button></a>
                
                <Popover>
                  <PopoverTrigger>
                    <img src={user?.picture} className='h-[35px] w-[35px] rounded-full cursor-pointer'/>
                  </PopoverTrigger>
                  <PopoverContent>
                    <h2 onClick={() => {
                      googleLogout();
                      localStorage.clear()
                      navigate("/")
                    }} className='cursor-pointer'>Logout</h2>
                  </PopoverContent>
                </Popover>

              </div>
              :
              <Button onClick={() =>{
                setOpenDialog(true)
              }}>Sign In</Button>
            }
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
  )
}

// import React from "react";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";
// import { FaSun, FaMoon, FaSearch } from "react-icons/fa";

// export default function Header() {
//   return (
//     <header className="p-3 shadow-md flex justify-between items-center px-6 bg-white fixed w-full top-0 z-50">
//       {/* LOGO */}
//       <Link to="/" className="flex items-center gap-2">
//         <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
//         <span className="text-xl font-semibold text-gray-800">TripAI</span>
//       </Link>

//       {/* NAVIGATION MENU */}
//       <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
//         <Link to="/" className="hover:text-[#f56551] transition">Home</Link>
//         <Link to="/" className="hover:text-[#f56551] transition">About</Link>
//         <Link to="/" className="hover:text-[#f56551] transition">Features</Link>
//         <Link to="/" className="hover:text-[#f56551] transition">Contact</Link>
//       </nav>

//       {/* SEARCH BAR */}
//       <div className="relative hidden md:block">
//         <input
//           type="text"
//           placeholder="Search destinations..."
//           className="border rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#f56551] transition"
//         />
//         <FaSearch className="absolute left-3 top-3 text-gray-500" />
//       </div>

//       {/* RIGHT SIDE - SIGN IN & DARK MODE */}
//       <div className="flex items-center space-x-4">
//         {/* DARK MODE TOGGLE */}
//         <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition">
//           <FaSun className="text-yellow-500" />
//         </button>

//         {/* SIGN IN BUTTON */}
//         <Link to="/sign-in">
//           <Button className="bg-[#f56551] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#ff855f] transition">
//             Sign In
//           </Button>
//         </Link>
//       </div>
//     </header>
//   );
// }

