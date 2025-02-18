import React, { memo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiLoaderLine } from "react-icons/ri";
import gif from "../images/ZKZg.gif";
import config from "../../config";
const SearchSuggestion = ({
  data,
  boxRef,
  isBoxVisible,
  searchval,
  isLoading,
}) => {
  const nav = useNavigate();
  const getSearch = (cid, sid, tid, vid) => {
    sessionStorage.setItem("vid", vid);
    return nav(`/class/${cid}/subject/${sid?._id}/topic/${tid?._id}`);
  };
  if (isLoading) {
    return (
      <>
        {isBoxVisible && searchval && (
          <div
            ref={boxRef}
            className={`container searchresult  d-flex justify-content-center align-items-center`}
          >
            <img src={gif} height={50} width={50} />
          </div>
        )}
      </>
    );
  }

  if (!data.length) {
    return (
      <>
        {isBoxVisible && searchval && (
          <div
            ref={boxRef}
            className={`container searchresult  d-flex justify-content-center align-items-center`}
          >
            <p className="text-secondary">No data Found</p>
          </div>
        )}
      </>
    );
  }

  //console.log("isLoading", isLoading);

  return (
    <>
      {isBoxVisible && (
        <div ref={boxRef} className={`container searchresult `}>
          <ul>
            {data.length > 0 &&
              data?.map((ele) => {
                return (
                  <li
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      getSearch(ele?.class?._id, ele?.subject, ele?.topic, ele?._id)
                    }
                  >
                    <div className=" hoverme ">
                      <div className="text-box">

                        <h6 className="">{ele?.title}</h6>
                        <p className="text-secondary text-sm m-0 p-0">
                          {ele?.subject?.subjectName} -(Subject)
                        </p>
                        <p className="text-secondary text-sm m-0 p-0">
                          {ele?.topic?.topicName} - (Topic)
                        </p>
                      </div>
                      <div className="img-box">

                        <img style={{ height: '75px', }}
                          src={`${config.apiUrl}/images/${ele?.thumbnail}`}
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </>
  );
};

export default memo(SearchSuggestion);
