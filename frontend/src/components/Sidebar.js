import React, { useRef, useEffect, useState } from "react";
import "./Sidebar.css";
import loginIcon from "../assets/dologin.svg";
import { useNavigate } from "react-router-dom";

function Sidebar({ isOpen, setIsOpen, isLoggedIn, setIsLoggedIn }) {
  const outside = useRef();
  const [username, setUsername] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Sidebar: isLoggedIn state received:", isLoggedIn);
    if (isLoggedIn) {
      const storedUsername = localStorage.getItem("username");
      setUsername(storedUsername);
    }

    const handlerOutside = e => {
      if (outside.current && !outside.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlerOutside);
    return () => {
      document.removeEventListener("mousedown", handlerOutside);
    };
  }, [isLoggedIn, isOpen, setIsOpen]);

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    setUsername(null);
    setIsOpen(false);
    navigate("/login");
  };

  return (
    <>
      <div
        className={`overlay ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen(false)}
      />
      <div id="sidebar" ref={outside} className={isOpen ? "open" : ""}>
        <div className="hello-text">
          {isLoggedIn ? (
            <>
              어서오세요
              <br />
              <span className="username">{username}</span>님!
            </>
          ) : (
            <div onClick={handleLoginClick} style={{ cursor: "pointer" }}>
              <img src={loginIcon} alt="로그인" className="login-icon" />
              <span className="login-text">로그인 하기</span>
            </div>
          )}
        </div>
        {isLoggedIn && (
          <>
            <ul className="sidebar-ul">
              <li className="menu-item">추가 기능1</li>
              <li className="menu-item">추가 기능2</li>
              <li className="menu-item">추가 기능3</li>
              <li className="menu-item">추가 기능4</li>
            </ul>
            <p className="logout" onClick={handleLogout}>
              로그아웃
            </p>
          </>
        )}
      </div>
    </>
  );
}

export default Sidebar;
