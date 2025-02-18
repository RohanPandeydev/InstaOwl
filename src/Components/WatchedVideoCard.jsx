import React from "react";
import { CiPlay1 } from "react-icons/ci";
import config from "../../config";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import CalculateWatchedPercentage from "../Helper/ProgressCalculator";

const WatchedVideoCard = ({ videoData }) => {
    const { } = videoData;
    const nav = useNavigate();

    const getVideo = (data) => {
        sessionStorage.setItem('vid', data?.video?._id)

        nav(
            `/class/${data?.video?.class?._id}/subject/${data?.video?.subject?._id}/topic/${data?.video?.topic?._id}`
        );

        return true;

        // nav('/video')
    };

    const progressBar = CalculateWatchedPercentage(
        parseInt(videoData?.duration),
        parseInt(videoData?.video?.duration)
    );
    return (
        <>
            <div className="watched-video-card" onClick={() => getVideo(videoData)}>
                <div className="watched-video-img" style={{ cursor: 'pointer' }}>
                    <img
                        src={videoData?.video?.thumbnaisl ? `${config.apiUrl}/images/${videoData?.video?.thumbnail}` : config.s3urlThumbnail(videoData?.video?.video)
                        }
                        alt=""
                    />
                    <CiPlay1 className="play" />
                </div>
                <div className="watched-video-content">
                    <span>Class {videoData?.video?.class?.className}</span>
                    <h4>{videoData?.video?.topic?.topicName}</h4>
                    <div className="progress">
                        <div
                            className={`progress-bar`}
                            role="progressbar"
                            aria-valuenow={parseInt(progressBar)}
                            aria-valuemin="0"
                            aria-valuemax="100" style={{ width: parseInt(progressBar) + '%' }}
                        ></div>
                    </div>
                    <div className="watched-video-content-low">
                        <div className="watched-completed">
                            <p>
                                {CalculateWatchedPercentage(
                                    parseInt(videoData?.duration || 0),
                                    parseInt(videoData?.video?.duration || 0)
                                )}
                                % Completed
                            </p>
                        </div>

                    </div>
                </div>
                {/* </Link> */}
            </div>
        </>
    );
};

export default WatchedVideoCard;
