import React, { memo, useContext, useEffect } from "react";
import logo from "../images/logo.png";
import { GrFacebookOption } from "react-icons/gr";
import { BsTwitter } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { ContentContext } from "../Context/Content";
import { Link, useLocation } from "react-router-dom";

function Footer() {
  const { class_List } = useContext(ContentContext);
  const listOne =
    class_List?.length > 0
      ? class_List?.slice(0, Math.ceil(class_List.length / 2))
      : [];
  const listTwo =
    class_List?.length > 0
      ? class_List?.slice(Math.ceil(class_List.length / 2), class_List.length)
      : [];
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="footer-top">
          <div className="row">
            <div className="col-lg-3 col-md-12 col-sm-12 col-12">
              <div className="footer-box">
                <a className="navbar-brand-footer" href="/">
                  <img src={logo} alt="" className="img-fluid" />
                </a>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s
                </p>
                <ul className="footer-follow">
                  <li>
                    <a href="#">
                      <GrFacebookOption />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <BsTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <BsInstagram />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaLinkedinIn />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-12">
              <div className="footer-box">
                <div className="footer-box-head">
                  <div className="row">
                    <div className="col-md-6  col-6"><h5>CLASSES</h5></div>
                    <div className="col-md-6 col-6"><h5>CLASSES</h5></div>
                  </div>
               
                </div>
                <ul className="footer-list-first">
                  {class_List?.length == 0 ? (
                    null
                  ) : (
                    class_List.map((each) => {
                      return (
                        <li>
                          <Link to={`/class/${each?._id}/subject`}>
                            class {each?.className}
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div>
            {/* <div className="col-lg-3 col-md-6 col-sm-6 col-6">
              <div className="footer-box">
                <div className="footer-box-head">
                  <h5>CLASSES</h5>
                </div>
                <ul className="footer-list-first">
                  {listTwo?.length == 0 ? (
                    null
                  ) : (
                    listTwo.map((each) => {
                      return (
                        <li>
                          <Link to={`/class/${each?._id}/subject`}>
                            class {each?.className}
                          </Link>
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
            </div> */}
            <div className="col-lg-3 col-md-12 col-sm-6 col-6">
              <div className="footer-box">
                <div className="footer-box-head">
                  <h5>Pages</h5>
                </div>
                <ul className="footer-list ">
                  <li>
                    <a href="/">Home</a>
                  </li>
                  <li>
                    <a href="/blogs">Blog</a>
                  </li>
                  <li>
                    <a href="/contact">Contact</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-copyright">
          <p>Copyright © {new Date().getFullYear()}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
export default memo(Footer);
