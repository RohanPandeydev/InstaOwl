import React from 'react'
import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
import Img1 from '../images/course-eng-img1.png'
import Img2 from '../images/course-eng-img2.png'
import Img3 from '../images/course-eng-img3.png'
import Img4 from '../images/course-eng-img4.png'
import Img5 from '../images/course-eng-img5.png'
import { useQueries, useQuery } from '@tanstack/react-query'
import VideosService from '../Services/Videos/VideosService'
import SkeletonLoader from '../Loader/Skeleton'
import config from '../../config'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

export default function CoursesSlider() {
    const options = {
        margin: 10,
        nav: false,
        dots: false,
        loop: true,
        autoplayHoverPause: false,
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1.5,
            },
            767: {
                items: 2.5,
            },
            992: {
                items: 3.5,
            },
            1200: {
                items: 4.5,
            },
        },
    }

    const { data, isLoading } = useQuery(
        ['popular-video'],
        () => VideosService.PopularVideo(),
        {
            refetchOnWindowFocus:false,
            refetchOnReconnect:true,
            refetchIntervalInBackground:false,
            onSuccess: (data) => {
                //console.log('My Datavvvvv', data?.data?.data?.popularVideos)
            },
            onError: (err) => {
                toast(err?.message, {
                    style: {
                        border: "1px solid red",
                    },
                })
                
            },
        },
    )

    const nav=useNavigate()


    const getSearch = (tid, sid, vid) => {
        console.log("tid, sid, vidt",tid, sid, vid)
    
        sessionStorage.setItem('vid', vid)
        return true;
      }

    return (
        <>
        <Toaster/>
        <div className="course-slider">
            {isLoading ? (
                <SkeletonLoader />
            ) : (
                <OwlCarousel className="owl-theme" {...options}>
                    {data?.data?.data?.popularVideos.length > 0 ? (
                        data?.data?.data?.popularVideos.map((ele) => {
                            return (
                                <div className="item">
                                    <Link
                               
                                        to={`class/${ele?.class?._id}/subject/${ele?.subject?._id}/topic/${ele?.topic?._id}`}
                                    >
                                        <div className="course-card"  onClick={() => getSearch(ele?.topic, ele?.subject, ele?._id)}> 
                                            <div className="course-card-img">
                                                <img
                                                    src={`${config.apiUrl}/images/${ele?.thumbnail}`}
                                                    alt=""
                                                />
                                            </div>
                                            <div className="course-tittle">
                                                <h4>{ele?.title}</h4>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-danger">On the Way...</p>
                    )}

                    {/* <div className="item">
                    <div className="course-card">
                        <div className="course-card-img">
                            <img src={Img2} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Mastering the Tenses</h4>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="course-card">
                        <div className="course-card-img">
                            <img src={Img3} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Common Vocabulary Errors</h4>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="course-card">
                        <div className="course-card-img">
                            <img src={Img4} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Story Writing</h4>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="course-card">
                        <div className="course-card-img">
                            <img src={Img5} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Writing a Postcard</h4>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="course-card">
                        <div className="course-card-img">
                            <img src={Img1} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Learning Grammar</h4>
                        </div>
                    </div>
                </div> */}
                </OwlCarousel>
            )}
        </div>
        </>
    )
}
