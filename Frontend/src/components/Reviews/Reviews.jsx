import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const navigate = useNavigate();
  const handleLogoClick = () => {
    navigate("/landingpage");
  };

  return (
    <div className="page-details px-6 sm:px-10 py-4 max-w-screen-xl mx-auto overflow-x-hidden">
      {/* NAVBAR */}
      <div className="navbar flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mb-6 text-base sm:text-lg">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div className="logo-bag"></div>
          <div className="logo"></div>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative w-40">
            <select className="appearance-none border-2 border-[#FA8128] rounded-lg p-2 pr-10 bg-white w-full">
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <img src="/Dropdown.svg" alt="" className="w-5 h-5" />
            </div>
          </div>
          <div className="burger p-2">
            <GiHamburgerMenu
              size={30}
              color="#FA8128"
              className="cursor-pointer"
              onClick={() => {
                navigate("/partneroverview");
              }}
            />
          </div>
        </div>
      </div>

      {/* TOP SECTION */}
      <div className="top-div w-full flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="text-div font-bold w-full md:w-auto">
          <div className="text-div-1   text-4xl sm:text-5xl mb-2">
            Reviews
          </div>
          <div className="text-div-2 text-2xl sm:text-3xl text-[#63C5DA]"></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <input
            className="w-full sm:w-60 border-2 border-[#63C5DA] rounded-[2rem] px-4 py-2 text-base sm:text-lg"
            placeholder="Search by reference"
          />

          <div className="relative w-full sm:w-40">
            <select className="appearance-none border-2 border-[#FA8128] rounded-lg p-2 pr-10 bg-white w-full text-base">
              <option value="en">Sort By</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <img src="/Dropdown.svg" alt="Dropdown" className="w-5 h-5" />
            </div>
          </div>

          <div className="relative w-full sm:w-40">
            <select className="appearance-none border-2 border-[#FA8128] rounded-lg p-2 pr-10 bg-white w-full text-base">
              <option value="en">Date</option>
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <img src="/Dropdown.svg" alt="Dropdown" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className="bottom-div w-full mt-6">
        <div className="reviews-div border-2 border-[#63C5DA] p-4 rounded-md">
          {/* Top part */}
          <div className="reviews-top flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-gray-200   gap-2">
            <div className="name font-semibold text-lg">Pratham Karmarkar</div>
            <div className="booking-id text-sm md:text-base">
              Booking Id : 1234
            </div>
          </div>

          {/* Content */}
          <div className="luggage-name   font-medium text-lg mt-4">
            Luggage 001
          </div>
          <div className="address   text-sm md:text-base">
            Queens Maritoon, Melbourne
          </div>

          {/* Bottom Row */}
          <div className="reviews-bottom mt-4 flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
            <div className="flex flex-wrap gap-3">
              <div className="drop border-2 border-[#63C5DA] px-4 py-2 rounded-md text-sm   shadow-sm">
                drop off date
              </div>
              <div className="pickup border-2 border-[#63C5DA] px-4 py-2 rounded-md text-sm   shadow-sm">
                pickup date
              </div>
            </div>
            <button className="bg-[#FA8128] text-white px-6 py-2 rounded-3xl self-start lg:self-center">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
