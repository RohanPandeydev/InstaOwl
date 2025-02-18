import React from 'react'
import { Link } from 'react-router-dom';
import BlogImg from '../images/bd-img.png'
import parse from "html-react-parser";
import config from '../../config';

const RecentBlogs = ({ recentData }) => {
    return (
        <>
            <Link to={`/blog/details/${recentData?.slug}`} className="btn common-btn-two">
                <div className="recent-img-main">
                    <div className="recent-img">
                        <img src={`${config.apiUrl}/images/${recentData?.thumbnail}`} alt="" />
                    </div>
                </div>
                <div className="recent-text-box">
                <div className='txt-wrap-recent'>
                    <h4>{recentData?.title}</h4>
                    </div>
                    <div className='txt-wrap-recent'>
                        {parse(recentData?.content)}
                    </div>
                </div>
            </Link>
        </>
    )
}

export default RecentBlogs