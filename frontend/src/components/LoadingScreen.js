import React from "react";
import "./LoadingScreen.css";
import tIcon from "../assets/t_icon.svg"; // 화장지 이미지
import speed1 from "../assets/speed1.png";
import speed2 from "../assets/speed2.png";
import word from "../assets/word.png";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <div className="animated-content">
        <div className="speed-images">
          <img src={speed1} alt="Speed 1" className="speed-image speed1" />
          <img src={speed2} alt="Speed 2" className="speed-image speed2" />
        </div>
        <div className="animated-tissue">
          <img src={tIcon} alt="화장지" className="main-image" />
        </div>
      </div>
      <img src={word} alt="해우소" className="word-image" />
    </div>
  );
}

export default LoadingScreen;
