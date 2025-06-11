import React, { useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useNavigate } from "react-router-dom";
import "../../styles/LandingPage.css";
import { TbArrowBack } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import { GiWorld } from "react-icons/gi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoIosSearch } from "react-icons/io";
import { BsArrowLeftCircle } from "react-icons/bs";
import { BsArrowRightCircle } from "react-icons/bs";
import { HiArrowNarrowRight } from "react-icons/hi";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";
const Onboardingpage = () => {
  const navigate = useNavigate();
  const imgArr = [
    {
      img: "/Tower.svg",
    },
    {
      img: "/Tower.svg",
    },
    {
      img: "/Tower.svg",
    },
    {
      img: "/Tower.svg",
    },
    {
      img: "/Tower.svg",
    },
    {
      img: "/Tower.svg",
    },
  ];
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
  return (
    <>
      <div className="page p-2 pl-15 pr-15">
        <div className="navbar flex p-2 pl-15 pr-15  m-4 justify-between text-2xl ">
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
                  if (isLoggedIn) {
                    navigate("/useroverview");
                  }
                  if (isPartner && isLoggedIn) {
                    navigate("/partneroverview");
                  }
                }}
                className="cursor-pointer"
              />
            </div>
          </div>
        </div>
        <div className="onboardingpage">
          <div className="flex ml-16 onboardingpage1 w-full h-screen justify-center lg:justify-start">
            <div
              onClick={() => navigate("/")}
              className="absolute bottom-36  w-80  right-24 text-white px-4 py-2 rounded-md cursor-pointer  transition"
            ></div>
          </div>
        </div>

        <div className="section-4 mt-45 flex flex-col items-center">
          <div className="text-[#63C5DA] text-[45px] font-bold text-center">
            <span className="text-[#FA8128]">Reviews </span>
            from our Backpackers
          </div>

          <Slider {...settings2} className="w-[80%]  mt-10  ">
            {reviewsArr.map((review, index) => (
              <div
                key={index}
                className="reviews h-[500px] w-[70%] p-5 flex justify-between items-center border-[#63C5DA] mt-5 mx-auto"
              >
                {/* Middle Content */}
                <div className="flex flex-[70%] border-2 border-[#63C5DA] p-5 px-10 text-center items-center rounded-lg shadow-md box-border w-full">
                  {/* Image Section */}
                  <div className="reviews-left flex-[35%] flex justify-center items-center">
                    <img
                      src={review.img}
                      alt="Person"
                      className="h-[80%] w-auto object-cover shadow-[-8px_-8px_10px_#FA8128,-8px_8px_10px_#FA8128]"
                    />
                  </div>
                  {/* Text Section */}
                  <div className="reviews-right flex-[65%] text-left pl-5">
                    <p className="text-2xl font-bold text-gray-700">
                      {review.name}
                    </p>
                    <p className="text-lg text-gray-500 mt-2">
                      {review.review}
                    </p>
                  </div>
                </div>

                {/* Right Arrow */}
              </div>
            ))}
          </Slider>
        </div>

        <div className="section-7 mt-25 mx-auto max-w-[90%]">
          <div className="text-[#FA8128] text-[45px] font-bold text-center ">
            Frequently <span className="text-[#63C5DA]">Asked Questions</span>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-8 text-center">
            <div className="p-4 border border-[#63C5DA] rounded-lg shadow-md bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-[#FA8128] font-semibold">
                  What is Baggage Bugs storage?
                </h3>
                <HiArrowNarrowRight className="text-[#63C5DA] text-2xl ml-2" />
              </div>
            </div>

            <div className="p-4 border border-[#63C5DA] rounded-lg shadow-md bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-[#FA8128] font-semibold">
                  How to book luggage storage?
                </h3>
                <HiArrowNarrowRight className="text-[#63C5DA] text-2xl ml-2" />
              </div>
            </div>

            <div className="p-4 border border-[#63C5DA] rounded-lg shadow-md bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-[#FA8128] font-semibold">
                  How much does luggage cost?
                </h3>
                <HiArrowNarrowRight className="text-[#63C5DA] text-2xl ml-2" />
              </div>
            </div>

            <div className="p-4 border border-[#63C5DA] rounded-lg shadow-md bg-white">
              <div className="flex items-center justify-between">
                <h3 className="text-lg text-[#FA8128] font-semibold">
                  Cost of 2 days of luggage?
                </h3>
                <HiArrowNarrowRight className="text-[#63C5DA] text-2xl ml-2" />
              </div>
            </div>
          </div>
        </div>

        <div className="section-9 mt-40 w-full pl-[7%]  pr-[4%]  flex h-[500px]">
          <div className="section-9-left w-[50%]   flex flex-col gap-5">
            <div className="leading-tight">
              <div className="text-[#FA8128] text-[70px] font-bold ">About</div>
              <div className="text-[#63C5DA] text-[70px] font-bold  ">
                Baggage Bugs
              </div>
            </div>
            <div className="flex items-center gap-2">
              <img src="/Rating.svg" alt="Star" className="w-8 h-8" />
              <img src="/Rating.svg" alt="Star" className="w-8 h-8" />
              <img src="/Rating.svg" alt="Star" className="w-8 h-8" />
              <img src="/Rating.svg" alt="Star" className="w-8 h-8" />
              <img src="/Rating.svg" alt="Star" className="w-8 h-8" />
            </div>
            <div className="leading-tight">
              <div className="text-[#63C5DA] text-[25px] ">
                5 star ratings by <span className="text-[#FA8128] ">2345+</span>{" "}
                verified{" "}
              </div>
              <div className="text-[#63C5DA] text-[25px] ">bag packers </div>
            </div>
            <div className="font-light text-[40px] flex gap-5">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/Instagram.svg"
                  alt="Instagram"
                  className="w-10 h-10"
                />
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/Facebook.svg" alt="Facebook" className="w-10 h-10" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/LinkedIn.svg" alt="LinkedIn" className="w-10 h-10" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src="/X.svg" alt="Twitter" className="w-10 h-10" />
              </a>
            </div>

            <div className="">
              <div className="text-[#FA8128] text-[25px]  ">Contact Us</div>
              <div className="text-[#63C5DA] text-[25px]  ">
                baggagebugs123@gmail.com
              </div>
              <div className="text-[#63C5DA] text-[25px]  ">
                +88 8373746498{" "}
              </div>
            </div>
          </div>
          <div className="section-9-right w-[50%]  text-[32px] text-[#63C5DA] flex flex-col justify-between">
            <div className="">
              <span className="text-[#FA8128] font-bold">Baggage Bugs</span> is
              a collaborative luggage storage network, partnering with trusted
              shops worldwide to provide a secure and convenient solution for
              travelers.
            </div>
            <div className="">
              <span className="text-[#FA8128] font-bold">
                Say goodbye to the hassle
              </span>{" "}
              of carrying heavy bags while exploring a new city.
            </div>
            <div className="">
              Your luggage will always have a
              <span className="text-[#FA8128] font-bold">safe place</span>,
              allowing you to enjoy your journey to the fullest!
            </div>
            <div className="mt-10">
              <button
                onClick={() => {
                  setIsPartner(true);
                  navigate("/partneroverview");
                }}
                className="bg-[#FA8128] text-white px-3 py-2 rounded-lg shadow-md hover:bg-[#f77a20] transition cursor-pointer"
              >
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboardingpage;
