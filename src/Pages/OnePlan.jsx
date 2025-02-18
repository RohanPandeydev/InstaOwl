import React, { useEffect, useRef, useState } from "react";
import Headers from "../Components/Headers";
import Reviews from "../Components/Reviews";
import Footer from "../Components/Footer";
import PremiumPlansBanner from "../Components/Inner-Banners/PremiumPlansBanner";
import MainBg from "../images/inner-main-bg.jpg";
import CardBg from "../images/plan-img.png";
import ModalBg from "../images/pplan-modal-bg.png";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Planservices from "../Services/PlanServices/Planservices";
import SkeletonLoader from "../Loader/Skeleton";
import SubscriptionServices from "../Services/Subscription/SubscriptionServices";
import StorageHelper from "../Auth/StorageHelper";

const OnePlan = () => {
    const nav = useNavigate();
    const user_id = StorageHelper?.getUserData()?._id;
    const sectionRef = useRef(null);
    const queryClient=useQueryClient()
    const [purchase_discount, setPurchaseDiscount] = useState({
        coupon_code: null,
        discount_amount: null,
    });
    const { id } = useParams()

    const submitPlan = ({ plan_id, class_id }) => {

        console.log("plans", plan_id, user_id, class_id, purchase_discount);
        return mutation.mutate({ plan_id, user_id ,class_id});
    };
    const mutation = useMutation(
        (formdata) => SubscriptionServices.user_subscription(formdata),
        {
            onError: (err) =>    toast(err?.response?.data?.data?.message, {
                style: {
                  border: "1px solid red",
                },
              }),
            onSuccess: (data) => {
                console.log("Data?.data",data?.data?.data);
                if(data?.data?.error){
                    toast(data?.data?.data?.message, {
                      style: {
                        border: "1px solid red",
                      },
                    })
        
                    return false
                    
                  }

                toast("Plan Purchased Successfully", {
                    style: {
                        border: "1px solid green",
                    },
                });
                setTimeout(() => {
                    queryClient?.invalidateQueries('my-subscription')
                    queryClient?.refetchQueries('my-subscription')

                    nav("/my-subscription");
                }, 2000);
            },
        }
    );

    const plan_Activated = () => {
        toast("Plan Purchased Successfully", {
            style: {
                border: "1px solid green",
            },
        });
        setTimeout(() => {
            nav("/my-subscription");
        }, 2000);
    };

    const { data: Plan, isLoading } = useQuery(
        ["my-plan", id],
        () => Planservices.OnePlan(id),
        {
            refetchOnMount: false,
            refetchIntervalInBackground: false,
            refetchOnWindowFocus: false,
            onError: (err) => toast(err?.message, {
                style: {
                    border: "1px solid red",
                },
            }),
            onSuccess: (Plan) => {
                console.log(Plan?.data?.data?.plan)
            }
        }
    );

    const scrollToSection = () => {
        sectionRef.current.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToSection();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (
        <>
            <Toaster />

            <PremiumPlansBanner />
            <main ref={sectionRef}>
                {isLoading ? (
                    <SkeletonLoader />
                ) : Plan?.data?.data?.plan?.length == 0 ? (
                    <p className="text-danger">No Plan found</p>
                ) : (
                    <div
                        className="common-section pplan-section"
                        style={{
                            backgroundImage: `url(${MainBg})`,
                        }}
                    >
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="pplan-card">
                                    <div className="pplan-img">
                                        <img src={CardBg} alt="" />
                                    </div>
                                    <div className="pplan-class-name">
                                        <h3>{Plan?.data?.data?.plan[0]?.name}</h3>
                                    </div>
                                    <div className="pplan-claas-price">
                                        <del>&#8377; {parseInt(Plan?.data?.data?.plan[0]?.price) * 10}</del>
                                        <h2>&#8377;{Plan?.data?.data?.plan[0]?.price}</h2>
                                    </div>
                                    <div className="pplan-text">
                                        <h4>{Plan?.data?.data?.plan[0]?.duration} (days)</h4>
                                        <h3 >Class {Plan?.data?.data?.plan[0]?.class_id?.className} <p className="text-primary" style={{fontSize:'20px'}}>(All Subjects)</p></h3>
                                        <button
                                            className="btn common-btn"
                                            onClick={(e) =>
                                                submitPlan({
                                                    plan_id: Plan?.data?.data?.plan[0]?._id,
                                                    class_id: Plan?.data?.data?.plan[0]?.class_id?._id,
                                                })
                                            }
                                        >
                                            Buy Plan
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                )}
            </main>



        </>
    );
};

export default OnePlan;
