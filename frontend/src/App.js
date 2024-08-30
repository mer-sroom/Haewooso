import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeWithLoading from "./pages/HomeWithLoading"; // 수정된 부분
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RestroomDetail from "./pages/RestroomDetail";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  if (isLoggedIn === null) {
    return <div>Loading...</div>; // 로그인 여부 확인 중일 때 로딩 화면 표시
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <HomeWithLoading
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          }
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/restroom/:id" element={<RestroomDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
