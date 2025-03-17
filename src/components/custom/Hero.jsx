import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    // <div className="flex flex-col justify-center items-center text-center ">

    //   {/* slider add karna hai */}
    //   <img src='/hero.jpg'/>

    //   <h1 className="font-bold text-[60px] max-w-4xl">
    //     <span className="text-[#f56551]">Plan your Itineraries with AI:</span><br />
    //     Travel Smarter, Not Harder!
    //   </h1>

    //   <p className='mt-16 text-xl text-gray-600 max-w-3xl'>Effortlessly plan your perfect trip with AI-powered recommendations tailored just for you. Say goodbye to the stress of itinerary planning and let smart technology create seamless travel experiences.</p>

    //   <Link to={'/create-trip'}>
    //     <Button className= 'mt-12'>Get Started</Button>
    //   </Link>
    // </div>


    <div 
  className="flex flex-col justify-center items-center text-center h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/hero.jpg')" }}
>

  <div>
    {/* <h1 className="font-bold text-[60px]">
      <span className="text-[#f56551]">Plan your Itineraries with AI:</span><br />
      Travel Smarter, Not Harder!
    </h1> */}

<h1 
    className="font-bold text-[60px] "
    style={{
      color: "transparent",
      WebkitTextStroke: "2px white", // Outline effect for WebKit browsers
      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" // Fallback for non-WebKit browsers
    }}
  >
    <span className="">Plan your Itineraries with AI:</span><br />
    Travel Smarter, Not Harder!
  </h1>

    {/* <p className='mt-26 text-xl text-white max-w-3xl '>
      Effortlessly plan your perfect trip with AI-powered recommendations tailored just for you. 
      Say goodbye to the stress of itinerary planning and let smart technology create seamless travel experiences.
    </p> */}

<p 
  className="mt-26 text-xl text-white max-w-3xl text-center px-4"
  style={{
    textShadow: "2px 2px 6px rgba(0, 0, 0, 0.7)", // Strong text shadow for better visibility
    backdropFilter: "blur(3px)", // Adds a slight blur to the background behind the text
    background: "rgba(0, 0, 0, 0.3)", // Adds a slight dark background to improve readability
    padding: "10px",
    borderRadius: "8px"
  }}
>
  Effortlessly plan your perfect trip with AI-powered recommendations tailored just for you. 
  Say goodbye to the stress of itinerary planning and let smart technology create seamless travel experiences.
</p>

    <Link to={'/create-trip'}>
      <Button className='mt-6'>Get Started</Button>
    </Link>
  </div>

</div>


  )
}


// import React from "react";
// import { Button } from "../ui/button";
// import { Link } from "react-router-dom";

// export default function Hero() {
//   return (
//     <div
//       className="flex flex-col justify-center items-center text-center h-screen bg-cover bg-center relative"
//       style={{
//         backgroundImage: "url('/hero.jpg')",
//         backgroundAttachment: "fixed", // Parallax Effect
//         filter: "brightness(85%)" // Slightly darken the image
//       }}
//     >
//       <div className="px-6">
//         {/* Animated Heading with Gradient */}
//         <h1
//           className="font-bold text-[60px] max-w-4xl text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 animate-fade-in"
//           style={{
//             WebkitTextStroke: "1.5px white", // Outline effect for WebKit
//             textShadow: "3px 3px 8px rgba(0, 0, 0, 0.5)" // Better depth
//           }}
//         >
//           Plan your Itineraries with AI:
//           <br />
//           Travel Smarter, Not Harder!
//         </h1>

//         {/* Improved Paragraph Readability */}
//         <p
//           className="mt-6 text-xl text-white max-w-3xl text-center px-6 py-3 rounded-lg"
//           style={{
//             textShadow: "3px 3px 10px rgba(0, 0, 0, 0.8)", // Stronger shadow
//             backdropFilter: "blur(6px)", // Better text clarity
//             background: "rgba(0, 0, 0, 0.4)", // More contrast
//           }}
//         >
//           Effortlessly plan your perfect trip with AI-powered recommendations tailored just for you. 
//           Say goodbye to the stress of itinerary planning and let smart technology create seamless travel experiences.
//         </p>

//         {/* Stylish Button with Hover Effect */}
//         <Link to={"/create-trip"}>
//           <Button className="mt-8 px-6 py-3 text-lg font-semibold bg-gradient-to-r from-[#f56551] to-[#ff855f] text-white rounded-lg shadow-lg hover:scale-105 transition-all duration-300">
//             Get Started
//           </Button>
//         </Link>
//       </div>
//     </div>
//   );
// }
