import React, { useState, useEffect } from "react";
import LocationPresenter from "./LocationPresenter";

const LocationContainer = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function(position) {
          //alert(position.coords.latitude + ' ' + position.coords.longitude);
          setLat(position.coords.latitude);
          setLng(position.coords.longitude);


          // const daum = window.daum;
          // if(daum !== undefined) {
          //   console.log(daum);

          //   const container = document.getElementById("map");
          //   const options = {
          //     center: new daum.maps.LatLng(33.450701, 126.570667),
          //     level: 3
          //   };

          //   new daum.maps.Map(container, options);
          // }
        },
        function(error) {
          console.error(error);
        }
      );
    } else console.log("Geolocation is not supported by this browser.");
    return () => {
      console.log("cleanup");
    };
  }, []);

  return (
    <LocationPresenter lat={lat} lng={lng} />
  );
};

export default LocationContainer;
