import React from "react";
import Map from "../components/Map"; // Map 컴포넌트를 가져옵니다
import Navbar from "../components/Navbar"; // Navbar 컴포넌트를 가져옵니다
import "./Home.css"; // Home 컴포넌트의 CSS 파일을 가져옵니다

function Home() {
  return (
    <div className="container">
      <Navbar />
      <input
        type="text"
        className="search-bar"
        placeholder="화장실을 검색하세요..."
      />
      <div className="map-container">
        <Map />
        <button className="gps-button"></button> {/* GPS 버튼 추가 */}
      </div>
    </div>
  );
}

export default Home;
