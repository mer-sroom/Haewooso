import React from "react";
import "./Login.css";
import loginTitle from "../assets/login_title.png";
import loginIcon from "../assets/icon.svg";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 불러옵니다

const LoginPage = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const handleSignClick = () => {
    navigate("/signup"); // 로그인 버튼 클릭 시 /login 경로로 이동
  };

  return (
    <div className="login-wrap">
      <div className="login-container">
        <div className="login-title">
          <img src={loginTitle}></img>
          <div className="login-title-sub">···</div>
        </div>
        <div className="login-logo">
          <img src={loginIcon}></img>
        </div>
        <div className="login-form">
          <div className="login-form-container">
            <input type="text" placeholder="아이디 입력"></input>
            <input type="password" placeholder="비밀번호"></input>
            <p>
              <a href="" onClick={handleSignClick}>
                회원가입 하기
              </a>
            </p>
          </div>
        </div>
        <div className="login-btn">
          <button>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
