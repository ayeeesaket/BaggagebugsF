import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Login.css";
import axios from "axios";
import { ProductionApi, LocalApi } from "../../../utills";
const Partneroverview = () => {
  const navigate = useNavigate();

  const GoogleIcon = () => <span className="googleimg"></span>;
  const FacebookIcon = () => <span className="fbimg"></span>;
  const StoreIcon = () => <span className="bimg"></span>;
  const ReviewsIcon = () => <span className="reviewimg"></span>;
  const StarIcon = () => <span className="starimg"></span>;
  const LogoutIcon = () => <span className="logoutimg"></span>;

  const SocialButton = ({ icon, text, onClick }) => (
    <button
      className="flex items-center gap-4 p-3 w-full border border-[#28d3fa] bg-white max-w-xs rounded-lg cursor-pointer  transition hover:shadow-md"
      onClick={onClick}
    >
      {icon} {text}
    </button>
  );

  const handleProfileClick = () => {
    navigate("/dashboard");
  };
  const handleSettingsClick = () => {};
  const handleBookingsClick = () => {
    navigate("/reservation");
  };
  const handleReviewsClick = () => {
    navigate("/reviews");
  };
  const handleAssistanceClick = () => {};
  const handleLogoutClick = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
      {/* Left Section */}
      <div className="w-[30%] h-full bg-[#FA8128] relative flex items-center justify-center overflow-hidden">
        <div className="logoimg absolute top-10 left-10 z-10"></div>
        <div className="globeimg absolute w-full h-full opacity-45 z-0"></div>
      </div>

      {/* Right Section */}
      <div className="w-[70%] h-full relative flex flex-col p-10 overflow-hidden bg-[#fefefe]">
        <div className="map absolute top-0 left-0 w-full h-full opacity-70 z-0"></div>

        <div className="relative z-10  pr-4  h-full">
          <div className="flex justify-between">
            <div className="flex gap-3 mb-4">
              <h1 className="text-[#FA8128] font-medium text-4xl">Hello,</h1>
              <h1 className="text-[#28d3fa] font-medium text-4xl">Partner</h1>
            </div>
            <div
              className="crossimg cursor-pointer"
              onClick={() => navigate("/landingpage")}
            ></div>
          </div>

          {/* Social Buttons */}

          {/* Button Grid */}
          <div className="grid grid-cols-2 gap-7 text-xl">
            <SocialButton
              icon={<GoogleIcon />}
              text="My Profile"
              onClick={handleProfileClick}
            />
            <SocialButton
              icon={<FacebookIcon />}
              text="Account Settings"
              onClick={handleSettingsClick}
            />
            <SocialButton
              icon={<StoreIcon />}
              text="My Bookings"
              onClick={handleBookingsClick}
            />
            <SocialButton
              icon={<ReviewsIcon />}
              text="My Reviews"
              onClick={handleReviewsClick}
            />
            <SocialButton
              icon={<StarIcon />}
              text="Assistance"
              onClick={handleAssistanceClick}
            />
            <SocialButton
              icon={<LogoutIcon />}
              text="Logout"
              onClick={handleLogoutClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partneroverview;
