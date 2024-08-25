import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css"; // CSS 파일을 가져옵니다

// 사이드바 컴포넌트 임포트
import Sidebar from "./Sidebar";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="navbar">
      <h1 className="navbar-title">해우소</h1>
      <FontAwesomeIcon icon={faBars} className="menu-icon" onClick={() => setIsOpen(true)}/>
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Navbar;
