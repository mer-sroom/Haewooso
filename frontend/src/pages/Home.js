import React, { useState } from "react";
import Map from "../components/Map"; // Map 컴포넌트를 가져옵니다
import Navbar from "../components/Navbar"; // Navbar 컴포넌트를 가져옵니다
import "./Home.css"; // Home 컴포넌트의 CSS 파일을 가져옵니다

function Home() {
  const [userLocation, setUserLocation] = useState(
    new window.naver.maps.LatLng(37.566535, 126.9779692)
  ); // 초기값 서울 시청
  const [restrooms, setRestrooms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGPSButtonClick = () => {
    console.log("GPS 버튼이 클릭되었습니다.");

    if (navigator.geolocation) {
      console.log("Geolocation 지원됨. 위치 정보를 요청합니다...");

      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log("위치 정보 받아옴: ", latitude, longitude);

          const newUserLocation = new window.naver.maps.LatLng(
            latitude,
            longitude
          );
          setUserLocation(newUserLocation);

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

  const handleSearchChange = async e => {
    const query = e.target.value;

    if (query) {
      setShowDropdown(true); // 검색어가 입력되면 드롭다운을 표시
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/search-restrooms/?query=${query}&lat=${userLocation.lat()}&lng=${userLocation.lng()}`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
        console.log("검색 결과:", data.items);
      } catch (error) {
        console.error("검색 정보를 가져오는 중 오류 발생:", error);
      }
    } else {
      setShowDropdown(false); // 검색어가 없으면 드롭다운 숨김
      setSearchResults([]);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <input
        type="text"
        className="search-bar"
        placeholder="화장실을 검색하세요..."
        onChange={handleSearchChange}
      />
      <div className={`search-results ${showDropdown ? "active" : ""}`}>
        {searchResults.map((result, index) => (
          <div key={index} className="search-result-item">
            <div>{result.name}</div>
            <div>{result.road_address}</div>
            {result.distance && <div>{result.distance.toFixed(2)} m</div>}
          </div>
        ))}
      </div>
      <div className="map-container">
        <Map userLocation={userLocation} restrooms={restrooms} />{" "}
        <button className="gps-button" onClick={handleGPSButtonClick}></button>{" "}
      </div>
    </div>
  );
}

export default Home;
