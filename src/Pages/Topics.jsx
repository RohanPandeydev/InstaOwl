import React, { useContext, useEffect, useRef, useState } from 'react'
import Img1 from '../images/class-img1.jpg'
import Img2 from '../images/class-img2.jpg'
import Img3 from '../images/class-img3.jpg'
import Img4 from '../images/class-img4.jpg'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery } from '@tanstack/react-query'
import ClassService from '../Services/Classes/ClassService'
import config from '../../config'
import Loader from '../Loader/Loader'
import { ContentContext } from '../Context/Content'
import SkeletonLoader from '../Loader/Skeleton'
import DashBoardLayout from '../Helper/DashBoard'
import toast, { Toaster } from 'react-hot-toast'

export default function Topics() {
    const { sid, cid } = useParams()
    const [filteredArray, setFilteredArray] = useState([]);
    const { setRedirectURL } = useContext(ContentContext)

    const [topicData, setTopicData] = useState([])
    const nav = useNavigate()

    // const { data, isLoading, isError, error } = useQuery(['topics', sid], () =>
    //     ClassService.Topics(sid),
    //     {

    //         onSuccess: (data) => {
    //             // //console.log('MY Dat',data?.data)
    //             const filterOut = data?.data?.filter((ele) => ele?.subject?._id == sid)
    //             // alert("ngvfng")
    //             //console.log('MY Datfdhfjghjghjkgggjk',filterOut)
    //             setTopicData(filterOut)
    //             return
    //         },
    //         onError: (err) => {

    //             toast(err?.message, {
    //                 style: {
    //                     border: "1px solid red",
    //                 },
    //             })
    //             return true
    //         }


    //     }
    // )

    const handleRedirect = (id) => {
        sessionStorage.clear()
        // alert(id)
        console.log(cid, sid, id)
        setRedirectURL(`/class/${cid}/subject/${sid}/topic/${id}`)


        return nav(`/class/${cid}/subject/${sid}/topic/${id}`)
    }

    const sectionRef = useRef(null);

    const scrollToSection = () => {
         sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 
    };


    const { data: topicsData, isLoading: isLoad } = useQuery(['topicData', cid, sid], () => ClassService?.Topicbysubject(cid, sid), {
        onSuccess: (data) => {
            if (data?.data?.data?.error) {
                toast(data?.data?.data?.message, { style: { border: "1px solid red" } })
                return false;
            }
            const uniqueArray = data?.data?.data?.findVideoByTopic.filter((obj, index, self) =>
                index === self.findIndex((o) => o.topic._id === obj.topic._id)
            );

            // Update the state with the filtered array
            setFilteredArray(uniqueArray);
            // console.log("Data of topic---->", data?.data?.data?.findVideoByTopic)
            return true;

        },
        onError: (err) => {
            toast(err?.response?.data?.message, { style: { border: "1px solid red" } })
            return false;
        }
    })


    useEffect(() => {
        scrollToSection()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // alert(JSON.stringify(data))

    return (
        <>
            <Toaster />
            <section className="common-section" ref={sectionRef}>
                <div className="container">
                    <div className="course-head">
                        {
                            topicsData?.data?.data?.findVideoByTopic.length > 0 ? <h3> Class {topicsData?.data?.data?.findVideoByTopic[0]?.class?.className} / {topicsData?.data?.data?.findVideoByTopic[0]?.subject?.subjectName} / Topics</h3>
                                : <h3>Topics</h3>
                        }
                    </div>
                    <div className="classes-container">
                        <div className="row">
                            {isLoad ? <SkeletonLoader /> : topicsData?.data?.data?.findVideoByTopic.length > 0 ? (
                                filteredArray
                                    ?.map((ele) => {
                                        return (
                                            <div className="col-lg-3 col-md-6 col-sm-12">
                                                <div style={{ cursor: 'pointer' }} onClick={() => handleRedirect(ele?.topic?._id)} className="course-card">
                                                    <div className="course-card">
                                                        <div className="course-card-img">
                                                            <img
                                                                src={`${config.apiUrl}/images/${ele?.topic?.topicImage}`}
                                                                alt=""
                                                            />
                                                        </div>
                                                        <div className="course-tittle">
                                                            <h4>{ele?.topic?.topicName}</h4>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                            ) : (
                                <p className="text-danger">Topic Will  Add Soon</p>
                            )}

                            {/* <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img2} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Mensuration</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img3} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Application of Trigonometry</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img4} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Line segment and Acute Angle</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img1} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Math</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img2} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Mensuration</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img3} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Application of Trigonometry</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img4} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Line segment and Acute Angle</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img1} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Math</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img2} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Mensuration</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img3} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Application of Trigonometry</h4>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6 col-sm-12">
                            <div className="course-card">
                                <div className="course-card-img">
                                    <img src={Img4} alt="" />
                                </div>
                                <div className="course-tittle">
                                    <h4>Line segment and Acute Angle</h4>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </section>
        </>


    )
}
