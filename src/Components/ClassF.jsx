import React, { useContext, useEffect, useRef } from 'react'
import { Link } from "react-router-dom";
import Img1 from '../images/class-img1.jpg'
import Img2 from '../images/class-img2.jpg'
import Img3 from '../images/class-img3.jpg'
import Img4 from '../images/class-img4.jpg'
import ClassService from '../Services/Classes/ClassService';
import { useMutation, useQuery } from '@tanstack/react-query'
import config from '../../config';
import ContentData from '../Context/Content';
import SkeletonLoader from '../Loader/Skeleton';
import { FaPlay } from 'react-icons/fa'
import { BsShareFill } from 'react-icons/bs'
import toast, { Toaster } from 'react-hot-toast';
export default function ClassF() {


    const { data, isLoading, isError, error } = useQuery(['class'], () => ClassService.Classes(), {
        onSuccess: (data) => {
            //console.log(data,"-->------>")
        }, onError: (err) => {
            toast(err?.data?.data?.message, {
                style: {
                  border: "1px solid red",
                },
              })
            return true
        }
    })
    const sectionRef = useRef(null);

    const scrollToSection = () => {
         sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 
    };


    useEffect(() => {
        scrollToSection()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])







    //    alert("King")
    return (
        <>
          <Toaster />
        <div className='classes-container' ref={sectionRef}>

            <div className="row">
                {
                    isLoading ? <SkeletonLoader /> : data?.data?.map((ele) => {
                        return <div className="col-lg-3 col-md-6 col-6">
                            <Link to={`/class/${ele?._id}/subject`} className="course-card">
                                <div className="course-card-img">
                                    <img src={`${config.apiUrl}/images/${ele?.classImg}`} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Class {ele?.className}</h4>
                                </div>
                                {/* <div className='course-btn-grp'>
                                    <button className='btn common-btn me-2'><FaPlay /> Watch</button>
                                    <button className="btn common-btn-two"><BsShareFill /> Share</button>
                                </div> */}
                            </Link>
                        </div>


                    })
                }

                {/* <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img2} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 11</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img3} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 10</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img4} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 9</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img1} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 8</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img2} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 7</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img3} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 6</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img4} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 5</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img1} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 4</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img2} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 3</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img3} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 2</h4>
                        </div>
                    </Link>
                </div>
                <div className="col-lg-3 col-md-6 col-sm-12">
                    <Link to="subjects" className="course-card">
                        <div className="course-card-img">
                            <img src={Img4} alt="" />
                        </div>
                        <div className="course-tittle">
                            <h4>Class 1</h4>
                        </div>
                    </Link>
                </div> */}
            </div>
        </div>
        </>
    )
}

