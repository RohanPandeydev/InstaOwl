import React from 'react'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import { FaPlay } from 'react-icons/fa'
import { BsShareFill } from 'react-icons/bs'
import BannerImg1 from '../images/banner.jpg'
// import BannerImg2 from '../images/banner-bg.png'
import { useEffect } from 'react'
// import {useQuery} from '@tanstack/react-query"'
import { useQuery } from '@tanstack/react-query'
import HomeServices from '../Services/Home/HomeServices'
import config from '../../config'
import Loader from '../Loader/Loader'
import SkeletonLoader from '../Loader/Skeleton'

export default function Banners() {
    const options = {
        // items: 2,
        margin: 10,
        center: true,
        nav: false,
        dots: false,
        loop: true,
        autoplay: false,
        autoplayTimeout: 5000,
        smartSpeed: 2500,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            767: {
                items: 1,
            },
            992: {
                items: 1,
            },
            1200: {
                items: 1.5,
            }
        }
    }

  const { data, isLoading, isError, error } = useQuery(['slider'], () =>
    HomeServices.Slider(),
  )

  useEffect(() => {
    //console.log(data, '--')
  }, [isLoading])

  if (isLoading) {
    return <SkeletonLoader/>
  }
  if (isError) {
    return <p className="text-danger">{error?.message}</p>
  }

  return (
    <section className="banner-section">
      <OwlCarousel className="owl-theme" {...options}>
        {data?.data?.length > 0? (
          data?.data?.map((ele) => {
            return (
              <div
                className="item bg-img"
                style={{
                  backgroundImage: `url(${config.apiUrl}/images/${ele?.bannerImg})`,
                }}
              >
                {/* <div className="banner-btn">
                  <button className="btn common-btn">
                    <FaPlay /> Watch
                  </button>
                  <button className="btn common-btn-two">
                    <BsShareFill /> Share
                  </button>
                </div> */}
              </div>
            )
          })
        ) : (
         ''
         )} 

        
      </OwlCarousel>
    </section>
  )



}
