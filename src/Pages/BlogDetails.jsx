import React, { useEffect, useRef } from "react";

import parse from "html-react-parser";
import { FaUser } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";

import RecentBlogs from "../Components/RecentBlogs";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import BlogService from "../Services/Blog/BlogService";
import SkeletonLoader from "../Loader/Skeleton";
import config from "../../config";
import moment from "moment";
import blog_img from '../images/blog_img.jpeg'
import toast, { Toaster } from "react-hot-toast";

const BlogDetails = ({ blogData }) => {
    const { slug } = useParams();
    const nav = useNavigate()
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery(["blogdetails", slug], () =>
        BlogService?.blogDetails(slug), {
        onSuccess: (data) => {
            console.log("data?.data?.data?.post", data?.data?.data?.post)
            if (data?.data?.data?.post == null) {
                toast('Blog no longer exist')
                setTimeout(() => { nav(-1) }, 3000)
                return

            }
        },
        onError: (err) => {
            toast(err?.message, {
                style: {
                    border: "1px solid red",
                },
                onError: (err) => {
                    console.log(err)
                    toast(err?.response?.data?.data?.message)
                    // nav(-1)
                    queryClient.refetchQueries('blogs')
                    return
                }
            })
        }
    }
    );
    const { data: recent, isLoading: isLoad } = useQuery(
        ["blogs", slug],
        () => BlogService.allBlogs(),
        {
            // onSuccess:(data)=>{console.log("all blog-------->",data?.data)},
            onError: (err) => {
                toast(err?.message, {
                    style: {
                        border: "1px solid red",
                    },
                    onError: (err) => {
                        toast(err?.response?.data?.data?.message)
                        nav(-1)
                        queryClient.refetchQueries('blogs')
                        return
                    }
                })
            }
        }
    );

    const sectionRef = useRef(null);

    const scrollToSection = () => {
        //  sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 
        sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 

    };


    useEffect(() => {
        scrollToSection()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <Toaster />
            <main ref={sectionRef}>
                {/* <!-- Blog Details --> */}
                <section className="common-section">
                    {isLoading || isLoad ? (
                        <SkeletonLoader />
                    ) : (
                        <div className="container">
                            <div className="row">
                                {Object.keys(data?.data?.data?.post || []).length == 0 ? (
                                    <p className="text-danger">Blog no longer exist </p>
                                ) : (
                                    <div className="col-lg-8 col-md-12 col-sm-12 col-12">
                                        <div className="blog-dtl-box mb-3 mb-md-0">
                                            <div className="blog-img">
                                                <img
                                                    src={`${data?.data?.data?.post?.thumbnail ? config.apiUrl + "/images/" + data?.data?.data?.post?.thumbnail : blog_img}`}
                                                    alt=""
                                                />
                                            </div>
                                            <ul className="date-post">
                                                <li>
                                                    <FaUser /> {data?.data?.data?.post?.user?.username}{" "}
                                                </li>
                                                <li>
                                                    <SlCalender />{" "}
                                                    {moment(data?.data?.data?.post?.createdAt).format(
                                                        "ll"
                                                    )}
                                                </li>
                                            </ul>
                                            <div className="common-box">
                                                <h2 className="common-title">
                                                    {data?.data?.data?.post?.title}
                                                </h2>
                                                <div className="common-para mb-0 mt-3">
                                                    <p>{parse(data?.data?.data?.post?.content)}</p>
                                                    {/* <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos exercitationem quam? Inventore assumenda, debitis consequatur nesciunt tempore perferendis labore nam aliquam quod quis ratione iste fugiat deleniti ullam rem. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos  exercitationem quam? Inventore assumenda, debitis consequatur nesciunt tempore perferendis labore nam aliquam quod quis ratione iste fugiat deleniti ullam rem.</p>
                                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos exercitationem quam? Inventore assumenda, debitis consequatur nesciunt tempore perferendis labore nam aliquam quod quis ratione iste fugiat deleniti ullam rem.</p>
                                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa quos exercitationem quam? Inventore assumenda, debitis consequatur nesciunt tempore perferendis labore nam aliquam quod quis ratione iste fugiat deleniti ullam rem.</p> */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className="col-lg-4 col-md-12 col-sm-12 col-12">
                                    <div className="recent-post-box">
                                        <h5 className="recent-title">Recent Blogs</h5>
                                        <ul className="recent-post-list">
                                            {recent?.data?.data?.posts.length == 0 ? (
                                                <p className="text-danger">No Blog Found</p>
                                            ) : (
                                                recent?.data?.data?.posts.map((each) => {
                                                    return (
                                                        <li>
                                                            <RecentBlogs recentData={each} />
                                                        </li>
                                                    );
                                                })
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>

    );
};

export default BlogDetails;
