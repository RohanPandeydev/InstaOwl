import React, { useEffect } from 'react'
import ClassF from '../Components/ClassF'
import CoursesSlider from '../Components/CoursesSlider'
import Headers from '../Components/Headers'
import Reviews from '../Components/Reviews'
import Footer from '../Components/Footer'
import DashBoardLayout from '../Helper/DashBoard'


export default function Videos() {


    // useEffect(()=>{
    //     sessionStorage.clear()
    // },[])
  return (
   
   
            <section className='common-section'>
                <div className="container">
                    <div className='btn-container'>
                        <div className="row">
                            <div className="col-lg-2 col-md-4 col-6">
                                <div className='pv-btn'>
                                    <button className='btn common-btn-two active'>VIDEO</button>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-6">
                                <div className='pv-btn'>
                                    <button className='btn common-btn-two'>VIDEO</button>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-6">
                                <div className='pv-btn'>
                                    <button className='btn common-btn-two'>VIDEO</button>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-6">
                                <div className='pv-btn'>
                                    <button className='btn common-btn-two'>VIDEO</button>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-6">
                                <div className='pv-btn'>
                                    <button className='btn common-btn-two'>VIDEO</button>
                                </div>
                            </div>
                            <div className="col-lg-2 col-md-4 col-6">
                                <div className='pv-btn'>
                                    <button className='btn common-btn-two'>VIDEO</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="course-english">
                        <div className="course-head">
                            <h3>Popular Video</h3>
                        </div>
                        <CoursesSlider />
                        <div className="course-head">
                            <h3>Class</h3>
                        </div>
                        <ClassF />
                    </div>
                </div>
            </section>

  )
}
