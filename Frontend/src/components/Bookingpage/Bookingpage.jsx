import React, { useState,  useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { IoIosSearch, IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/Bookingpage.css";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { useRef, useEffect } from "react";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GoogleApi } from "../../../utills";
import { ProductionApi, LocalApi } from "../../../utills";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { load } from "@cashfreepayments/cashfree-js";
import { v4 as uuidv4 } from 'uuid';

const Bookingpage = () => {
  // bringing the name of the page from landingpage
  const location = useLocation();
  const query = location.state.query || "";
  const isLoggedIn = useSelector((state) => state.login.isLoggedIn);

  
  // State variables
  const [sfdata, setsfdata] = useState([]);
  const [fcoord, setfcoord] = useState([]);
  const [distance1, setDistance1] = useState([]);
  const [fDuration, setfDuration] = useState("");
  const [fAddress, setfAddress] = useState("");
  const [fTiming, setfTiming] = useState("");
  const [center, setCenter] = useState({ lat: 41.3851, lng: 2.1734 });
  const [markerPositions, setMarkerPositions] = useState([]);
  const [destination, setDestination] = useState("");
  const [numberofbag, setNumberofBag] = useState(0);
  const [dropOffDate, setDropOffDate] = useState(new Date());
  const [pickUpDate, setPickUpDate] = useState(new Date());
  const [showDropOffCalendar, setShowDropOffCalendar] = useState(false);
  const [showPickUpCalendar, setShowPickUpCalendar] = useState(false);
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [facilities, setFacilities] = useState([]);
  const facilityId = useSelector((state) => state.facilityId);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [orderId, setOrderId] = useState(uuidv4());
  const[isverified,setisverified] = useState(false);
  // const [orderId, setOrderId] = useState("")
  const dispatch = useDispatch();
  //  New state for selected facility ID

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/landingpage");
    if (!isLoggedIn) {
      dispatch({ type: "login/login" });
    }
  };
console.log("your location is here",query);

  const containerStyle = {
    width: "100%",
    height:
      window.innerWidth < 768
        ? "250px"
        : window.innerWidth < 1024
        ? "400px"
        : "700px",
    maxWidth: "100vw",
    maxHeight: "80vh",
  };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GoogleApi,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    async (mapInstance) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      mapInstance.fitBounds(bounds);
      setMap(mapInstance);
      console.log("token in Bookingpage:", token);
      let i = 1;
      if (query) {
        if(i<1)
        {
        await handleSearchDestination();
      }}
    },

    [center]
  );

  const onUnmount = useCallback(() => setMap(null), []);
useEffect(() => {
  if (query) {
    setDestination(query);
    handleSearchDestination(query); // run only once with initial query
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setCenter({ lng: longitude, lat: latitude });
    });
  }, []);
  console.log("user ", center.lat, center.lng);

  const formatDate = (date) =>
    date instanceof Date ? date.toISOString().split("T")[0] : "";

  const handleSearchDestination = async (searchQuery) => {
  const searchTerm = searchQuery || destination;
  if (!searchTerm) return;

  try {
    const geoRes = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        searchTerm
        )}&key=${GoogleApi}` // Use GoogleApi from utills.js
      );
      const geoData = await geoRes.json();

      if (geoData.results.length) {
        const location = geoData.results[0].geometry.location;
        setCenter(location);

        const facilityRes = await axios.post(
          `${ProductionApi}/map/facilitiesBySearch`,
          { userCoordinates: [location.lng, location.lat] },

          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const fetchedFacilities = facilityRes.data.message;
        setFacilities(fetchedFacilities);

        // Collect coordinates for markers and fcoord state
        const coordsArray = [];
        const newMarkers = fetchedFacilities
          .map((facility) => {
            const coords = facility.geolocation?.coordinates;
            if (coords && coords.length === 2) {
              coordsArray.push(coords); // Collect for state
              return { lat: coords[1], lng: coords[0] };
            }
            return null;
          })
          .filter(Boolean);

        setfcoord(coordsArray); // Set once with all coordinates
        setMarkerPositions(newMarkers);
        console.log("hello", fcoord);
        for (let i = 0; i < coordsArray.length; i++) {
          console.log("Coordinates:", coordsArray[i]);
          try {
            console.log("idhar dekh bhai : ", location.lat, location.lng);
            const distance1 = await axios.post(
              `${ProductionApi}/map/facilitiesDistanceTime`,
              {
                userCoordinates: [location.lng, location.lat],
                facilityCoordinates: coordsArray[i], // coordsArray[i] is already an array
              },
              { withCredentials: true }, // optional third argument for cookies/auth
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const distanceData = distance1.data;
            setDistance1(distanceData);
            setfDuration(distance1.data.message.duration);
            console.log("time : ", distance1.data.message.duration);
            console.log("Distance Data:", distanceData);
            // console.log(distance1Data);?
          } catch (error) {
            console.error("Error setting coordinates:", error);
          }
        }

        console.log("Coords to be set in fcoord:", coordsArray);
        if (map && newMarkers.length > 0) {
          map.panTo(newMarkers[0]);
          map.setZoom(14);
        }
      } else {
        alert("Location not found.");
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };
  // console.log("Selected Facility ID12:",facilityId);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow:
      window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: true,
        },
      },
    ],
    prevArrow: (
      <div className="absolute -left-4 md:-left-8 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <BsArrowLeftCircle className="text-[#63C5DA] text-2xl md:text-4xl" />
      </div>
    ),
    nextArrow: (
      <div className="absolute -right-4 md:-right-8 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <BsArrowRightCircle className="text-[#63C5DA] text-2xl md:text-4xl" />
      </div>
    ),
  };
  const [facilityName, setfacilityName] = useState("");
  // ✅ CORRECT: GET request - Single config object as second parameter
 
  const handleBookNow = async (facilityId) => {
    dispatch({ type: "facilityId/setFacilityId", payload: facilityId });
    console.log("Selected Facility ID1:", facilityId);
    console.log(typeof facilityId);
    console.log(token);

    try {
      const response1 = await axios.get(
        `${ProductionApi}/facility/get?id=${facilityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setsfdata(response1.data);
      setfAddress(response1.data.data.address);
      setfTiming(response1.data.data.timing);
      console.log("Facility Details:", response1.data);
      setfacilityName(response1.data.data.name);
      console.log("Facility Details Name:", response1.data.data.name);
      console.log("above token", token);
    } catch (error) {
      console.log("Error fetching facility details:", error);
    }
  };

  const name = useSelector((state) => state.details.name);
  const phoneNo = useSelector((state) => state.details.phoneNo);
  const email = useSelector((state) => state.details.email);
  console.log("name in booking page:", name);
  console.log("phoneNo in booking page:", phoneNo);
  console.log("email in booking page:", email);


  


const cashfreeRef = useRef(null);


useEffect(() => {
  const initCashfree = async () => {
    try {
      const sdk = await load({ mode: "sandbox" }); // or "production"
      cashfreeRef.current = sdk;
      console.log("✅ Cashfree SDK loaded");
    } catch (e) {
      console.error("❌ SDK Load Failed:", e);
    }
  };

  initCashfree();}, []);




const getSessionId = async () => {
    console.log("orderId in getSessionId:", orderId);
    try {
      let res = await axios.post(
        `${ProductionApi}/payment/create`,
        {
          orderId: orderId,
          orderAmount: 2.5,
          customerEmail: email,
          customerPhone: phoneNo,
          customerName: name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    if(res.data && res.data.data.payment_session_id){

        console.log(res.data)
        setOrderId(res.data.order_id)
        return res.data.data.payment_session_id
      }
     

    } catch (error) {
      console.log(error);
      navigate("/profile")
         toast.error("please add data");
    }
  };

  const verifyPayment = async () => {
    try {
      
      let res = await axios.post(`${ProductionApi}/payment/verify?orderId=${orderId}`)

      if(res && res.data){
        alert("payment verified")
        setisverified(true)
      }

    } catch (error) {
      console.log(error)
    }
  }


  const handleMakeBookingApi = async () => {

    console.log("yaha se dekh ::::::::");
    console.log("Booking facility with ID:", facilityId);
    console.log("Booking facility with Name:", facilityName);
    console.log("Drop-off Date:", dropOffDate);
    console.log("Pick-up Date:", pickUpDate);
    console.log("token data :", token);
 try {
    const sessionId = await getSessionId();

    if (!cashfreeRef.current) {
      toast.error("Cashfree SDK not ready");
      return;
    }

    if (!sessionId) {
      toast.error("Invalid payment session ID");
      return;
    }

    await cashfreeRef.current.checkout({
      paymentSessionId: sessionId,
      redirectTarget: "_modal",
    });

    await verifyPayment();
    if(isverified){
      try {
      const response = await axios.post(
        `${ProductionApi}/booking/`,
        {
          area: facilityName,
          dropIn: dropOffDate,
          pickup: pickUpDate,
          luggageType: "Bag",
          facilityId: facilityId.facilityId,
        },

        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Booking successful:", response.data);
      toast.success("Booking successful!");
      navigate("/landingpage")
    } catch (error) {
      console.error("Error making booking:", error);
      
    }
    }
  } catch (err) {
    console.error("❌ Booking error:", err);
  }
    
  };
  
 useEffect(() => {
  const handleBeforeUnload = (event) => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        navigator.sendBeacon(
          `${ProductionApi}/user/logout`,
          JSON.stringify({})
        );
        localStorage.removeItem("token");
      } catch (e) {
        console.warn("Logout beacon failed:", e);
      }
    }
  };

  window.addEventListener("beforeunload", handleBeforeUnload);

  return () => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
  };
}, []);

  return (
    <div className="main min-h-screen w-full">
      {/* Navbar */}
      <div className="navbar flex flex-col lg:flex-row p-2 lg:p-4 lg:pl-16 m-2 lg:m-4 gap-2 lg:gap-4 justify-between text-lg lg:text-2xl">
        {/* Top row for mobile - Logo and hamburger */}
        <div className="flex justify-between items-center lg:contents">
          <div className="flex cursor-pointer" onClick={handleLogoClick}>
            <div className="logo-bag" />
            <div className="logo" />
          </div>

          <div className="lg:hidden">
            <GiHamburgerMenu
              size={32}
              color="#FA8128"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/useroverview");
                }
              }}
            />
          </div>
        </div>

        {/* Search and controls - stack on mobile */}
        <div className="flex flex-col sm:flex-row gap-2 lg:gap-4 flex-1 lg:flex-none">
          {/* Destination Search */}
          <div className="relative w-full sm:w-[200px] lg:w-[300px]">
            <input
              className="border-2 rounded-4xl border-[#63C5DA] p-2 w-full text-[#FA8128] shadow-md pr-12 h-10 lg:h-12 text-sm lg:text-base"
              placeholder="Destination"
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchDestination()}
              onClick={handleSearchDestination()}
            />
            <span
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#63C5DA] cursor-pointer"
              onClick={handleSearchDestination}
            >
              <IoIosSearch size={20} />
            </span>
          </div>

          {/* Date Pickers Row */}
          <div className="flex gap-2 flex-1">
            {[
              [
                "Drop-off",
                dropOffDate,
                showDropOffCalendar,
                setShowDropOffCalendar,
                setDropOffDate,
              ],
              [
                "Pick-up",
                pickUpDate,
                showPickUpCalendar,
                setShowPickUpCalendar,
                setPickUpDate,
              ],
            ].map(([label, date, showCal, toggleCal, updateDate]) => (
              <div className="relative flex-1" key={label}>
                <input
                  className="border-2 rounded-4xl border-[#63C5DA] p-2 w-full text-[#FA8128] shadow-md h-10 lg:h-12 text-sm lg:text-base"
                  placeholder={label}
                  readOnly
                  value={formatDate(date)}
                  onClick={() => toggleCal(!showCal)}
                />
                {showCal && (
                  <div className="absolute z-50 mt-1 w-[320px]">
                    <Calendar
                      onChange={(d) => {
                        const normalizedDate = new Date(
                          d.getFullYear(),
                          d.getMonth(),
                          d.getDate(),
                          12 // set time to noon to avoid timezone shift
                        );
                        updateDate(normalizedDate);
                        toggleCal(false);
                      }}
                      value={date}
                      className="text-sm w-full"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Bag counter and hamburger for desktop */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Bag Count */}
          <div className="box flex h-10 lg:h-12 w-[120px] lg:w-[200px] items-center justify-center text-white text-sm lg:text-base">
            <button
              onClick={() => setNumberofBag((n) => Math.max(n - 1, 0))}
              className="px-2 lg:px-3"
            >
              -
            </button>
            <span className="mx-2 lg:mx-3">{numberofbag}</span>
            <button
              onClick={() => setNumberofBag((n) => n + 1)}
              className="px-2 lg:px-3"
            >
              +
            </button>
          </div>

          {/* Desktop Hamburger */}
          <div className="hidden lg:block">
            <GiHamburgerMenu
              size={40}
              color="#FA8128"
              onClick={() => {
                if (isLoggedIn) {
                  navigate("/useroverview");
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Google Map and Facility Cards */}
      {isLoaded && (
        <div className="relative">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            {/* Multiple Markers */}
            {markerPositions.map((pos, idx) => (
              <Marker
                key={idx}
                position={pos}
                onClick={() => {
                  setClicked(true);

                  handleBookNow(facilities[idx]._id);
                }}
              />
            ))}
          </GoogleMap>

          {/* Facility Cards Overlay */}
          {!clicked ? (
            <div className="absolute bottom-4 left-0 right-0 flex justify-center px-2 lg:px-4">
              <div className="w-full max-w-7xl">
                <Slider {...sliderSettings} className="facility-slider">
                  {facilities.map((item, index) => (
                    <div key={index} className="p-2 lg:p-4">
                      <div className="flex flex-col sm:flex-row border-2 border-[#63C5DA] rounded-xl shadow-lg p-3 lg:p-4 bg-white h-auto sm:h-[300px] lg:h-[350px]">
                        <div className="w-full sm:w-[35%] mb-3 sm:mb-0">
                          <img
                            src="/BookingPhoto.svg"
                            alt="Storage"
                            className="h-32 sm:h-48 w-full object-cover rounded-lg shadow-md"
                          />
                        </div>
                        <div className="w-full sm:w-[60%] flex flex-col justify-between sm:pl-4">
                          <div>
                            <div className="text-[#FA8128] text-lg lg:text-xl font-semibold">
                              {item?.name || "Storage Facility"}
                            </div>
                            <div className="text-[#FA8128] text-sm font-light">
                              {item?.address || "Unknown address"}
                            </div>
                            <div className="flex items-center mt-1">
                              {[...Array(item.rating)].map((_, i) => (
                                <img
                                  key={i}
                                  src="/Rating.svg"
                                  alt="Star"
                                  className="w-4 h-4 lg:w-5 lg:h-5"
                                />
                              ))}
                            </div>
                          </div>
                          <div className="text-sm mt-2">
                            <div className="text-green-700">{item.timing}</div>
                          </div>
                          <button
                            className="bg-[#FA8128] text-white px-4 py-2 rounded-3xl mt-3 self-start text-sm lg:text-base"
                            onClick={async () => {
                              await handleBookNow(item._id);
                              setClicked(true);
                            }}
                          >
                            Book Now
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex justify-center items-center p-4 bg-gray-50 bg-opacity-80 backdrop-blur-sm">
              <div className="border-2 border-[#63C5DA] p-4 lg:p-6 shadow-lg bg-white transition-all hover:shadow-xl flex flex-col gap-y-4 divide-y divide-gray-300 max-w-sm lg:max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Image */}
                <div className="w-full h-32 sm:h-48 bg-gray-100 rounded overflow-hidden">
                  <img
                    src="/BookingPhoto.svg"
                    alt="Storage"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="pt-2">
                  <div className="text-[#FA8128] text-lg lg:text-xl font-semibold">
                    {facilityName}
                  </div>
                  <div className="text-[#FA8128] text-sm font-light">
                    {fAddress || "Queens street, Melbourn"}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src="/Rating.svg"
                        alt="Star"
                        className="w-4 h-4 lg:w-5 lg:h-5"
                      />
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="pt-2 text-sm">
                  <div className="text-green-700">{fTiming}</div>
                  <div className="text-[#63C5DA]">
                    {fDuration} away from your location
                  </div>
                </div>

                {/* Facilities */}
                <div className="pt-2 flex gap-2 flex-wrap">
                  {["Wifi", "Restroom", "CCtv"].map((facility) => (
                    <button
                      key={facility}
                      className="border-2 border-[#63C5DA] rounded px-2 lg:px-3 py-1 text-[#FA8128] text-xs lg:text-sm"
                    >
                      {facility}
                    </button>
                  ))}
                </div>

                {/* Pricing */}
                <div className="pt-2 text-center">
                  <p className="text-[#FA8128] text-base lg:text-lg font-medium">
                    At 2.5 EUR per bag/day
                  </p>
                  <div className="grid grid-cols-2 gap-2 justify-center my-2">
                    {["6:30 PM", "8:30 PM", "9:30 PM", "10:00 PM"].map(
                      (time) => (
                        <button
                          key={time}
                          className="border-2 border-[#63C5DA] rounded px-2 lg:px-3 py-1 text-[#FA8128] text-xs lg:text-sm"
                        >
                          {time}
                        </button>
                      )
                    )}
                  </div>
                  <button
                    className="bg-[#FA8128] text-white px-5 py-2 rounded-3xl mt-2 w-full sm:w-auto"
                    onClick={handleMakeBookingApi}
                  >
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Bookingpage;
