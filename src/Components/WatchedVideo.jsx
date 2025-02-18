import React from "react";
import WatchedVideoCard from "./WatchedVideoCard";
import Bg from "../images/inner-main-bg.jpg";
import StorageHelper from "../Auth/StorageHelper";
import VideosService from "../Services/Videos/VideosService";
import { useQuery } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";

const WatchedVideo = () => {
  const userId = StorageHelper.getUserData()?._id;

  const { data: myWatchList, isLoading } = useQuery(
    ["my-watchlist", userId],
    () => VideosService?.myWatchList(userId),
    {
      onSuccess: (data) => {
        console.log("Data===>",data?.data)
      },
      onError: (err) => {
        toast(err?.message);
      },
    }
  );

  //console.log("My Watch List", myWatchList?.data?.data?.watchtime);
  return (
    <>
      <Toaster />
      <section
        className="common-section"
        style={{
          backgroundImage: `url(${Bg})`,
        }}
      >
        <div className="container">
          <div className="row">
            {myWatchList?.data?.data?.watchtime?.length == 0 ? (
              <p className="text-danger  ">No Video Added</p>
            ) : (
              myWatchList?.data?.data?.watchtime?.map((each) => {
                if(each?.video==null || each?.video==''){
                  return   <p className="text-danger  ">Video Has Been Deleted By Admin</p>
                }
                return (
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <WatchedVideoCard videoData={each} />
                  </div>
                );
              })
            )}
            {/* <div className="col-lg-4">
                        <WatchedVideoCard/>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <WatchedVideoCard/>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <WatchedVideoCard/>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <WatchedVideoCard/>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <WatchedVideoCard/>
                    </div>
                    <div className="col-lg-4 col-md-6 col-sm-12">
                        <WatchedVideoCard/>
                    </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default WatchedVideo;
