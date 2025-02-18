import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClassService from '../Services/Classes/ClassService'
import Loader from '../Loader/Loader'
import config from '../../config'
import SkeletonLoader from '../Loader/Skeleton'
import toast, { Toaster } from 'react-hot-toast'
import { Link } from 'react-router-dom'

const Video = () => {
  const { id } = useParams()
  const [editId, setEditId] = useState('')

  

  const { data, isLoading,  } = useQuery(['video', id], () =>
    ClassService.Video(id),{onError:(err)=>{toast(err?.message)}}
  )

  return (

    <>
    <Toaster/>
    {
      isLoading?<SkeletonLoader/>:   <section className="common-section">
      <div className="container">
        <div className="course-head">
          <h3>Video</h3>
        </div>
        <div className="classes-container">
          <div className="row">
            {data?.data?.data?.video?.length > 0 ? (
              data?.data?.data?.video.map((ele) => {
                return (
                  <div className="col-lg-3 col-md-6 col-sm-12 m-5">
                    <div className="course-card">
                      <div className="course-tittle">
                        <h4>{ele?.title}</h4>
                      </div>
                      <div className="course-card-img">

                        <Link to={`/videodetails/${ele?.subject?._id}/${ele?._id}`}>

                          <img style={{cursor:'pointer'}} 
                            src={`${config.apiUrl}/images/${ele?.thumbnail}`}
                            alt=""
                          />
                        </Link>
                   
                       
                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
              <p className="text-danger">Video Will Soon Add</p>
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

    }
 
    </>
  )
}

export default Video
