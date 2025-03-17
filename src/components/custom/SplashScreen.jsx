// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";

// export default function SplashScreen({ onFinish }) {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       onFinish(); // Hide splash screen after 3 seconds
//     }, 5000);
//     return () => clearTimeout(timer);
//   }, [onFinish]);

//   return (
//     <motion.div
//   className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center"
// //   style={{ backgroundColor: "#0080c4" }}  // Inline style for custom color
//   initial={{ opacity: 1 }}
//   animate={{ opacity: 0 }}
//   exit={{ opacity: 1 }}
//   transition={{ duration: 24 }}
// >
//   <img src="/animation.gif" alt="Travel Planner" className="w-140 h-140 mb-4"/>
//   <h1 className="text-2xl font-bold text-gray-800">Hi, I am your Travel Planner!</h1>
// </motion.div>

//   );
// }



import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from 'react-simple-typewriter';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish(); // Hide splash screen after 5 seconds
    }, 10000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center "
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 26 }}
    >

<Particles
        id="tsparticles"
        init={loadFull}
        options={{
          background: { color: "transparent" },
          particles: {
            number: { value: 50 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            opacity: { value: 0.7 },
            shape: { type: "circle" },
          },
        }}
        className="absolute top-0 left-0 w-full h-full z-0"
      />



      {/* Rotating & Bouncing Animation */}
      <motion.img
        src="/animation.gif"
        alt="Travel Planner"
        className="w-140 h-140 mb-4"
        // animate={{ rotate: [0, 360], y: [-10, 10] }}
        transition={{ repeat: Infinity, duration: 26, ease: "easeInOut" }}
      />

      {/* Animated Text with Fade & Scale */}
      <motion.h1
        className="text-2xl font-bold text-black text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        {/* Hi, I am your Travel Planner! */}
        <p className="text-2xl font-bold mt-4">
  <Typewriter words={['Hi, I am your Travel Planner!']} loop={false} />
</p>
      </motion.h1>

      {/* Loading Dots Effect */}
      <motion.div
        className="flex space-x-2 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 26, repeat: Infinity }}
      >
        <div className="w-3 h-3 bg-black rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-200" />
        <div className="w-3 h-3 bg-black rounded-full animate-bounce delay-400" />
      </motion.div>
    </motion.div>
  );
}
