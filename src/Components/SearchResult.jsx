import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import ClassService from '../Services/Classes/ClassService'
import SkeletonLoader from '../Loader/Skeleton'
import Headers from './Headers'
import Reviews from './Reviews'
import Footer from './Footer'
import SearchService from '../Services/SearchService/SearchService'
import { Link } from 'react-router-dom'
import config from '../../config'

const SearchResult = () => {
  const { txt, type } = useParams()
  const [categ, setCateg] = useState('')
  const [data, setData] = useState([])

  const { data: searchResult, isLoading } = useQuery(
    ['search', txt, type],
    () => SearchService?.Search(txt, type),
    {
      onSuccess: (data) => {
        // console.log(
        //   'gigi',
        //   ...Object.values(data?.data?.data),
        //   Object.keys(data?.data?.data).join(),
        // )
        setData(...Object.values(data?.data?.data))
        setCateg(Object.keys(data?.data?.data).join())
        // if(Object.keys(data?.data?.data).join()=='subjectResult'){

        // }
      },
    },
  )

  //console.log('SearchResult', searchResult?.data?.data)


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
     
   
        <section className="common-section" ref={sectionRef}>
          {
            isLoading?<SkeletonLoader/>: <div className="container">
            <div className="course-head">
              <h3>Search Result</h3>
            </div>
            <div className="classes-container">
              <div className="row">
                {categ == 'videoResult' ? (
                  data?.length > 0 ? (
                    data?.map((ele) => {
                      return (
                        <div className="col-lg-3 col-md-6 col-sm-12 m-5">
                          <div className="course-card">
                            <div className="course-tittle">
                              <h4>{ele?.title}</h4>
                            </div>
                              <Link
                                to={`/videodetails/${ele?.subject?._id}/${ele?.topic?._id}`}
                                className="course-card"
                              >
                            <div className="course-card-img">
                                <img
                                  style={{ cursor: 'pointer' }}
                                  src={`${config.apiUrl}/images/${ele?.thumbnail}`}
                                  alt=""
                                />
                            </div>
                              </Link>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-danger">No Video Found</p>
                  )
                ) : categ == 'topicResult' ? (
                 data?.length > 0 ? (
                   data?.map((ele) => {
                      return (
                        <div className="col-lg-3 col-md-6 col-sm-12 m-5">
                          <div className="course-card">
                            <div className="course-tittle">
                              <h4>{ele?.topicName}</h4>
                            </div>
                              <Link
                                to={`/class/subject/topic/${ele?._id}`}
                                className="course-card"
                              >
                            <div className="course-card-img">
                                <img
                                  style={{ cursor: 'pointer' }}
                                  src={`${config.apiUrl}/images/${ele?.topicImage}`}
                                  alt=""
                                />
                            </div>
                              </Link>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-danger">No Topic Found</p>
                  )
                ) : categ == 'subjectResult' ? (
                  data?.length > 0 ? (
                    data?.map((ele) => {
                      return (
                        <div className="col-lg-3 col-md-6 col-sm-12 m-5">
                          <div className="course-card">
                            <div className="course-tittle">
                              <h4>{ele?.subjectName}</h4>
                            </div>
                              <Link
                                to={`/class/subject/${ele?._id}`}
                                className="course-card"
                              >
                            <div className="course-card-img">
                                <img
                                  style={{ cursor: 'pointer' }}
                                  src={`${config.apiUrl}/images/${ele?.subjectImage}`}
                                  alt=""
                                />
                            </div>
                              </Link>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <p className="text-danger">No Subject Found</p>
                  )
                ) : null}
              </div>
            </div>
          </div>
          }
         
        </section>
      
  
    </>
  )
}

export default SearchResult
