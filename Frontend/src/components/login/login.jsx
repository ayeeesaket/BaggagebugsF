// Updated Login.js component with globe and map backgrounds
import React, { useState, useEffect } from "react";
import "../../styles/Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const GoogleIcon = () => <span className="googleimg"></span>;
const FacebookIcon = () => <span className="fbimg"></span>;
const StoreIcon = () => <span className="bimg"></span>;

const SocialButton = ({ icon, text }) => (
  <button className="flex items-center gap-10 p-3 w-full border border-[#28d3fa] bg-white max-w-xs rounded-lg text-[#FA8128] transition">
    {icon} {text}
  </button>
);

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => navigate("/register");
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("Redux isLoggedIn changed:", isLoggedIn);
  }, [isLoggedIn]);
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const response = await axios.post(
        "https://baggagebugs-81tp.onrender.com/api/v1/user/login",
        { email, password },
        {
          withCredentials: true, // ✅ REQUIRED to send cookies
        }
      );
      if (response.data.success) {
        // navigate("/landingpage", { state: { isLoggedIn: true } });
        dispatch({ type: "login/login" });
        navigate("/landingpage");
      }
      console.log(response.data);
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during login."
      );
    }
  };

  return (
    <div className="login-main flex h-screen w-full">
      {/* LEFT SIDE */}
      <div className="left-pane w-[30%] h-full relative bg-[#FA8128] flex items-center justify-center overflow-hidden">
        <div className="globeimg absolute top-10 left-0 w-[60%] h-[60%] opacity-50 z-0" />
        <div className="passport-img absolute z-10" />
      </div>

      {/* RIGHT SIDE */}
      <div className="right-pane w-[70%] bg-[#fefefe] relative flex items-start justify-start p-10 overflow-hidden">
        <div className="map absolute top-0 left-0 w-full h-full opacity-70 z-0" />
        <div className="map-wrapper w-full max-w-xl relative z-10">
          {/* Header */}
          <div className="flex justify-between items-start mb-10 w-full">
            <h1 className="text-4xl font-medium">
              <span className="text-[#FA8128]">Hello, </span>
              <span className="text-[#28d3fa]">bagpacker</span>
            </h1>
            <button
              onClick={() => navigate("/landingpage")}
              className="text-3xl text-[#FA8128] ml-auto"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <h2 className="text-2xl text-[#63C5DA] mb-2">Login</h2>
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-[300px] p-2 rounded-lg border-2 border-[#63C5DA] placeholder-[#F8934A] text-gray-700 focus:ring-2 focus:ring-[#FA8128] outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-[300px] p-2 rounded-lg border-2 border-[#63C5DA] placeholder-[#F8934A] text-gray-700 focus:ring-2 focus:ring-[#FA8128] outline-none"
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-[#63C5DA] underline cursor-pointer text-sm">
              Forgot password?
            </p>

            <button
              type="submit"
              className="bg-[#FA8128] cursor-pointer hover:bg-[#f77a20] text-white text-lg py-2 px-6 rounded-3xl w-full border-4 border-[#FFA480] mt-2 max-w-[300px]"
            >
              Login
            </button>

            <div className="flex space-x-1 ml-24">
              <p className="text-[#63C5DA] text-sm">no account?</p>
              <span
                onClick={handleRegister}
                className="underline text-[#FA8128] text-sm cursor-pointer"
              >
                Register
              </span>
            </div>
          </form>

          <div className="space-y-3 mt-6">
            <SocialButton icon={<GoogleIcon />} text="Continue with Google" />
            <SocialButton
              icon={<FacebookIcon />}
              text="Continue with Facebook"
            />
            <SocialButton icon={<StoreIcon />} text="Store Baggage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
