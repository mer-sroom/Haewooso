import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="signup-wrap">
      <div className="signup-container">
        <div className="signup-title">회원가입</div>
        <div className="signup-form">
          <input type="text" placeholder="닉네임 입력"></input>
          <input type="text" placeholder="아이디 입력"></input>
          <input type="password" placeholder="비밀번호"></input>
          <input type="password" placeholder="비밀번호 확인"></input>
          <div className="signup-form-line"></div>
        </div>
        <div className="signup-detail">
          <div className="signup-detail-content">
            <div className="signup-detail-content-box">
              <input type="checkbox"></input>
              <div className="signup-detail-title">개인정보 처리 방침 동의</div>
            </div>

            <div className="signup-detail-detail">
              <a href="#">상세보기</a>
            </div>
          </div>
          <div className="signup-detail-content">
            <div className="signup-detail-content-box">
              <input type="checkbox"></input>
              <div className="signup-detail-title">서비스 이용약관 동의</div>
            </div>
            <div className="signup-detail-detail">
              <a href="#">상세보기</a>
            </div>
          </div>
        </div>
        <div className="signup-btn">
          <button>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
