import React, { useEffect, useState } from "react";
import axios from "axios";

function Map({ userLocation }) {
  const [restrooms, setRestrooms] = useState([]);
  const [map, setMap] = useState(null); // 지도를 상태로 관리

  useEffect(() => {
    const fetchRestrooms = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/restrooms/",
          {
            params: {
              query: "공중화장실",
              lat: 37.566535,
              lng: 126.9779692,
              radius: 1000,
            },
          }
        );

        setRestrooms(response.data.items || []);
      } catch (error) {
        console.error("Error fetching restroom data:", error);
      }
    };

    fetchRestrooms();
  }, []);

  useEffect(() => {
    const initMap = () => {
      const initialMap = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.566535, 126.9779692),
        zoom: 15,
      });
      setMap(initialMap);
    };

    initMap();
  }, []);

  useEffect(() => {
    if (map && restrooms.length > 0) {
      restrooms.forEach(restroom => {
        const latitude = restroom.mapy / 1e7; // 좌표를 실제 위도/경도로 변환
        const longitude = restroom.mapx / 1e7;

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latitude, longitude),
          map: map,
          title: restroom.title,
        });
      });
    }
  }, [map, restrooms]);

  useEffect(() => {
    if (map && userLocation) {
      // 사용자의 위치에 파란색 점 표시
      new window.naver.maps.Circle({
        map: map,
        center: userLocation,
        radius: 20, // 원의 반지름 (미터 단위)
        fillColor: "blue",
        fillOpacity: 0.8,
        strokeColor: "#000", // 테두리 색상
        strokeWeight: 2, // 테두리 두께
      });

      // 지도를 사용자 위치로 이동
      map.setCenter(userLocation);
      map.setZoom(15); // 사용자 위치로 이동 시 적절한 줌 레벨 설정
    }
  }, [map, userLocation]);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "calc(100vh - 37px)",
        marginTop: "0px",
      }}
    ></div>
  );
}

export default Map;
