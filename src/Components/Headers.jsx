import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import logo from "../images/logo.png";
// import { AiOutlineUser }  from 'react-icons/ai'
import { BsSearch } from "react-icons/bs";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContentContext } from "../Context/Content";
import StorageHelper from "../Auth/StorageHelper";
import toast, { Toaster } from "react-hot-toast";
import { CiUser } from "react-icons/ci";
import { useQuery } from "@tanstack/react-query";
import ClassService from "../Services/Classes/ClassService";
import Loader from "../Loader/Loader";
import { data } from "jquery";
import SearchService from "../Services/SearchService/SearchService";
import SearchSuggestion from "./SearchSuggestion";
import { NavLink } from "react-router-dom";

export default function Headers() {
  const token = StorageHelper.getToken();
  const nav = useNavigate();
  const [searchval, setSearchVal] = useState('')
  const [isBoxVisible, setBoxVisible] = useState(false);
  const boxRef = useRef(null);


  const { setUser_Data, user_Data, class_List ,} =
    useContext(ContentContext);


  const handleLogout = () => {
    StorageHelper.removeToken();
    toast("You have been Logged Out");
    setUser_Data({});
    return setTimeout(() => {
      return window.location.assign("/")
      // return  nav("/");
    }, 700);
  };
  //   //console.log("My Data", myClasses?.data);

  // const getSearchValue = () => {
  //   //console.log(
  //     "Search Value",
  //     searchref.current.value,
  //     searchtyperef?.current?.value
  //   );
  //   if (searchref.current.value == "" || searchtyperef?.current?.value == "") {
  //     return alert("Please Give Value For Search ");
  //   }

  //   nav(
  //     `/search/${searchref?.current?.value}/${searchtyperef?.current?.value}`
  //   );
  //   return;
  // };

  const handleChange = (e) => {
    e.preventDefault()
    //console.log(e?.target?.value)

    //console.log(",searchval.toString(16)", searchval.toString(16))
    setBoxVisible(true)
    setSearchVal(e?.target?.value)
  }






  const { data: searchResult, isLoading } = useQuery(
    ['search', searchval.toString(16)],
    () => SearchService?.Search(searchval),
    {
      onSuccess: (data) => {
        //console.log('gigi', data?.data)
        // setSuggestion_Value(data?.data?.data?.video)
      },
      enabled: !!searchval,
      onError: (err) => {
        //console.log(err?.response?.data?.message)
      }
    },
  )




  //Search Suggestion That Play
  const searchValue = useMemo(
    () => (isLoading ? false : searchResult?.data?.data?.videos),
    [isLoading, searchResult?.data?.data?.videos]
  );


  console.log("Suggestion",)










  ///Show Suggestion box 



  const handleBoxClick = () => {
    // Toggle the visibility of the box
    setBoxVisible(!isBoxVisible);
  };
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Check if the clicked element is outside the box
      if (boxRef.current && !boxRef.current.contains(event.target)) {
        setBoxVisible(false);
      }
    };

    // Add event listener for clicks outside the box
    document.addEventListener('mousedown', handleOutsideClick);

    // return () => {
    //   // Remove event listener when the component is unmounted
    //   document.removeEventListener('mousedown', handleOutsideClick);
    // };
  }, []);




  return (
    <>
      <Toaster />
      <header>
        <nav className="navbar navbar-expand-xl">
          <div className="container-fluid">
            <Link className="navbar-brand" to={"/"}>
              <img src={logo} alt="" className="img-fluid" />
            </Link>
            <div
              className="collapse navbar-collapse nav-menu"
              id="navbarScroll"
            >
              <ul className="navbar-nav navbar-nav-scroll  gap-3">
                <li className="nav-item">
                  <NavLink className="nav-link active" to={"/"} style={({ isActive }) => ({ color: isActive ? "#1A49A3" : "black" })}>
                    Home
                  </NavLink>
                  {/* <a className="nav-link active" href="index.html">Home </a> */}
                </li>

                <li className="nav-item">
                  {/* <div className="class-dropdown dropdown mt-2">
                    <button
                      className=" dropdown-toggle"
                      to={"/"}
                      role="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Classes
                    </button>

                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {
                        class_List?.map((each) => {
                          return (
                            <li className="nav-item nav-link">
                              {each?.className}

                            </li>
                          );
                        })
                        //   isLoading ? (
                        //     <Loader />
                        //   ) : class_List?.length == 0 ? (
                        //     <p className="text-danger">NO Class Added</p>
                        //   ) : (
                        //     class_List?.map((each) => {
                        //       return (
                        //         <li className="nav-item nav-link">
                        //            { each?.className} 

                        //         </li>
                        //       );
                        //     })
                        //   )
                      }
                    </ul>
                  </div> */}
                  <div className="dropdown">
                    <a
                      href="#"
                      className="nav-link dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Classes
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      {class_List.length > 0 ? (
                        class_List?.map((each) => {
                          return (
                            <li>
                              <NavLink style={({ isActive }) => ({ color: isActive ? "#1A49A3" : "black" })}
                                to={`/class/${each?._id}/subject`}
                                className="dropdown-item"
                              >
                                Class {each?.className}
                              </NavLink>
                            </li>
                          );
                        })
                      ) : (
                        <p className="text-danger">No Class Found</p>
                      )}
                    </ul>
                  </div>
                  {/* <div className="dropdown">
                    <button
                      className="btn nav-icon-cart dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <CiUser />
                    </button>
                    <div
                      className="dropdown-menu pt-0"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <Link to={"/"} className="dropdown-menu-head">
                        <div className="user-name">
                          <CiUser className="user-icon" />
                          <h5>Guest</h5>
                        </div>
                        <IoIosArrowForward />
                      </Link>
                      <ul>
                        <li>
                          <Link className="dropdown-item" to="/watchlist">
                            My Watchlist
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/my-subscription">
                            My Subscription
                          </Link>
                        </li>
                        <li>
                          <Link className="dropdown-item" to="/">
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div> */}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/blogs" style={({ isActive }) => ({ color: isActive ? "#1A49A3" : "black" })}>
                    Blog
                  </NavLink>
                  {/* <a className="nav-link" href="blog.html">Blog</a> */}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact" style={({ isActive }) => ({ color: isActive ? "#1A49A3" : "black" })}>
                    Contact
                  </NavLink>
                  {/* <a className="nav-link" href="contact.html">Contact</a> */}
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link active" to={"/premium-plan"} style={({ isActive }) => ({ color: isActive ? "#1A49A3" : "black" })}>
                    Plans
                  </NavLink>
                  {/* <a className="nav-link active" href="index.html">Home </a> */}
                </li>
              </ul>
            </div>
            <div className="head-form">
              <div className="form-search">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search by Subject, Topic, Video"
                  value={searchval}
                  onChange={handleChange}
                  onClick={handleBoxClick}
                  defaultValue={""}
                />

                {/* <button
                  type="button"
                  className="btn search-btn"
                  onClick={handleChange}
                >
                  <BsSearch />
                </button> */}
              </div>
              <SearchSuggestion isLoading={isLoading} data={searchValue ? searchValue : []} searchval={searchval} isBoxVisible={isBoxVisible} boxRef={boxRef} />
            </div>

            <div className="head-brand-menu d-flex align-items-center gap-3">
              <ul className="nav-icons">
                {token && (
                  <li>
                    {/* <a href="javscript.void(0)" className="nav-icon-cart">
                                        <CiUser />
                                    </a> */}
                    <div className="dropdown">
                      <button
                        className="btn nav-icon-cart dropdown-toggle"
                        type="button"
                        id="dropdownMenuButton1"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <CiUser />
                      </button>

                      <div
                        className="dropdown-menu pt-0"
                        aria-labelledby="dropdownMenuButton1"
                      >
                        <Link to={"/"} className="dropdown-menu-head">
                          <div className="user-name">
                            <CiUser className="user-icon" />
                            <h5>{user_Data?.username}</h5>
                          </div>
                          <IoIosArrowForward />
                        </Link>
                        <ul>
                          <li>
                            <Link className="dropdown-item" to="/watchlist">
                              My Watchlist
                            </Link>
                          </li>
                          <li>
                            <Link className="dropdown-item" to="/my-subscription">
                              My Subscription
                            </Link>
                          </li>

                          <li>
                            <Link className="dropdown-item" onClick={handleLogout}>
                              Logout
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                )}

                {!token && (
                  <>
                    <li>
                      <Link to="/login" className="btn common-btn-two">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link to="/register" className="btn common-btn">
                        Enroll Now
                      </Link>
                    </li>
                  </>
                )}
              </ul>
              <button
                className="navbar-toggler ms-sm-3 ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarScroll"
                aria-controls="navbarScroll"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
