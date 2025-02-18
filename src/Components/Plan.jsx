import React from "react";
import CardBg from "../images/plan-bg.jpg";
import moment from "moment";

const Plan = ({ planPrice, standard, status, duration, started_at, ended_at, len,is_active }) => {
  const millisecondsInADay = 1000 *60*  60 * 24;

  return (
    <>
      <section className="common-section ">
        <div className="container">
          <div className="plan-section">
            {
              parseInt(len) == 0 ? <p className="text-danger">No subscription found</p> : <div className="row" style={{opacity:`${is_active?1:0.75}`}}>
                <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" >
                  <div className="plan-card">
                  {!is_active &&<p className="text-danger text-center">{!is_active?"Admin Deactivated your plan":null}</p>}

                    <div
                      className="plan-head"
                      style={{ backgroundImage: `url(${CardBg})` }}
                    >
                      <div className="plan-tittle">
                        <h3>{planPrice}</h3>
                        <span>For {duration} Days</span>
                      </div>
                      {/* <div className="paln-date">
                        <p>Date of Purchase: </p>
                        <span>{moment(started_at).format('ll')}</span>
                      </div> */}
                      <div className="paln-date">
                        <p>Expires on  </p>
                        <span>{moment(ended_at).format('ll')}</span>
                      </div>
                      
                    </div>
                    <div className="plan-footer">
                      <h3>Class {standard}</h3>
                      
                    </div>
                  </div>
                </div>
                <div className="col-xl-9 col-lg-8 col-md-6 col-sm-12">
                  <div className="plan-details">
                    <div className="plan-exp">

                      {/* <p className="text-success"> Your Package Will  Expired on {moment(ended_at).format('ll')}</p> */}
                      <p className="text-success"> Your Package Will  Expire after {Math.ceil((new Date(ended_at) - new Date())/millisecondsInADay) } days</p>
                      {/* <p className="text-success">&#8377;{planPrice} for {duration} Days</p> */}
{/*  */}
                    </div>
                    <ul className="plan-des-list">
                      <li>
                        <p>Status</p>
                        <span className={status == "Expired" ? "text-danger" : "active"}>
                          {status}
                        </span>
                      </li>
                      <li>
                        <p>Pack Country</p>
                        <span>India</span>
                      </li>
                      <li>
                        <p>Payment Mode</p>
                        <span>Debit Card</span>
                      </li>
                      <li>
                        <p>Auto Renewal</p>
                        <span>Yes</span>
                      </li>
                      <li>
                        <p>Renewal Date</p>
                        <span>{moment(ended_at).format('ll')}</span>
                      </li>
                    </ul>
                    <div className="plans-button">
                      {status == "Expired" ? (
                        <button className="btn">Renew Now</button>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            }

          </div>
        </div>
      </section>
    </>
  );
};

export default Plan;
