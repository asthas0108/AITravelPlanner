// import { useState } from 'react';
// import './App.css';

// import { Button } from './components/ui/button';
// import Hero from './components/custom/Hero';

// function App() {

//   return (
//     <>
//       <Hero/>
//     </>
//   )
// }

// export default App;


import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/custom/Header';
import Hero from './components/custom/Hero';
import SplashScreen from './components/custom/SplashScreen';

function App() {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return showSplash ? (
    <SplashScreen/>
  ) : (
    <div>
      <Header />
      <Hero />
      <Outlet /> 
    </div>
  );
}

export default App;
