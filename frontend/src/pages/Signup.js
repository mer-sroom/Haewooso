import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위해 추가
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 불러옵니다

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate(); // 페이지 이동을 위한 훅

  const handleSignup = async () => {
    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/signup/", {
        username: nickname, // 닉네임을 username으로 전달
        password,
      });

      if (response.status === 201) {
        // 회원가입 성공 시 로그인 페이지로 이동
        alert("회원가입 성공");
        navigate("/login");
      } else {
        alert("회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      alert("회원가입 실패");
    }
  };

  return (
    <div className="signup-wrap">
      <div className="signup-container">
        <div className="signup-title">회원가입</div>
        <div className="signup-form">
          <input
            type="text"
            placeholder="닉네임 입력"
            value={nickname}
            onChange={e => setNickname(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
          />
          <div className="signup-form-line"></div>
        </div>
        {error && <div className="signup-error">{error}</div>}
        <div className="signup-detail">
          <div className="signup-detail-content">
            <div className="signup-detail-content-box">
              <input type="checkbox" />
              <div className="signup-detail-title">개인정보 처리 방침 동의</div>
            </div>
            <div className="signup-detail-detail">
              <a href="#">상세보기</a>
            </div>
          </div>
          <div className="signup-detail-content">
            <div className="signup-detail-content-box">
              <input type="checkbox" />
              <div className="signup-detail-title">서비스 이용약관 동의</div>
            </div>
            <div className="signup-detail-detail">
              <a href="#">상세보기</a>
            </div>
          </div>
        </div>
        <div className="signup-btn">
          <button onClick={handleSignup}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
