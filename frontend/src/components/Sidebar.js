import React, { useRef, useEffect } from "react";
import "./Sidebar.css"; // CSS 파일을 불러옵니다
import loginIcon from "../assets/dologin.svg"; // 이미지 파일을 import로 가져옵니다
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 불러옵니다

function Sidebar({ isOpen, setIsOpen, isLoggedIn }) {
  const outside = useRef();
  const username = isLoggedIn ? "퀘변기원" : null;
  const navigate = useNavigate(); // useNavigate 훅 사용

  useEffect(() => {
    document.addEventListener("mousedown", handlerOutside);
    return () => {
      document.removeEventListener("mousedown", handlerOutside);
    };
  }, []);

  const handlerOutside = e => {
    if (outside.current && !outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  const handleLoginClick = () => {
    navigate("/login"); // 로그인 버튼 클릭 시 /login 경로로 이동
  };

  return (
    <>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={toggleSide} />
      <div id="sidebar" ref={outside} className={isOpen ? "open" : ""}>
        <p className="hello-text">
          {isLoggedIn ? (
            <>
              어서오세요{`\n`}
              <span className="username">{username}</span>님!
            </>
          ) : (
            <div onClick={handleLoginClick} style={{ cursor: "pointer" }}>
              <img
                src={loginIcon} // 여기서 import한 loginIcon을 사용합니다
                alt="로그인"
                className="login-icon"
              />
              <span className="login-text">로그인 하기</span>
            </div>
          )}
        </p>
        {isLoggedIn && (
          <ul className="sidebar-ul">
            <li className="menu-item">추가 기능1</li>
            <li className="menu-item">추가 기능2</li>
            <li className="menu-item">추가 기능3</li>
            <li className="menu-item">추가 기능4</li>
          </ul>
        )}
        {isLoggedIn && <p className="logout">로그아웃</p>}
      </div>
    </>
  );
}

export default Sidebar;
