import React from 'react'
import config from '../../config';
import { FaEye, FaPlay } from 'react-icons/fa';
import { BsShareFill } from 'react-icons/bs';
import convertSecondsToHMS from '../Helper/VideoScondcalculator';
import moment from 'moment';
import formatNumber from '../Helper/VideoViewCount';
import TimeAgo from '../Helper/TimeAgo';

const Recommended_video = ({ myData = [], changeSource, videoind }) => {
  // console.log("myData-==========>", myData)
  return (
    <div className="col-xl-4 col-lg-4 col-md-5 col-sm-12">
      <div className="video-section-right">
        {myData?.length == 0 ? (
          <p className="text-danger">Loading...</p>
        ) : (
          myData?.map((ele, ind) => {
            if (ind == videoind) {
              return null;
            }
            return (
              <div className="video-card ytbsec" onClick={() => changeSource(ind)}>
                <div>
                  <div
                    className="video-img"

                  >
                    <img
                      src={ele?.thumbnail ? `${config.apiUrl}/images/${ele?.thumbnail}` : config.s3urlThumbnail(ele?.video)}
                      alt=""
                    />
                  </div>
                </div>
                <div className="video-details-container">
                  <div className="video-details">
                    <h4>{ele?.title}</h4>
                    {/* <p>{ele?.subject?.subjectName}</p>
                    <h3>{ele?.topic?.topicName}</h3>
                      <p>Class {ele?.class?.className}</p>
                      <p> {moment(ele?.createdAt).format("ll")}</p>
                    */}
                  </div>
                  <div className="video-btn ">
                    <h6>{ele?.topic?.topicName}</h6>
                    <p className='desc-para'>{ele?.description}</p>
                   <div className='sub-txt'>
                   <span> {formatNumber(ele?.views || 0)} views </span> &nbsp;-&nbsp;
                    <span>  {TimeAgo(ele?.createdAt)} </span>
                   </div>
                    {/* <button className="btn common-btn">
                      <FaPlay /> Watch
                    </button>
                    <button className="btn common-btn-two">
                      <BsShareFill /> Share
                    </button> */}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  )
}

export default Recommended_video