import React, { useRef, useEffect } from "react";
import "./Sidebar.css"; // CSS 파일을 불러옵니다

function Sidebar({ isOpen, setIsOpen }) {
  const outside = useRef();
  const username = "퀘변기원";

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

  return (
    <>
      <div className={`overlay ${isOpen ? "open" : ""}`} onClick={toggleSide} />
      <div id="sidebar" ref={outside} className={isOpen ? "open" : ""}>
        <p className="hello-text">
          어서오세요{`\n`}
          <span className="username">{username}</span>님!
        </p>
        <ul className="sidebar-ul">
          <li className="menu-item">추가 기능1</li>
          <li className="menu-item">추가 기능2</li>
          <li className="menu-item">추가 기능3</li>
          <li className="menu-item">추가 기능4</li>
        </ul>
        <p className="logout">로그아웃</p>
      </div>
    </>
  );
}

export default Sidebar;
