import React, { useEffect, useRef, useState } from "react";
import BlogCard from "../Components/BlogCard";
import MainBg from "../images/contact-bg.png";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import BlogService from "../Services/Blog/BlogService";
import SkeletonLoader from "../Loader/Skeleton";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
// import ReactPaginate from "react-paginate";

const BlogList = () => {
    const { pageid } = useParams();
    const [page, setPage] = useState(1);

    const { data, isLoading } = useQuery(["blogs", pageid ? pageid : 1], () => BlogService?.allBlogs(pageid), { 
        onSuccess:(data)=>{
            console.log("dataBlog",data.data)
        },
        
        onError: (err) => toast(err?.message,{ style: {
        border: "1px solid red",
    },}) })
    const sectionRef = useRef(null);

    const scrollToSection = () => {
         sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 
    };


    useEffect(() => {
        scrollToSection()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        if (parseInt(pageid)) {
            setPage(parseInt(pageid))
        }
    }, [pageid]);

    //console.log("page", page)

    return (
        <>
            <Toaster />

            <main ref={sectionRef}>
                {
                    isLoading ? <SkeletonLoader /> : <section
                        className="common-section"
                        style={{
                            backgroundImage: `url(${MainBg})`,
                        }}
                    >
                        <div className="container">
                            <div className="row">
                                {data?.data?.data?.posts.length == 0 ? (
                                    <p className="text-danger">No Blog Found</p>
                                ) : (
                                    data?.data?.data?.posts?.map((each, i) => {
                                        return (
                                            <div key={i} className="col-lg-4 col-md-6 col-sm-12">
                                                <BlogCard blogData={each} />
                                            </div>
                                        );
                                    })
                                )}

                                {/*                          
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <BlogCard />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <BlogCard />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <BlogCard />
                            </div>
                            <div className="col-lg-4 col-md-6 col-sm-12">
                                <BlogCard />
                            </div> */}
                            </div>
                            {data?.data?.data?.pagination?.pageCount > 0 ? (
                                <nav aria-label="...">
                                    <ul className="pagination">
                                        <li className="page-item">
                                            {/* <a
                                                className="page-link"
                                                aria-disabled={page > 1 ? "false" : "true"}
                                                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                                            >
                                                <IoIosArrowBack />
                                            </a> */}
                                            <Link
                                                to={`/blogs/page/${Math.max(page - 1, 1)}`}
                                                className="btn common-btn-two"
                                            >
                                                <IoIosArrowBack />
                                            </Link>
                                        </li>
                                        {[...new Array(data?.data?.data?.pagination?.pageCount),].map((d, i) => {
                                            return (
                                                <li className="page-item" key={i} e>
                                                    {/* <a className="page-link" onClick={() => setPage(i + 1)}>
                                                        {i + 1}
                                                    </a> */}
                                                    <Link
                                                        to={`/blogs/page/${i + 1}`}
                                                        className="btn common-btn-two"
                                                    >
                                                        {i + 1}
                                                    </Link>
                                                </li>
                                            );
                                        })}
                                        <li className="page-item">
                                            {/* <a className="page-link"
                                                aria-disabled={data?.data?.data?.pagination?.pageCount <= page ? "true" : "false"}
                                                onClick={() => {
                                                    setPage((old) => Math.min(old + 1, data?.data?.data?.pagination?.pageCount))
                                                }}
                                            >
                                                <IoIosArrowForward />
                                            </a> */}
                                            <Link
                                                to={`/blogs/page/${Math.min(page + 1, parseInt(data?.data?.data?.pagination?.pageCount))}`}
                                                className="btn common-btn-two"
                                            >
                                                <IoIosArrowForward />
                                            </Link>
                                        </li>
                                    </ul>
                                </nav>
                            ) : null}

                            {/* <ReactPaginate
                                breakLabel="..."
                                nextLabel="next >"
                                // onPageChange={handlePageClick}
                                pageRangeDisplayed={5}
                                pageCount={10}
                                previousLabel="< previous"
                                renderOnZeroPageCount={null}
                            /> */}
                        </div>
                    </section>
                }

            </main>

        </>
    );
};

export default BlogList;
