import React, { useEffect, useRef } from 'react'
import Headers from '../Components/Headers'
import WatchListBanner from '../Components/Inner-Banners/WatchListBanner'
import Reviews from '../Components/Reviews'
import Footer from '../Components/Footer'
import WatchedVideo from '../Components/WatchedVideo'

const WatchList = () => {
  const sectionRef = useRef(null);

  const scrollToSection = () => {
       sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 
  };


  useEffect(() => {
      scrollToSection()
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])  
  return (
    <>
      
        <main ref={sectionRef}>
            <WatchedVideo/>
        </main>

    </>
  )
}

export default WatchList