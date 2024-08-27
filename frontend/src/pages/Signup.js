import React from "react";
import "./Signup.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 불러옵니다

const Signup = () => {
  const [nickname, setNickname] = useState("");
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const validateNickname = (nickname) => {
    return nickname.length <= 8;
  };

  const validateId = (id) => {
    return id.length <= 12;
  };

  //  특수문자 포함 8글자
  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/g;
    return password.length >= 8 && specialCharRegex.test(password);
  };

  const handleSignup = () => {
    if (!validateNickname(nickname)) {
      setError("닉네임은 8글자 이하로 입력해주세요.");
      return;
    }

    if (!validateId(id)) {
      setError("아이디는 12글자 이하로 입력해주세요.");
      return;
    }

    if (!validatePassword(password)) {
      setError("비밀번호는 8글자 이상이며, 특수문자를 포함해야 합니다.");
      return;
    }

    if (password !== confirmPassword) {
      setError("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    setError("");
    alert("로그인이 성공했습니다!");
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
            onChange={(e) => setNickname(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="아이디 입력"
            value={id}
            onChange={(e) => setId(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <input
            type="password"
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></input>
          <div className="signup-form-line"></div>
        </div>
        {error && <div className="signup-error">{error}</div>}
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
          <button onClick={handleSignup}>가입하기</button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
