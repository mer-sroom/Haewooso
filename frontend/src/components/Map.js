import React, { useEffect, useState } from "react";
import axios from "axios";

function Map() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    const fetchRestrooms = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/restrooms/",
          {
            params: {
              query: "공중화장실",
              lat: 37.5665,
              lng: 126.978,
              radius: 1000,
            },
          }
        );

        setRestrooms(response.data.places || []);
      } catch (error) {
        console.error("Error fetching restroom data:", error);
      }
    };

    fetchRestrooms();
  }, []);

  useEffect(() => {
    if (restrooms.length > 0) {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 15,
      });

      restrooms.forEach(restroom => {
        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(restroom.y, restroom.x), // y가 위도, x가 경도
          map,
          title: restroom.name,
        });
      });
    }
  }, [restrooms]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "400px",
      }}
    ></div>
  );
}

export default Map;
