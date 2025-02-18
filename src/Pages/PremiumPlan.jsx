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
import PaymentServices from "../Services/PaymentServices/PaymentServices";

const PremiumPlan = () => {
  const nav = useNavigate();
  const user_id = StorageHelper?.getUserData()?._id;
  const sectionRef = useRef(null);
  const queryClient = useQueryClient();
  const [purchase_discount, setPurchaseDiscount] = useState({
    coupon_code: null,
    discount_amount: null,
  });

  const submitPlan = ({ plan_id, class_id }) => {
    if (!user_id) {
      return nav("/login");
    }

    // console.log("plans", plan_id, user_id, class_id, purchase_discount);
    // return mutation.mutate({ plan_id, user_id });
  };
  const mutation = useMutation(
    (formdata) =>
      SubscriptionServices.user_subscription(formdata, {
        style: {
          border: "1px solid red",
        },
      }),
    {
      onError: (err) =>
        toast(err?.response?.data?.data?.message, {
          style: {
            border: "1px solid red",
          },
        }),
      onSuccess: (data) => {
        if (data?.data?.error) {
          toast(data?.data?.data?.message, {
            style: {
              border: "1px solid red",
            },
          });

          return false;
        }

        toast("Plan Purchased Successfully", {
          style: {
            border: "1px solid green",
          },
        });
        queryClient?.invalidateQueries("my-subscription");
        queryClient?.refetchQueries("my-subscription");
        setTimeout(() => {
          nav("/my-subscription");
        }, 2000);
      },
    }
  );

  // const orderMutation = useMutation(
  //   (formdata) => PaymentServices.CreateNewOrder(formdata),
  //   {
  //     onError: (err) =>
  //       toast(err?.response?.data?.data?.message, {
  //         style: {
  //           border: "1px solid red",
  //         },
  //       }),
  //     onSuccess: (data) => {
  //       if (data?.data?.error) {
  //         toast(data?.data?.data?.message, {
  //           style: {
  //             border: "1px solid red",
  //           },
  //         });

  //         return false;
  //       }

  //       toast("Plan Purchased Successfully", {
  //         style: {
  //           border: "1px solid green",
  //         },
  //       });
  //       queryClient?.invalidateQueries("my-subscription");
  //       queryClient?.refetchQueries("my-subscription");
  //       setTimeout(() => {
  //         nav("/my-subscription");
  //       }, 2000);
  //     },
  //   }
  // );

  // const plan_Activated = () => {
  //   toast("Plan Purchased Successfully", {
  //     style: {
  //       border: "1px solid green",
  //     },
  //   });
  //   setTimeout(() => {
  //     nav("/my-subscription");
  //   }, 2000);
  // };

  const { data: Plans, isLoading } = useQuery(
    ["my-plans"],
    () => Planservices.AllPlan(),
    {
      refetchOnMount: true,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err) =>
        toast(err?.response?.data?.data?.message, {
          style: {
            border: "1px solid red",
          },
        }),
      onSuccess: (data) => {},
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
        <div
          className="common-section pplan-section"
          style={{
            backgroundImage: `url(${MainBg})`,
          }}
        >
          <div className="row">
            {isLoading ? (
              <SkeletonLoader />
            ) : Plans?.data?.data?.plans.length == 0 ? (
              <p className="text-danger">No Plan found</p>
            ) : (
              Plans?.data?.data?.plans.map((each) => {
                return (
                  <div className="col-lg-4">
                    <div className="pplan-card">
                      <div className="pplan-img">
                        <img src={CardBg} alt="" />
                      </div>
                      <div className="pplan-class-name">
                        <h3>{each?.name}</h3>
                      </div>
                      <div className="pplan-claas-price">
                        <del>&#8377; {parseInt(each?.price) * 10}</del>
                        <h2>&#8377;{each?.price}</h2>
                      </div>
                      <div className="pplan-text text-center">
                        <h4>{each?.duration} days</h4>
                        <h3>
                          Class {each?.class_id?.className}{" "}
                          <p
                            className=""
                            style={{ fontSize: "20px", color: "#357f96" }}
                          >
                            (All Subjects)
                          </p>
                        </h3>
                        <button
                          className="btn common-btn"
                          onClick={(e) =>
                            submitPlan({
                              plan_id: each?._id,
                              class_id: each?.class_id?._id,
                            })
                          }
                        >
                          Buy Plan
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </main>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="pplan-modal modal-dialog">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{
                backgroundImage: `url(${ModalBg})`,
              }}
            >
              <h5 className="modal-title" id="exampleModalLabel">
                Apply code
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                <AiOutlineClose />
              </button>
            </div>
            <div className="modal-body">
              <form action="">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Code"
                  onChange={(e) =>
                    setPurchaseDiscount({
                      ...purchase_discount,
                      coupon_code: e.target.value,
                    })
                  }
                />
                <button className="btn btn-modal" data-bs-dismiss="modal">
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PremiumPlan;
