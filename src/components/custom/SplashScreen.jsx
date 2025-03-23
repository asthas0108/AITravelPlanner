// // import React, { useState, useEffect } from "react";
// // import { motion } from "framer-motion";

// // export default function SplashScreen({ onFinish }) {
// //   useEffect(() => {
// //     const timer = setTimeout(() => {
// //       onFinish(); // Hide splash screen after 3 seconds
// //     }, 5000);
// //     return () => clearTimeout(timer);
// //   }, [onFinish]);

// //   return (
// //     <motion.div
// //   className="fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center"
// // //   style={{ backgroundColor: "#0080c4" }}  // Inline style for custom color
// //   initial={{ opacity: 1 }}
// //   animate={{ opacity: 0 }}
// //   exit={{ opacity: 1 }}
// //   transition={{ duration: 24 }}
// // >
// //   <img src="/animation.gif" alt="Travel Planner" className="w-140 h-140 mb-4"/>
// //   <h1 className="text-2xl font-bold text-gray-800">Hi, I am your Travel Planner!</h1>
// // </motion.div>

// //   );
// // }


import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
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
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white"
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

      <div className="w-full h-full flex">
        {/* Left half - Robot Image */}
        <div className="w-1/2 h-full flex flex-col items-center justify-center bg-white text-center p-6">
          <motion.h1
            className="text-6xl font-extrabold text-black tracking-wider"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
          >
            <Typewriter
              words={["Hi, I'm your Travel Planner"]}
              loop={false}
              cursor
              cursorStyle="_"
              typeSpeed={50}
              deleteSpeed={50}
            />
          </motion.h1>
          <motion.p
            className="text-4xl text-gray-700 mt-7 opacity-75 font-bold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1 }}
          >
            Let's plan your perfect journey!
          </motion.p>
        </div>
        <div className="w-1/2 h-full flex items-center justify-center">
          <motion.img
            src="/robot123.jpg"
            alt="Travel Planner"
            className="w-3/4 h-auto object-contain"
            transition={{  duration: 6, ease: "easeInOut" }}
          />
        </div>

        {/* Right half - Text Content */}
        
      </div>
    </motion.div>
  );
}


