import React, { useState } from "react";
import Map from "../components/Map"; // Map 컴포넌트를 가져옵니다
import Navbar from "../components/Navbar"; // Navbar 컴포넌트를 가져옵니다
import "./Home.css"; // Home 컴포넌트의 CSS 파일을 가져옵니다

function Home() {
  const [userLocation, setUserLocation] = useState(null);

  const handleGPSButtonClick = () => {
    console.log("GPS 버튼이 클릭되었습니다."); // 버튼 클릭 확인

    if (navigator.geolocation) {
      console.log("Geolocation 지원됨. 위치 정보를 요청합니다...");

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("위치 정보 받아옴: ", latitude, longitude);

          // 받아온 위치 정보를 상태로 저장하여 Map 컴포넌트로 전달
          setUserLocation(new window.naver.maps.LatLng(latitude, longitude));
        },
        error => {
          console.error("위치 정보를 가져오는 중 오류 발생:", error);
        }
      );
    } else {
      console.error("이 브라우저는 Geolocation을 지원하지 않습니다.");
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
        <Map userLocation={userLocation} />{" "}
        {/* userLocation 상태를 Map 컴포넌트에 전달 */}
        <button
          className="gps-button"
          onClick={handleGPSButtonClick}
        ></button>{" "}
        {/* GPS 버튼 클릭 이벤트 추가 */}
      </div>
    </div>
  );
}

export default Home;
