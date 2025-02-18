import React, { useContext, useEffect, useState } from "react";
import logo from "../images/logo.png";
import background from "../images/login-bg.jpg";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import { RegisterUserDetails } from "../Validation/Validation";
import { ContentContext } from "../Context/Content";
import { useMutation } from "@tanstack/react-query";
import AuthService from "../Services/Auth/AuthService";
import toast, { Toaster } from "react-hot-toast";
import UserServices from "../Services/User/UserServices";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RegisterDetails = () => {
  const customStyles = {
    // Customize the year select arrows color
    ".react-datepicker__year-select-arrow": {
      borderLeftColor: 'red', // Change to your desired color
    },
  };
  const { user_Data, setUser_Data } = useContext(ContentContext);
  const nav = useNavigate();
  const [startDate, setStartDate] = useState(null);
  const { redirectURL } = useContext(ContentContext);

  const formik = useFormik({
    initialValues: {
      username: "",
      dateOfBirth: new Date(),
      // gender: '',
      is_completed: true,
    },
    validationSchema: RegisterUserDetails,
    onSubmit: (values, action) => {
      submitHandler(values);
    },
  });

  //console.log("user_Datauser_Datauser_Datauser_Datauser_Datauser_Data", user_Data)

  const userDetails = useMutation(
    (formData) => UserServices.UserUpdate(formData, user_Data?._id),
    {
      onSuccess: (data) => {
        //console.log('datagggggg', data?.data)
        localStorage.setItem(
          "insta_owl_user_details",
          JSON.stringify(data?.data)
        );
        setUser_Data(data?.data);

        toast("Profile Updated");

        if (!!redirectURL) {
          return setTimeout(() => nav(redirectURL), 2000);
        }
        setTimeout(() => {
          nav("/");
        }, 3000);
        return;
      },
      onError: (err) => {
        toast("relax we are working on it");

        setTimeout(() => {
          nav("/");
        }, 3000);
        return;
      },
    }
  );

  const submitHandler = (value) => {
    //console.log("Submit Handler", value)
    return userDetails.mutate(value);
  };

  const getDate = (date) => {
    // //console.log("ffff",date)
    setStartDate(date);
    formik.setFieldValue("dateOfBirth", date);
  };

  // //console.log('user_id',user_id)

  return (
    <>
      <Toaster />
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
          <form onSubmit={formik?.handleSubmit} className="login-form">
            <div className="login-form-head">
              <h3>Enter details</h3>
              <p>Enter a few details to complete your account</p>
            </div>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="login-input-box">
                  <input
                    type="text"
                    name="username"
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik.values.username}
                    placeholder="Enter a Name"
                    className="form-control"
                  />

                  {formik.touched.username && (
                    <p className="text-danger">{formik.errors.username}</p>
                  )}
                </div>
              </div>

              <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="login-input-box">
                  {/* <input
                    type="date"
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik.values.dateOfBirth}
                    name="dateOfBirth"
                   
                  /> */}

                  <DatePicker
                    className="form-control"
                    placeholderText="Select DOB"
                    showYearDropdown
                    dateFormat="dd/MM/yyyy"
                    selected={startDate}
                    onChange={(date) => getDate(date)}
                    maxDate={new Date()}
                    styles={customStyles}
                  />
                </div>
                {formik.touched.dateOfBirth && (
                  <p className="text-danger">{formik.errors.dateOfBirth}</p>
                )}
              </div>

              {/* <div className="col-lg-6 col-md-6 col-sm-12">
                <div className="login-input-box">
                  <select
                    className="form-select"
                    name="gender"
                    aria-label="Default select example"
                    onChange={formik?.handleChange}
                    onBlur={formik?.handleBlur}
                    value={formik.values.gender}
                  >
                    <option selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>

                  {formik.touched.gender && (
                    <p className="text-danger">{formik.errors.gender}</p>
                  )}
                </div>
              </div> */}

              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="login-btn">
                  <button type="submit" className="btn ">
                    Complete Profile
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterDetails;
