import React, { useCallback, useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import axios from "axios";
import { ProductionApi, LocalApi, GoogleApi } from "../../../utills";
const containerStyle = {
  width: "100%",
  height: "100vh",
  position: "relative",
  top: 0,
  left: 0,
  zIndex: 0,
};

const center = {
  lat: 41.3851, // Barcelona default or pass via props/state
  lng: 2.1734,
};

const Storage = () => {
  const [map, setMap] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: GoogleApi, // Replace with your real key
  });

  const onLoad = useCallback((mapInstance) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    mapInstance.fitBounds(bounds);
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => setMap(null), []);

  //Details :

  const handleDetails = async () => {
    try {
      const response = await axios.get(`${ProductionApi}/facility/`);
      console.log("details : ", response.data);
    } catch (error) {
      console.log("error : ", error);
    }
  };
  useEffect(() => {
    handleDetails(); // Call once when the component mounts
  }, []);
  return (
    <div className="relative  w-full h-screen overflow-hidden">
      {/* Foreground content */}
      <div className="absolute flex mt-20 justify-center items-center w-full h-[80%] bg-gray-50 bg-opacity-80 backdrop-blur-sm">
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
            <div className="text-[#FA8128] text-xl font-semibold">
              Luggage Storage 1
            </div>
            <div className="text-[#FA8128] text-sm font-light">
              Queen Street, Melbourne
            </div>
            <div className="flex items-center mt-1">
              {[...Array(5)].map((_, i) => (
                <img key={i} src="/Rating.svg" alt="Star" className="w-5 h-5" />
              ))}
            </div>
          </div>

          {/* Availability */}
          <div className="pt-2 text-sm">
            <div className="text-green-700">Open - Closes 11:00PM</div>
            <div className="text-[#63C5DA]">3 min away from your location</div>
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
              {["6:30 PM", "8:30 PM", "9:30 PM", "10:00 PM"].map((time) => (
                <button
                  key={time}
                  className="border-2 border-[#63C5DA] rounded px-3 py-1 text-[#FA8128] text-sm"
                >
                  {time}
                </button>
              ))}
            </div>
            <button className="bg-[#FA8128] text-white px-5 py-2 rounded-3xl mt-2">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
