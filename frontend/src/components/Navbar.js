import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import "./Navbar.css"; // CSS 파일을 가져옵니다

function Navbar() {
  return (
    <div className="navbar">
      <h1 className="navbar-title">해우소</h1>
      <FontAwesomeIcon icon={faBars} className="menu-icon" />
    </div>
  );
}

export default Navbar;
