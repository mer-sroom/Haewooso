import React from "react";
import "./Detail.css";

function Detail({ restroom, className, onShowMore }) {
  if (!restroom) return null;

  // 목업 데이터로 리뷰 생성
  const reviews = [
    {
      user: "유저1",
      date: "2021.08.26",
      rating: 4.5,
      content: "이 화장실은 노래가 나와서 좋다",
    },
    {
      user: "유저2",
      date: "2021.08.25",
      rating: 4.0,
      content: "이 화장실은 진짜 좋다",
    },
  ];

  return (
    <div className={className}>
      <button className="show-more-btn" onClick={onShowMore}>
        ↑ 더 보기
      </button>
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

      {/* 방문자 리뷰 섹션 */}
      <div className="reviews-section">
        <div className="reviews-header">
          <h3>방문자 리뷰</h3>
          <button className="write-review-btn">작성하기</button>
        </div>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <div>
                  {" "}
                  <span className="review-user">{review.user}</span>
                  <span className="review-date">{review.date}</span>
                </div>
                <span className="review-rating">★{review.rating}</span>
              </div>
              <p className="review-content">{review.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Detail;
