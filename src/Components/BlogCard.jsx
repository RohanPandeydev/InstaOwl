import React from "react";
import parse from 'html-react-parser';
import { Link } from "react-router-dom";
import config from "../../config";
import blog_img from '../images/blog_img.jpeg'

const BlogCard = ({ blogData }) => {

    console.log("blogData",blogData)
    const mystyle = {
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
        overflow: "hidden"
    };
    return (
        <>
            {/* <!-- Our Blog Section --> */}
            <div className="ob-card ">
                <div className="ob-img">
                    <img src={`   ${ blogData?.thumbnail? config.apiUrl+"/images/"+blogData?.thumbnail:blog_img
                        
                       }`} alt="" />
                </div>
                <div className="ob-card-text ">
                    <h4>{blogData?.title}</h4>
                    <div className="txt-wrap">

                    <p >{parse(blogData?.content)} </p>
                    </div>
                    <Link
                        to={`/blog/details/${blogData?.slug}`}
                        className="btn common-btn-two"
                    >
                        Read More
                    </Link>
                </div>
            </div>
        </>
    );
};

export default BlogCard;
