import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import loginTitle from "../assets/login_title.png";
import loginIcon from "../assets/icon.svg";

const LoginPage = ({ setIsLoggedIn }) => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:8000/api/login/", {
        username: nickname, // 닉네임을 username으로 사용
        password,
      });

      if (response.status === 200 && response.data.token) {
        // 로그인 성공 시 토큰과 유저네임 저장 및 로그인 상태 업데이트
        console.log("로그인 성공, 토큰:", response.data.token);
        localStorage.setItem("token", response.data.token); // 토큰 저장
        localStorage.setItem("username", nickname); // username(닉네임) 저장
        setIsLoggedIn(true); // 로그인 상태를 true로 설정
        console.log("로그인 상태 업데이트: true");
        navigate("/"); // 로그인 후 홈으로 이동
      } else {
        console.log("로그인 실패 응답:", response.data);
        alert("로그인 실패");
      }
    } catch (error) {
      console.error(
        "로그인 중 오류 발생:",
        error.response ? error.response.data : error.message
      );
      alert("로그인 실패");
    }
  };

  return (
    <div className="login-wrap">
      <div className="login-container">
        <div className="login-title">
          <img src={loginTitle} alt="Login Title" />
          <div className="login-title-sub">···</div>
        </div>
        <div className="login-logo">
          <img src={loginIcon} alt="Login Icon" />
        </div>
        <div className="login-form">
          <div className="login-form-container">
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
            <p>
              <a href="/signup">회원가입 하기</a>
            </p>
          </div>
        </div>
        <div className="login-btn">
          <button onClick={handleLogin}>로그인</button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
