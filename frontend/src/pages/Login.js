import React from "react";
import "./Login.css";
import loginTitle from "../assets/login_title.png";
import loginIcon from "../assets/icon.svg";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

const LoginPage = () => {
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
              <a href="#">회원가입 하기</a>
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
