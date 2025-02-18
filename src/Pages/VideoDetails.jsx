import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  useContext,
} from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { BiSolidCrown } from "react-icons/bi";
import { FaEye, FaShare } from "react-icons/fa";
import { RiPlayListAddFill } from "react-icons/ri";
import { FaPlay } from "react-icons/fa";
import bg from "../images/plan-bg.jpg";
import { AiOutlineClose } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import config from "../../config";
import SkeletonLoader from "../Loader/Skeleton";
import Headers from "../Components/Headers";
import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";
import { useMutation, useQuery } from "@tanstack/react-query";
import VideosService from "../Services/Videos/VideosService";
import StorageHelper from "../Auth/StorageHelper";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import { useQueryClient } from "@tanstack/react-query";
import Recommended_video from "../Components/Recommended_video";
import moment from "moment/moment";
import formatNumber from "../Helper/VideoViewCount";
import HlsPlayer from "../Components/HlsPlayer";
import convertSecondsToHMS from "../Helper/VideoScondcalculator";
import { ContentContext } from "../Context/Content";
import TimeAgo from "../Helper/TimeAgo";
// import secondsToHms from "../Helper/VideoScondcalculator";

var previewTime = 0;

const VideoDetails = () => {
  const { cid, sid, id } = useParams();
  const [toggleSocial, setToggleSocial] = useState(false);
  const user_id = StorageHelper?.getUserData()?._id;
  const myvide = sessionStorage.getItem("vid") || null;
  const [videoind, setvideoind] = useState(
    sessionStorage.getItem("current_video") || 0
  );
  const [toggleWatchList, setToggleWatchList] = useState(false);
  const [shareURL, setShareURL] = useState("");
  const userId = StorageHelper?.getUserData()?._id;
  const [total_time, setTotal_Time] = useState("");
  const [startTimeInSeconds, setStartTimeInSeconds] = useState(0);
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();
  const nav = useNavigate();
  const [v_Id, setVID] = useState();
  let [searchParams, setSearchParams] = useSearchParams();
  const videotoplay = searchParams.get("video");
  //It Change the Video Source
  const changeSource = (ind) => {
    setvideoind(ind);
    const params = new URLSearchParams(searchParams);
    // console.log("Search Params", params)

    // Delete the specified parameter
    params.delete("video");
    setSearchParams(params);
    // queryParams.set('video',)
    sessionStorage.clear("vid");
    sessionStorage.setItem("current_video", ind);
  };
  //Redirect To Plan Premium
  const handleDirect = () => {
    // const id = class_id;
    nav("/oneplan/" + cid);
  };

  //Get Video Link To Share
  const ShareList = () => {
    setToggleSocial(!toggleSocial);
    const URL_Link = window.location.href + "?video=" + v_Id;
    // console.log("URL", URL_Link)
    // const shareURL = URL_Link;
    setShareURL(URL_Link);
    return;
  };
  //Add video To WatchList
  const AddToList = () => {
    return WatchListed.mutate({
      user: userId,
      video: myData[videoind]?._id,
      total_time: Math.floor(total_time),
      is_watchlisted: true,
    });
  };

  //Video Fetch through  topic id
  const { data, isLoading } = useQuery(
    ["video-details", cid, sid, id],
    () => VideosService.Video(cid, sid, id),
    {
      refetchIntervalInBackground: false,
      refetchOnMount: false,
      refetchOnWindowFocus: false,

      onSuccess: (data) => {
        if (data?.data?.data?.video?.length == 0) {
          toast.error("Video Not Found", { delay: 10 });
          setTimeout(() => {
            nav(-1);
            return;
          }, 2000);
        }
        //console.log("Data", data, "data--->");
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    }
  );

  //All Video Respect of Topic
  const myData = useMemo(
    () => (isLoading ? false : data?.data?.data?.video),
    [data?.data?.data?.video, isLoading]
  );
  //Check Video is WatchListed OR Not and Setting last watchtime
  const { data: checkWatchList } = useQuery(
    ["watch-list", myvide, videoind],
    () =>
      VideosService?.isWatchListed(
        myvide == null ? myData[videoind]?._id : myvide
      ),
    {
      enabled:
        (data?.data?.data?.video?.length > 0 && !!myvide) ||
        (data?.data?.data?.video?.length > 0 && !!videoind),
      refetchOnWindowFocus: false,

      onSuccess: (data) => {
        setStartTimeInSeconds(parseInt(data?.data?.data?.watchtime?.duration));
        setToggleWatchList(!!data?.data?.data?.watchtime?.is_watchlisted);
      },
      onError: (err) => {
        toast.error(err?.message);
      },
    }
  );

  //Fetch Single Video by its Id
  const { data: EachVideo, isLoading: VideoLoad } = useQuery(
    ["each-video", myvide, videoind, cid, sid],
    () => {
      const v_id =
        videotoplay != null
          ? videotoplay
          : myvide == null
            ? myData[videoind]?._id
            : myvide;
      setVID(v_id);
      return VideosService.EachVideo(cid, sid, id, v_id, user_id);
    },
    {
      enabled:
        (data?.data?.data?.video?.length > 0 && !!myvide) ||
        (data?.data?.data?.video?.length > 0 && !!myData[videoind]),

      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchIntervalInBackground: false,
      refetchOnReconnect: false,
      retry: false,
      onSuccess: (data) => {
        // console.log("Each Video===========>", data?.data?.data);
        if (data?.data?.data?.message == "Video not found") {
          toast.error("Video Not Found", { delay: 10 });
          setTimeout(() => {
            nav("/");
            return;
          }, 2000);
        }

        // setClassId(data?.data?.data?.video?.class?._id);
        // setValidUser(() => (Number(data?.data?.validUser) > 0 ? true : false));
      },
      onError: (err) => {
        toast.error(err?.response?.data?.message || err?.message);
        return;
      },
    }
  );

  //Video That Play
  const singleVideo = useMemo(
    () => (VideoLoad ? false : EachVideo?.data?.data?.video),
    [EachVideo, videoind]
  );

  const validUser = useMemo(
    () => (VideoLoad ? false : EachVideo?.data?.validUser),
    [EachVideo, videoind]
  );
  const WatchTime = useMutation(
    (FormData) => VideosService.watchTime(FormData),
    {
      onSuccess: (data) => {
        //console.log("My WatchTime Data", data?.data);
        // toast('Added')
        // queryClient.refetchQueries("watch-list");
      },
      onError: (err) => {
        toast(err?.response?.data?.message);
      },
    }
  );

  const WatchListed = useMutation(
    (FormData) => VideosService.watchTime(FormData),
    {
      onSuccess: (data) => {
        // console.log("My WatchTime Data", data?.data);
        toast("Added");
        queryClient.refetchQueries("watch-list");
      },
      onError: (err) => {
        toast(err?.response?.data?.message);
      },
    }
  );

  //It Track Video Duration
  const handleTimeUpdate = useCallback(
    function (event) {
      // console.log("validUser", validUser);
      const currentTime = parseFloat(event.detail.plyr.currentTime.toFixed(2));
      // console.log(`Current time: ${currentTime} seconds`);
      // console.log(`Preview Time: ${previewTime} seconds`);

      if (parseInt(previewTime) < parseFloat(currentTime)) {
        if (currentTime >= 5 && !validUser) {
          previewTime = 5;
          event.detail.plyr.currentTime = 5;
          event.detail.plyr.pause();
          setToggle(true);
          return false;
        }

        if (!toggle && parseInt(previewTime) > 0) {
          WatchTime.mutate({
            user: userId,
            video: myData[videoind]?._id,
            duration: previewTime,
          });
        }
      }
      previewTime = currentTime;
    },
    [myData, validUser, userId, previewTime]
  );

  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    // console.log("Location",queryParams.get('video'));

    scrollToSection();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // console.log("validUser", validUser);
  // console.log("EachVideo", Number(EachVideo?.data?.validUser))

  useEffect(() => {
    // setRedirectURL(window.location.href)
    console.warn("Mount");
  }, [myvide, id]);

  return (
    <>
      <Toaster />

      <section className="common-section" ref={sectionRef}>
        {VideoLoad || isLoading ? (
          <SkeletonLoader />
        ) : (
          <div className="container-fluid">
            {singleVideo.length == 0 || myData.length == 0 ? (
              <p className="text-danger">No Video / Topic Found</p>
            ) : (
              <div className="row">
                <div className="col-xl-8 col-lg-8 col-md-7 col-sm-12">
                  <div className="video-section-left">
                    <div className="player-wrapper">
                      <HlsPlayer
                        source={config.s3url(singleVideo?.video)}
                        duration={startTimeInSeconds || 0}
                        poster={
                          singleVideo?.thumbnail
                            ? `${config.apiUrl}/images/${singleVideo?.thumbnail}`
                            : config.s3urlThumbnail(singleVideo?.video)
                        }
                        handleTimeUpdate={handleTimeUpdate}
                      />
                    </div>
                    {EachVideo?.data?.validUser ? null : (
                      <div className="plan-container">
                        <div className="plan-left">
                          <h3>
                            Downloads, Originals & more! HD TV plan at ₹699/Year
                          </h3>
                        </div>
                        <div className="plan-btn">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            <BiSolidCrown />
                            Get Plan
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="video-details">
                      <h3>{singleVideo?.title}</h3>
                      <ul className="video-date">
                        <li> {moment(singleVideo?.createdAt).format("ll")}</li>
                        <li>
                          {convertSecondsToHMS(singleVideo?.duration || 0)}
                        </li>
                        <li>{singleVideo?.subject?.subjectName}</li>
                        <li>Class {singleVideo?.class?.className}</li>
                        <li>
                          {formatNumber(singleVideo?.views || 0)} views
                        </li>
                      </ul>
                      <ul className="video-share">
                        <li className="btn" onClick={ShareList}>
                          <FaShare />
                          {/* Share */}
                        </li>
                        {toggleSocial ? (
                          <div className="share-container">
                            <EmailShareButton
                              url={shareURL}
                              subject="Video Share"
                              body={""}
                              className="Demo__some-network__share-button"
                            >
                              <EmailIcon size={30} round />
                            </EmailShareButton>
                            <FacebookShareButton url={shareURL} quote={""}>
                              <FacebookIcon size={30} round />
                            </FacebookShareButton>

                            <TwitterShareButton url={shareURL} title={""}>
                              <TwitterIcon size={30} round />
                            </TwitterShareButton>

                            <WhatsappShareButton url={shareURL} title={""}>
                              <WhatsappIcon size={30} round />
                            </WhatsappShareButton>
                          </div>
                        ) : null}

                        <li
                          className={`btn  ${toggleWatchList ? "disabled" : null
                            }`}
                          onClick={AddToList}
                        >
                          <RiPlayListAddFill />
                          {/* Watchlist */}
                        </li>
                      </ul>
                      {/* <div className="video-lang">
                      <h4>Audio Languages : English</h4>
                    </div> */}
                      <div
                        className="accordion faq-accordion-box"
                        id="accordionExample"
                      >
                        {/* <div className="accordion-item">
                        <h2 className="accordion-header">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapseOne"
                            aria-expanded="true"
                            aria-controls="collapseOne"
                          >
                            About INSTA OWL
                          </button>
                        </h2>
                      </div> */}
                        <div className="accordion-item">
                          <h2 className="accordion-header">
                            <button
                              className="accordion-button"
                              type="button"
                              data-bs-toggle="collapse"
                              data-bs-target="#collapseTwo"
                              aria-expanded="false"
                              aria-controls="collapseTwo"
                            >
                              <small className="p-1 text-lowercase">{formatNumber(singleVideo?.views || 0)} views &nbsp;  {TimeAgo(singleVideo?.createdAt)}, </small>
                            </button>
                          </h2>
                          <div
                            id="collapseTwo"
                            className="accordion-collapse collapse show"
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>
                                {singleVideo?.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Recommended_video
                  changeSource={changeSource}
                  videoind={videoind}
                  myData={myData}
                />
              </div>
            )}
          </div>
        )}

        {/* Modal */}
        <div
          className={`modal fade${toggle ? "show" : ""}`}
          style={{ display: `${toggle ? "block" : "none"}` }}
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="video-details modal-dialog">
            <div className="modal-content">
              <div
                className="modal-header"
                style={{ backgroundImage: `url(${bg})` }}
              >
                <h5 className="modal-title" id="exampleModalLabel">
                  Upgrade Your Experience With Our Premium Subscription!
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setToggle(false)}
                >
                  <AiOutlineClose />
                </button>
              </div>
              <div className="modal-body">
                <button
                  type="button"
                  className="btn btn-modal"
                  data-bs-dismiss="modal"
                  onClick={handleDirect}
                >
                  <BiSolidCrown />
                  Buy premium plans
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VideoDetails;
