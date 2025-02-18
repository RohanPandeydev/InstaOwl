import React, { useContext, useState } from "react";
import logo from "../images/logo.png";
import background from "../images/login-bg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import { UserEntranceValidation } from "../Validation/Validation";
import Otp from "../Components/Otp";
import AuthService from "../Services/Auth/AuthService";
import toast, { Toaster } from "react-hot-toast";
import StorageHelper from "../Auth/StorageHelper";
import { ContentContext } from "../Context/Content";

const Register = () => {
  const [toggle, setToggle] = useState(false);
  const nav = useNavigate();
  const [value, setValue] = useState("");
  const [details, setDetails] = useState("");
  const { setUser_Data, redirectURL } = useContext(ContentContext);
  const [toggleOtp, setToggleOtp] = useState(false);
  const [toggleMsz, setToggleMsz] = useState(false);

  const checkCheckbox = (e) => {
    const { checked } = e.target;
    if (checked) {
      setToggle(true);
      return;
    }

    setToggle(false);
  };
  const formik = useFormik({
    initialValues: { details: "" },
    // validationSchema: UserEntranceValidation,
    onSubmit: (values, action) => {
      submitHandler(values);

      return;
    },
  });

  const submitHandler = (value) => {
    //console.log('My Value', value)
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Phone number validation using regex
    const phoneRegex = /^\d{10}$/;

    if (!emailRegex.test(value?.details) && !phoneRegex.test(value?.details)) {
      // Valid email or phone number, you can proceed with your logic
      console.log("Valid input:", value?.details);
      return formik.setFieldError(
        "details",
        "please provide valid email or phone number"
      );
    }
    if (!toggle) {
      toast("Please agree our Terms&Conditions");
      return;
    }

    setDetails(value?.details);
    setToggleMsz(true);

    return send_Otp.mutate({ email: value?.details.toLowerCase() });
  };

  const submitOtp = (e) => {
    e.preventDefault();
    if (value.length < 3) {
      return toast("Please Fill Otp");
    }
    const password = value;

    return checkOtp.mutate({ email: details.toLowerCase(), password });
  };
  //It Will Send OTP to Registered Mail
  const send_Otp = useMutation((formdata) => AuthService.Otp(formdata), {
    onSuccess: (data) => {
      toast(data?.data?.message, {
        style: {
          border: "1px solid green",
        },
      });

      setToggleMsz(false);
      setToggleOtp(true);

      //console.log('data--< Otp', data)
    },
    onError: (err) => {
      setToggleMsz(false);

      console.log("err?.response?.data", err?.response?.data);
      return toast(err?.response?.data?.message, {
        style: {
          border: "1px solid red",
        },
      });
    },
  });

  //It Will Check OTP  of Registered Mail
  const checkOtp = useMutation((formData) => AuthService.Login(formData), {
    onSuccess: (data) => {
      //console.log('My Datafdsfdsfsd', data)
      StorageHelper.setToken(data?.data?.authToken);
      localStorage.setItem(
        "insta_owl_user_details",
        JSON.stringify(data?.data?.data?.user)
      );
      setUser_Data(data?.data?.data?.user);
      toast("Thank You..", {
        style: {
          border: "1px solid green",
        },
      });

      if (data?.data?.data?.user?.is_completed) {
        if (!!redirectURL) {
          return setTimeout(() => nav(redirectURL), 2000);
        }
        return setTimeout(() => nav("/"), 2000);
      } else {
        toast("Please Complete Profile");
        return setTimeout(() => nav("/registerdetails"), 1000);
      }
    },
    onError: (err) => {
      // console.log('My Data', err?.response?.data?.message)
      toast(err?.response?.data?.error, {
        style: {
          border: "1px solid red",
        },
      });
      return;
    },
  });

  return (
    <>
      <Toaster />
      {toggleOtp ? (
        <Otp value={value} setValue={setValue} submitOtp={submitOtp} />
      ) : (
        <div
          className="login-section"
          style={{ backgroundImage: `url(${background})` }}
        >
          <div className="login-container">
            <div className="login-logo">
              <Link to={"/"}>
                <img src={logo} alt="" className="img-fluid" />
              </Link>
            </div>
            <form onSubmit={formik.handleSubmit} className="login-form">
              <div className="login-form-head">
                <h3>Create a new account</h3>
                <p>
                  Login to continue enjoying uninterrupted video and
                  personalised experience.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="login-input-box">
                    <input
                      type="text"
                      name="details"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.details}
                      className="form-control"
                      placeholder="Email or Phone Number"
                    />
                  </div>
                  {formik?.touched?.details && (
                    <p className="text-danger">{formik.errors?.details}</p>
                  )}
                </div>
                <div className="col-md-12 col-sm-12">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      onChange={checkCheckbox}
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      By proceding you agree to our{" "}
                      <span>Terms and Services</span> &{" "}
                      <span>Privacy Policy</span>
                    </label>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="login-btn">
                    <button type="submit" disabled={toggleMsz} className="btn ">
                      {toggleMsz ? "Sending OTP" : "Create Account"}
                    </button>
                  </div>
                </div>
              </div>
              <div className="login-form-footer">
                <p>
                  Don't have an account? <Link to="/login">Login</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
