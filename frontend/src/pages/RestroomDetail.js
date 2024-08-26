import React, { useState } from "react";
import Modal from "../components/ReviewForm";
import RatingStars from "../components/RatingStars";
import "./Modal.css";

export default function RestroomDetail () {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Function to handle review submission
  const handleSubmit = () => {
    console.log("리뷰 등록완료!:", { rating, reviewText });
    // Additional logic for handling form submission can be added here
  };

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <div className="restroomDetail">
      <button onClick={openModal}>리뷰 등록하기</button>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
        >
          <main>
            {/* 별점 UI */}
            <RatingStars rating={rating} setRating={setRating} />

            {/* 내용 입력 UI */}
            <textarea cols="38" rows="10"
              className="review-input"
              placeholder="내용을 입력해주세요 ..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />

            {/* 등록하기 버튼 */}
            <button className="submit" onClick={handleSubmit}>
              등록하기
            </button>
          </main>
        </Modal>
      )}
      <h1>Test용 내용입니다</h1>
      <h2>테스트 2</h2>
    </div>
  );
}
