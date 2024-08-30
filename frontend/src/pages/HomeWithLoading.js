import React, { useState, useEffect } from "react";
import Home from "./Home"; // pages 폴더 안에 Home.js가 있다면 이 경로가 맞습니다.
import LoadingScreen from "../components/LoadingScreen"; // components 폴더가 src와 동일한 레벨에 있다면 이 경로가 맞습니다.

function HomeWithLoading(props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 1초 후에 로딩 상태를 false로 설정
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    // 컴포넌트가 언마운트될 때 타이머를 클리어
    return () => clearTimeout(timer);
  }, []);

  return isLoading ? <LoadingScreen /> : <Home {...props} />;
}

export default HomeWithLoading;
