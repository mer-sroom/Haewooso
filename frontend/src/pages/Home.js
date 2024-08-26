import React, { useState } from "react";
import Map from "../components/Map"; // Map 컴포넌트를 가져옵니다
import Navbar from "../components/Navbar"; // Navbar 컴포넌트를 가져옵니다
import "./Home.css"; // Home 컴포넌트의 CSS 파일을 가져옵니다

function Home() {
  const [userLocation, setUserLocation] = useState(null);
  const [restrooms, setRestrooms] = useState([]); // 주변 화장실 데이터를 저장할 상태 추가

  const handleGPSButtonClick = () => {
    console.log("GPS 버튼이 클릭되었습니다."); // 버튼 클릭 확인

    if (navigator.geolocation) {
      console.log("Geolocation 지원됨. 위치 정보를 요청합니다...");

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("위치 정보 받아옴: ", latitude, longitude);

          setUserLocation(new window.naver.maps.LatLng(latitude, longitude));

          // 받아온 위치를 기반으로 주변 화장실 정보를 가져옴
          fetchNearbyRestrooms(latitude, longitude);
        },
        error => {
          console.error("위치 정보를 가져오는 중 오류 발생:", error);
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
    }
  };

  const fetchNearbyRestrooms = async (lat, lng) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/nearby-restrooms/?lat=${lat}&lng=${lng}&radius=1000`
      );
      const data = await response.json();
      setRestrooms(data.items || []);
      console.log("주변 화장실 데이터:", data.items);
    } catch (error) {
      console.error("주변 화장실 정보를 가져오는 중 오류 발생:", error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <input
        type="text"
        className="search-bar"
        placeholder="화장실을 검색하세요..."
      />
      <div className="map-container">
        <Map userLocation={userLocation} restrooms={restrooms} />{" "}
        <button className="gps-button" onClick={handleGPSButtonClick}></button>{" "}
      </div>
    </div>
  );
}

export default Home;
