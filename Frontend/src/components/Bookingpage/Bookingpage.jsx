import React, { useState, useEffect, useCallback, use } from "react";
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
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { GoogleApi } from "../../../utills";

const Bookingpage = () => {
  // bringing the name of the page from landingpage
  const location = useLocation();
  const query = location.state?.query || "";

  useEffect(() => {
    console.log("Query from previous page:", query);
  }, [query]);
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
  const dispatch = useDispatch();
  //  New state for selected facility ID

  const navigate = useNavigate();
  const containerStyle = { width: "100%", height: "700px" };

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GoogleApi,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(
    (mapInstance) => {
      const bounds = new window.google.maps.LatLngBounds(center);
      mapInstance.fitBounds(bounds);
      setMap(mapInstance);
    },
    [center]
  );

  const onUnmount = useCallback(() => setMap(null), []);

  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(({ coords }) => {
      const { latitude, longitude } = coords;
      setCenter({ lng: longitude, lat: latitude });
    });
  }, []);
  console.log("user ", center.lat, center.lng);

  const formatDate = (date) =>
    date instanceof Date ? date.toISOString().split("T")[0] : "";

  const handleSearchDestination = async () => {
    if (!destination) return;
    const prevLocation = destination || query;
    try {
      const geoRes = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          prevLocation
        )}&key=${GoogleApi}` // Use GoogleApi from utills.js
      );
      const geoData = await geoRes.json();

      if (geoData.results.length) {
        const location = geoData.results[0].geometry.location;
        setCenter(location);

        const facilityRes = await axios.post(
          "/api/map/facilitiesBySearch",
          { userCoordinates: [location.lng, location.lat] },
          { withCredentials: true }
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
            const distance1 = await axios.post(
              "/api/map/facilitiesDistanceTime",
              {
                userCoordinates: [center.lng, center.lat],
                facilityCoordinates: coordsArray[i], // coordsArray[i] is already an array
              },
              { withCredentials: true } // optional third argument for cookies/auth
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
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: (
      <div className="absolute -left-8 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <BsArrowLeftCircle className="text-[#63C5DA] text-4xl" />
      </div>
    ),
    nextArrow: (
      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer">
        <BsArrowRightCircle className="text-[#63C5DA] text-4xl" />
      </div>
    ),
  };

  const handleBookNow = async (facilityId) => {
    dispatch({ type: "facilityId/setFacilityId", payload: facilityId });
    console.log("Selected Facility ID1:", facilityId);
    console.log(typeof facilityId);
    try {
      const response1 = await axios.get(
        `https://baggagebugs-81tp.onrender.com/api/v1/facility/facilityById?id=${facilityId}`
      );
      setsfdata(response1.data);
      setfAddress(response1.data.data.address);
      setfTiming(response1.data.data.timing);
      console.log("Facility Details:", response1.data);
      console.log("Facility Details Name:", response1.data.data.name);
    } catch (error) {
      console.log("Error fetching facility details:", error);
    }
  };
  // console.log("Facility ID through redux:", sfdata);
  // const handleBookNow = async (facilityId) => {
  //   try {
  //     console.log("Booking facility with ID:", facilityId);

  //     const response = await axios.get(
  //       "https://baggagebugs-81tp.onrender.com/api/v1/facility/facilityById",
  //       {
  //         params: {
  //           id: "682072396eadb9cf4dc06054",  // ✅ Passed correctly
  //         },
  //         withCredentials: true,
  //       }
  //     );

  //     console.log("Facility Details:", response.data);
  //   } catch (error) {
  //     console.error("Error fetching facility details:", error);

  //     if (error.config) {
  //       console.error("Request config:", error.config); // Shows what Axios tried to send
  //     }

  //     if (error.response) {
  //       console.error("Response status:", error.response.status);
  //       console.error("Response data:", error.response.data);
  //     }
  //   }
  // };

  return (
    <div className="main h-screen w-full">
      {/* Navbar */}
      <div className="navbar flex p-2 pl-16 m-4 justify-between text-2xl">
        <div className="flex">
          <div className="logo-bag" />
          <div className="logo" />
        </div>

        {/* Destination Search */}
        <div className="relative m-2 w-[300px]">
          <input
            className="border-2 rounded-4xl border-[#63C5DA] p-2 w-full text-[#FA8128] shadow-md pr-12 h-12"
            placeholder="Destination"
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchDestination()}
          />
          <span
            className="absolute right-4 top-1/2 transform -translate-y-4 text-[#63C5DA] cursor-pointer"
            onClick={handleSearchDestination}
          >
            <IoIosSearch size={24} />
          </span>
        </div>

        {/* Date Pickers */}
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
          <div className="relative" key={label}>
            <input
              className="border-2 mt-2 rounded-4xl border-[#63C5DA] p-2 text-[#FA8128] shadow-md pr-12 h-12"
              placeholder={label}
              readOnly
              value={formatDate(date)}
              onClick={() => toggleCal(!showCal)}
            />
            {showCal && (
              <div className="absolute z-10">
                <Calendar
                  onChange={(d) => {
                    updateDate(d);
                    toggleCal(false);
                  }}
                  value={date}
                />
              </div>
            )}
          </div>
        ))}

        {/* Bag Count */}
        <div className="box mt-2 flex h-[50px] w-[200px] items-center justify-center text-white">
          <button onClick={() => setNumberofBag((n) => Math.max(n - 1, 0))}>
            -
          </button>
          <span className="mx-3">{numberofbag}</span>
          <button onClick={() => setNumberofBag((n) => n + 1)}>+</button>
        </div>

        {/* Language Dropdown */}
        <div className="relative mt-2">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
          >
            <IoIosArrowDown
              size={15}
              color="#FA8128"
              className="w-15 h-12 mr-5 rounded-2xl border border-[#FA8128]"
            />
          </div>
          {showLanguageDropdown && (
            <div className="absolute right-0 mt-2 w-[150px] bg-white border border-[#63C5DA] rounded-lg shadow-md">
              <ul className="text-[#FA8128]">
                {["English", "Spanish", "French", "German"].map((lang) => (
                  <li
                    key={lang}
                    className="p-2 hover:bg-[#FA8128] hover:text-white cursor-pointer"
                    onClick={() => console.log(`${lang} selected`)}
                  >
                    {lang}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="relative mt-3">
          <GiHamburgerMenu size={40} color="#FA8128" />
        </div>
      </div>

      {/* Google Map and Facility Cards */}
      {isLoaded && (
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
                // You can also add logic here to fetch or display facility details
                handleBookNow(facilities[idx]._id); // if you want marker click to behave like "Book Now"
              }}
            />
          ))}

          {!clicked ? (
            <div className="w-full flex justify-center mt-2">
              <Slider {...sliderSettings} className="w-[85%] mt-96 max-w-7xl">
                {facilities.map((item, index) => (
                  <div
                    key={index}
                    className="p-4 flex justify-center items-center"
                  >
                    <div className="flex flex-row border-2 border-[#63C5DA] rounded-xl shadow-lg p-4 w-full max-h-[350px] overflow-hidden bg-white">
                      <div className="w-[35%]">
                        <img
                          src="/BookingPhoto.svg"
                          alt="Storage"
                          className="h-48 w-72 object-cover rounded-lg shadow-md"
                        />
                      </div>
                      <div className="w-[60%] flex flex-col justify-between items-start pl-4">
                        <div>
                          <div className="text-[#FA8128] text-xl font-semibold">
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
                                className="w-5 h-5"
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-sm">
                          <div className="text-green-700">{item.timing}</div>
                          <div className="text-[#63C5DA]"></div>
                        </div>
                        <button
                          className="bg-[#FA8128] text-white px-3 py-2 rounded-3xl"
                          onClick={async () => {
                            await handleBookNow(item._id);
                            setClicked(true);
                          }} // Pass facility ID here
                          // Pass facility ID here
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="absolute flex mt-20 justify-center items-center ml-42 h-[80%] bg-gray-50 bg-opacity-80 backdrop-blur-sm">
              <div className="border-2 border-[#63C5DA] p-4 overflow-hidden shadow-lg bg-white transition-all hover:shadow-xl flex flex-col gap-y-4 divide-y divide-gray-300 max-w-md w-full">
                {/* Image */}
                <div className="w-full h-48 bg-gray-100 rounded overflow-hidden">
                  <img
                    src="/BookingPhoto.svg"
                    alt="Storage"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Details */}
                <div className="pt-2">
                  <div className="text-[#FA8128] text-xl font-semibold"></div>
                  <div className="text-[#FA8128] text-sm font-light">
                    {fAddress || "Queens street, Melbourn"}
                  </div>
                  <div className="flex items-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <img
                        key={i}
                        src="/Rating.svg"
                        alt="Star"
                        className="w-5 h-5"
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
                      className="border-2 border-[#63C5DA] rounded px-3 py-1 text-[#FA8128] text-sm"
                    >
                      {facility}
                    </button>
                  ))}
                </div>

                {/* Pricing */}
                <div className="pt-2 text-center">
                  <p className="text-[#FA8128] text-lg font-medium">
                    At 2.5 EUR per bag/day
                  </p>
                  <div className="flex gap-2 justify-center my-2 flex-wrap">
                    {["6:30 PM", "8:30 PM", "9:30 PM", "10:00 PM"].map(
                      (time) => (
                        <button
                          key={time}
                          className="border-2 border-[#63C5DA] rounded px-3 py-1 text-[#FA8128] text-sm"
                        >
                          {time}
                        </button>
                      )
                    )}
                  </div>
                  <button className="bg-[#FA8128] text-white px-5 py-2 rounded-3xl mt-2">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          )}
        </GoogleMap>
      )}
    </div>
  );
};

export default Bookingpage;
