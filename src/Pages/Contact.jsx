import React, { useEffect, useRef } from "react";
import DashBoardLayout from "../Helper/DashBoard";
import ConatactBanner from "../Components/Inner-Banners/ConatactBanner";
import MainBg from "../images/contact-bg.png";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaFacebookF } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import { useFormik } from "formik";
import { ContactValidation } from "../Validation/Validation";
import { useMutation } from "@tanstack/react-query";
import ContactServices from "../Services/ContactService/ContactServices";
import toast, { Toaster } from "react-hot-toast";
import config from "../../config";

const Contact = () => {
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: ContactValidation,
    onSubmit: (values, action) => {
      submitHandler(values);
      action.resetForm();
    },
  });

  const submitHandler = (values) => {
    //console.log("Values", values)
    const obj = { firstName: values?.firstName.trim() };
    return mutation.mutate(values);
  };

  const mutation = useMutation(
    (formdata) => ContactServices.ContactFrom(formdata),
    {
      onSuccess: (data) => {
        //console.log("Data of Contact Form", data?.data)
        toast("Message sent successfully ", {
          style: {
            color: "#fff",
            background: " green",
          },
        });
      },
      onError: (err) => {
        toast(err?.message, {
          style: {
            color: "#fff",
            background: "red",
          },
        });
      },
    }
  );

  const sectionRef = useRef(null);

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
      <main ref={sectionRef}>
        {/* <!-- Contact Section --> */}
        <section
          className="contact-section common-section "
          style={{
            backgroundImage: `url(${MainBg})`,
          }}
        >
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12">
                <div className="form-head">
                  <h3>Send Me Message</h3>
                </div>
                <form onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 col-sm-12">
                      <div className="form-contact-box">
                        <input
                          type="text"
                          name="firstName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.firstName}
                          placeholder="Enter your first name"
                          className="form-control form-input"
                        />
                      </div>
                      {formik.touched?.firstName && (
                        <p className="text-danger">
                          {formik?.errors?.firstName}
                        </p>
                      )}
                    </div>
                    <div className="col-md-6 col-sm-12">
                      <div className="form-contact-box">
                        <input
                          type="text"
                          name="lastName"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.lastName}
                          placeholder="Enter your last name"
                          className="form-control form-input"
                        />
                      </div>
                      {formik.touched?.lastName && (
                        <p className="text-danger">
                          {formik?.errors?.lastName}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div className="form-contact-box">
                        <input
                          type="text"
                          name="phoneNumber"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.phoneNumber}
                          placeholder="Enter your phone  number"
                          className="form-control form-input"
                        />
                      </div>
                      {formik.touched?.phoneNumber && (
                        <p className="text-danger">
                          {formik?.errors?.phoneNumber}
                        </p>
                      )}
                    </div>
                    <div className="col-md-12 col-sm-12">
                      <div className="form-contact-box">
                        <input
                          type="text"
                          name="email"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.email}
                          placeholder="Enter your email"
                          className="form-control form-input"
                        />
                      </div>
                      {formik.touched?.email && (
                        <p className="text-danger">{formik?.errors?.email}</p>
                      )}
                    </div>
                    <div className="col-md-12 col-12">
                      <div className="form-contact-box">
                        <textarea
                          name="message"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.message}
                          id=""
                          rows="7"
                          placeholder="Message"
                          className="form-control form-input"
                        ></textarea>
                      </div>
                      Words: {formik.values.message.length} / 250
                      {formik.touched?.message && (
                        <p className="text-danger">{formik?.errors?.message}</p>
                      )}
                    </div>
                    <div className="contact-btn">
                      <button className="btn common-btn" type="submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="form-head">
                  <h3>Get In Touch</h3>
                </div>
                <ul className="contact-list">
                  <li>
                    <FaLocationDot className="loc" />
                    <a href="#">
                      <h4>Address</h4>
                      {/* <p>{config.address}</p> */}
                      <p>Wework Enam Sambhav, C20, G Block,</p>
                      <p>Bandra Kurla Comp, Bandra(East),</p>
                      <p>Mumbai - 400051, Maharashtra</p>
                    </a>
                  </li>
                  <li>
                    <IoCall className="call" />
                    <a href="#">
                      <h4>Phone</h4>
                      {/* <p>{config.phonenumber}</p> */}
                      <p>022 48808546</p>
                    </a>
                  </li>
                  <li>
                    <MdEmail className="email" />
                    <a href="#">
                      <h4>Email</h4>
                      <a href={'mailto:'+config.email}>{config.email}</a>
                    </a>
                  </li>
                </ul>
                <ul className="social-connect">
                  <li>
                    <a href={config.facebook}>
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href={config.instagram}>
                      <FaInstagram />
                    </a>
                  </li>
                  <li>
                    <a href={config.twitter}>
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href={config.linkdin}>
                      <FaLinkedin />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default Contact;
