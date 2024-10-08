import React, { useState } from "react";
import Map from "../components/Map";
import Navbar from "../components/Navbar";
import exitBtn from "../assets/exitBtn.svg";
import "./Home.css";

function Home({ isLoggedIn, setIsLoggedIn }) {
  const [userLocation, setUserLocation] = useState(
    new window.naver.maps.LatLng(37.566535, 126.9779692)
  );
  const [restrooms, setRestrooms] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState(""); //x버튼에서 사용하기 위해 추가

  const handleGPSButtonClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
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
    } catch (error) {
      console.error("주변 화장실 정보를 가져오는 중 오류 발생:", error);
    }
  };

  const handleSearchChange = async e => {
    const query = e.target.value;
    setSearchText(query);

    if (query) {
      setShowDropdown(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/search-restrooms/?query=${query}&lat=${userLocation.lat()}&lng=${userLocation.lng()}`
        );
        const data = await response.json();
        setSearchResults(data.items || []);
      } catch (error) {
        console.error("검색 정보를 가져오는 중 오류 발생:", error);
      }
    } else {
      setShowDropdown(false);
      setSearchResults([]);
    }
  };

  const handleClearSearchContent = () => {
    if (searchText) {
      setSearchText("");
      setShowDropdown(false);
    }
  };

  return (
    <div className="container">
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="화장실을 검색하세요..."
          value={searchText}
          onChange={handleSearchChange}
        />
        <button
          className={`search-bar-clear-btn ${showDropdown ? "activate" : ""}`}
          onClick={handleClearSearchContent}
        >
          <img src={exitBtn} alt="exitBtn" />
        </button>
      </div>
      <div className={`search-results ${showDropdown ? "active" : ""}`}>
        {searchResults.length > 0
          ? searchResults.map((result, index) => (
              <div key={index} className="search-result-item">
                <div>{result.name}</div>
                <div>{result.road_address}</div>
                {result.distance && <div>{result.distance.toFixed(2)} m</div>}
              </div>
            ))
          : showDropdown && (
              <div className="no-results">검색 결과가 없습니다</div>
            )}
      </div>
      <div className="map-container">
        <Map userLocation={userLocation} restrooms={restrooms} />
        <button className="gps-button" onClick={handleGPSButtonClick}></button>
      </div>
    </div>
  );
}

export default Home;
