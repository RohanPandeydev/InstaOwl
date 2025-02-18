import React, { useContext, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Img1 from '../images/class-img1.jpg'
import Img2 from '../images/class-img2.jpg'
import Img3 from '../images/class-img3.jpg'
import Img4 from '../images/class-img4.jpg'
import { useMutation, useQuery } from '@tanstack/react-query'
import ClassService from '../Services/Classes/ClassService'
import { useParams } from 'react-router-dom'
import config from '../../config'
import Loader from '../Loader/Loader'
import ContentData, { ContentContext } from '../Context/Content'
import SkeletonLoader from '../Loader/Skeleton'
import DashBoardLayout from '../Helper/DashBoard'
import toast, { Toaster } from 'react-hot-toast'
export default function Subject() {
    const { id } = useParams()

    // //console.log(id,"IDDDDDD")
    const { data, isLoading, isError, error } = useQuery(
        ['subjects', id],
        () => ClassService.EachClass(id),
        { onSuccess: (data) => { }, onError: (err) => toast(err?.message) },
    )

    // alert(JSON.stringify(data))

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
<Toaster/>
        <section className="common-section" ref={sectionRef}>
            <div className="container" autoFocus={true}>
                <div className="course-head">
                   { data?.data?.subjects?.length? <h3>Class {data?.data?.className} / Subjects</h3>:<h3>Subjects</h3>}
                </div>
                <div className="classes-container" >
                    {isLoading ? (
                        <SkeletonLoader />
                    ) : (
                        <div className="row" autoFocus={true}>
                            {data?.data?.subjects?.length > 0 ? (
                                data?.data?.subjects?.map((ele) => {
                                    return (
                                        <div className="col-lg-3 col-md-6 col-sm-12">
                                            <Link to={`/class/${id}/subject/${ele?._id}/topic`} className="course-card">
                                                <div className="course-card-img">
                                                    <img
                                                        src={`${config.apiUrl}/images/${ele?.subjectImage}`}
                                                        alt=""
                                                    />
                                                </div>
                                                <div className="course-tittle">
                                                    <h4>{ele?.subjectName}</h4>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })
                            ) : (
                                <p className="text-danger">No Subject Found</p>
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
                    )}
                </div>
            </div>
        </section>
</>

    )
}
