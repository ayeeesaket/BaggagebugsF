import React, { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "../../styles/LandingPage.css";
import { TbArrowBack } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import { GiWorld, GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { ProductionApi, LocalApi } from "../../../utills";
const Onboardingpage = () => {
  const [count, setCount] = useState(5);
  const [earnings, setEarnings] = useState(15);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => {
    if (count > 0) setCount((prev) => prev - 1);
  };
  const handleCalculate = () => {
    setEarnings(count * 3);
  };

  const navigate = useNavigate();
  const imgArr = Array(6).fill({ img: "/Tower.svg" });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <div className="custom-arrow-left absolute top-1/2 -translate-y-1/2 left-[-40px] z-10">
        <BsArrowLeftCircle className="text-4xl text-[#63C5DA] cursor-pointer hover:text-[#47a7bf] transition-all duration-300" />
      </div>
    ),
    nextArrow: (
      <div className="custom-arrow-right absolute top-1/2 -translate-y-1/2 right-[-40px] z-10">
        <BsArrowRightCircle className="text-4xl text-[#63C5DA] cursor-pointer hover:text-[#47a7bf] transition-all duration-300" />
      </div>
    ),
  };

  const reviewsArr = [
    { name: "Sophie Leone", review: "A Happy Customer", img: "/person.svg" },
    { name: "John Doe", review: "Great Service!", img: "/person.svg" },
    { name: "Jane Smith", review: "Highly Recommend!", img: "/person.svg" },
    { name: "Mark Johnson", review: "Very Satisfied!", img: "/person.svg" },
  ];

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <div className="custom-arrow-left">
        <BsArrowLeftCircle className="text-4xl text-[#63C5DA] cursor-pointer hover:text-[#47a7bf] transition-all duration-300" />
      </div>
    ),
    nextArrow: (
      <div className="custom-arrow-right">
        <BsArrowRightCircle className="text-4xl text-[#63C5DA] cursor-pointer hover:text-[#47a7bf] transition-all duration-300" />
      </div>
    ),
  };
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  useEffect(() => {
    console.log("logged in ? : ", isLoggedIn);
  }, []);
  const dispatch = useDispatch();
  const handleLogoutApi = async () => {
    try {
      const response = await axios.post(
        `${ProductionApi}/user/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      console.log("logged out");
      navigate("/");
      dispatch({ type: "login/login" });
    } catch (error) {
      console.log("error : ", error);
    }
  };

  return (
    <>
      <div className="page p-2 pl-15 pr-15">
        {/* Navbar */}
        <div className="navbar flex p-2 pl-15 pr-15 m-4 justify-between text-2xl">
          <div className="flex">
            <div className="logo-bag"></div>
            <div className="logo"></div>
          </div>
          <div className="nav-links flex gap-15">
            <div className="relative">
              <select className="appearance-none border-2 border-[#FA8128] rounded-lg p-2 pr-10 bg-white">
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
                <option value="de">German</option>
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <img src="/Dropdown.svg" alt="" className="w-7 h-7" />
              </div>
            </div>
            <div className="burger p-2">
              <GiHamburgerMenu
                size={35}
                color="#FA8128"
                onClick={() => {
                  if (isLoggedIn) navigate("/useroverview");
                  if (isPartner && isLoggedIn) navigate("/partneroverview");
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="page1 ml-56 -mt-12 h-screen w-full flex items-center justify-center">
          <div className="left1 -mr-20 w-[40%]"></div>

          <div className="right1 h-[60%] flex flex-col items-center justify-center text-center px-4">
            <h2 className="text-6xl mr-24 font-bold text-orange-400 mb-4">
              Earn money effortlessly!
            </h2>
            <p className="text-3xl text-right ml-10 text-cyan-500 mb-6">
              Life isn’t just about parcels
              <br />
              Why not boost your income by storing <br /> luggage?
            </p>
            <div className="w-full flex justify-end pr-44">
              <button
                className="bg-[#FA8128] w-72 b-z-[1] text-white font-semibold px-6 py-2 rounded-full shadow-md hover:bg-[#FA8128] transition border-5 border-[#FFA480] cursor-pointer"
                onClick={() => {
                  isLoggedIn ? handleLogoutApi() : navigate("/");
                  dispatch({ type: "partner/setIsPartner" });
                }}
              >
                Become a partner
              </button>
            </div>
          </div>
        </div>

        {/* Benefit Section */}
        <div className="w-full flex flex-wrap justify-between items-start p-10 gap-10">
          <h2 className="text-6xl overflow-y-hidden h-36 font-bold text-[#FA8128] mb-2">
            Storing luggage with Baggage Bugs is a total <br />
            <span className="text-cyan-500"> game-changer!</span>
          </h2>

          {/* Left Box */}
          <div className="border-2 border-l-white border-cyan-300 p-6 w-full md:w-[50%]">
            <div className="mt-8 space-y-6 text-left">
              <div>
                <p className="text-[#FA8128] font-semibold text-xl">
                  No costs, just cash!
                </p>
                <p className="text-cyan-500 font-extralight">
                  Keep 100% of the profits.
                </p>
              </div>
              <div>
                <p className="text-[#FA8128] font-semibold text-xl">
                  Money straight to your account
                </p>
                <p className="text-cyan-500 font-extralight">
                  Get paid every month hassle-free.
                </p>
              </div>
              <div>
                <p className="text-[#FA8128] font-semibold text-xl">
                  Get noticed!
                </p>
                <p className="text-cyan-500 font-extralight">
                  Let the world discover your business for free.
                </p>
              </div>
              <div>
                <p className="text-[#FA8128] font-semibold text-xl">
                  More bags, more bucks!
                </p>
                <p className="text-cyan-500 font-extralight">
                  Every customer is a potential buyer for you.
                </p>
              </div>
            </div>
          </div>

          {/* Right Box */}
          <div className="flex flex-col items-center justify-center w-full md:w-[40%] text-center">
            {/* Capacity Section */}
            <div className="flex items-center border border-cyan-500 rounded overflow-hidden mb-6">
              <div className="bg-white px-4 py-2 text-cyan-500 font-medium">
                Your capacity
              </div>
              <div className="bg-[#FA8128] text-white px-3 py-2 flex items-center gap-2">
                <div className="bg-[#FA8128] px-3 py-2 flex items-center gap-3">
                  <span
                    onClick={decrement}
                    className="cursor-pointer select-none"
                  >
                    ↓
                  </span>
                  <span className="text-lg font-semibold">{count}</span>
                  <span
                    onClick={increment}
                    className="cursor-pointer select-none"
                  >
                    ↑
                  </span>
                </div>
              </div>
            </div>

            {/* Earnings Section */}
            <p className="text-cyan-500 text-2xl font-medium">Upto</p>
            <p className="text-4xl font-bold text-[#FA8128] mb-1">
              {earnings} EUR/month
            </p>
            <a href="#" className="text-cyan-500 text-sm underline mb-6">
              How is this estimated?
            </a>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="bg-[#FA8128] text-white font-semibold px-8 py-3 text-lg rounded-full shadow-md hover:bg-[#FA8128] transition border-5 border-[#FFA480]"
            >
              Calculate
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboardingpage;
