import React, { useEffect, useRef } from "react";
import Headers from "../Components/Headers";
import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";
import MySubscriptionBanner from "../Components/Inner-Banners/MySubscriptionBanner";
import Plan from "../Components/Plan";
import MainBg from "../images/inner-main-bg.jpg";
import { useQuery } from "@tanstack/react-query";
import SubscriptionServices from "../Services/Subscription/SubscriptionServices";
import StorageHelper from "../Auth/StorageHelper";
import SkeletonLoader from "../Loader/Skeleton";
import toast from "react-hot-toast";
import { BiSolidCrown } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const MySubscription = () => {
  const sectionRef = useRef(null);
  const nav = useNavigate()


  const scrollToSection = () => {
     sectionRef.current.scrollIntoView({ behavior: 'smooth' }); 
  };

  const id = StorageHelper?.getUserData()?._id;


  const { data, isLoading } = useQuery(['my-subscription', id], () => SubscriptionServices.user_subscriptions(id), {
    refetchOnMount: false, refetchOnWindowFocus:false, enabled: !!id, onError: (err) => {

    }, onSuccess: (data) => {
      console.log("data subscription",data)

    }
  })


  useEffect(() => {
    scrollToSection()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <>
      <MySubscriptionBanner />
      <main>
        <div ref={sectionRef} style={{ backgroundImage: `url(${MainBg})` }}>
          {
            isLoading ? <SkeletonLoader /> : data?.data?.data?.subscription.length == 0?
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                <p className="text-danger">No Subscription Found</p>
                <div className="login-btn" style={{ width: '20%' }}> <button
                  type="button"
                  className="btn"
                  onClick={() => nav("/premium-plan")}
                >
                  <BiSolidCrown />
                  Buy premium plans
                </button></div></div> : data?.data?.data?.subscription.map((each) => {
                  return <Plan len={each.length} planPrice={each?.amount} is_active={each.is_active} standard={each?.plan?.class_id?.className} status={!!each?.expired_at ? "Expired" : "Active"}
                    duration={each?.duration}
                    started_at={each?.started_at}
                    ended_at={each?.ended_at}


                  />
                })

          }


        </div>
      </main>

    </>
  );
};

export default MySubscription;
