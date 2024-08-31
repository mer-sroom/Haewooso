import React from "react";
import "./Detail.css";

function Detail({ restroom, className }) {
  if (!restroom) return null;

  return (
    <div className={className}>
      <div id="top-bar"></div>
      <h2>{restroom.name || "이름 정보 없음"}</h2>
      <div className="simple-detail-header">
        <div className="rating">
          ⭐ {restroom.rating ? restroom.rating : "N/A"} / 5
        </div>
      </div>
      <div className="simple-detail-info">
        <p>
          {restroom.opening_hours
            ? `운영 시간: ${restroom.opening_hours}`
            : "운영 시간 정보 없음"}
        </p>
        <p>
          {restroom.road_address || "주소 정보 없음"}{" "}
          <span className="copy-icon">📋</span>
        </p>
      </div>
    </div>
  );
}

export default Detail;
