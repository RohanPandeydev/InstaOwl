import React, { useContext, useEffect, useMemo, useState } from "react";
import Headers from "../Components/Headers";
import Footer from "../Components/Footer";
import Banners from "../Components/Banners";
import Reviews from "../Components/Reviews";
import { useMutation, useQuery } from "@tanstack/react-query";
import ClassService from "../Services/Classes/ClassService";
import { ContentContext } from "../Context/Content";
import { useLocation } from "react-router-dom";
import UserServices from "../Services/User/UserServices";
import toast from "react-hot-toast";

const DashBoardLayout = ({ children, banner }) => {

  const { setUser_Data, class_List, setClass_List, user_Data } = useContext(ContentContext);
  const [isWatching, setIsWatching] = useState(user_Data?.is_watching || false)
  let queryExecuted = localStorage.getItem('queryExecuted');
  const loc = useLocation()
  const regex = /class\/(.+?)\/subject\/(.+?)\/topic\/(.+)$/

  const { data: myClasses, isLoading } = useQuery(
    ["class"],
    async () => await ClassService.Classes(),
    {
      enabled: !!class_List,
      onSuccess: (data) => {
        //console.log("ClassService onSuccess", data)
        setClass_List(data?.data)
      },
      onError: (error) => {
        //console.log("ClassService onError", error)
      },
    }
  );


  const watchingMutate = useMutation(
    (formData) => UserServices.UserUpdate(formData, user_Data?._id),
    {
      onSuccess: (data) => {
        localStorage.setItem(
          "insta_owl_user_details",
          JSON.stringify(data?.data)
        );
        setUser_Data(data?.data);


        return;
      },
      onError: (err) => {
        toast("relax we are working on it");

        return;
      },
    }
  );

  ``
  useEffect(() => {
    const regexCheck = regex.test(loc.pathname)
    if (regexCheck != isWatching) {
      watchingMutate.mutate({ is_watching: regexCheck })
      setIsWatching(regexCheck)
      return
    }

  }, [loc.pathname])






  // const setClass_List = useMemo(() => myClasses?.data, [isLoading, myClasses]);
  // setClass_List(myAll_Class);

  return (
    <>
      <Headers />
      {banner}
      {children}
      <Reviews />
      <Footer />
    </>
  );
};

export default DashBoardLayout;
