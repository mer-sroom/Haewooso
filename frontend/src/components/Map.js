import React, { useEffect, useState } from "react";
import axios from "axios";

function Map() {
  const [restrooms, setRestrooms] = useState([]);

  useEffect(() => {
    const fetchRestrooms = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/restrooms/",
          {
            params: {
              query: "공중화장실",
              lat: 37.566535,
              lng: 126.9779692,
              radius: 1000,
            },
          }
        );

        setRestrooms(response.data.items || []); // 응답 데이터에서 items를 설정
      } catch (error) {
        console.error("Error fetching restroom data:", error);
      }
    };

    fetchRestrooms();
  }, []); // 처음 마운트될 때 한 번만 실행

  useEffect(() => {
    if (restrooms.length > 0) {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.566535, 126.9779692),
        zoom: 15,
      });

      restrooms.forEach(restroom => {
        const latitude = restroom.mapy / 1e7; // 좌표를 실제 위도/경도로 변환
        const longitude = restroom.mapx / 1e7;

        new window.naver.maps.Marker({
          position: new window.naver.maps.LatLng(latitude, longitude),
          map,
          title: restroom.title,
        });
      });
    }
  }, [restrooms]); // restrooms가 업데이트된 후에만 실행

  return (
    <div>
      <div>
        {/* <h3>검색 결과:</h3>
        <ul>
          {restrooms.map((restroom, index) => (
            <li key={index}>
              <strong>{restroom.title.replace(/<\/?b>/g, "")}</strong>
              <br />
              주소: {restroom.roadAddress || restroom.address}
              <br />
              전화번호: {restroom.telephone || "정보 없음"}
            </li>
          ))}
        </ul> */}
      </div>
      <div
        id="map"
        style={{
          width: "100%",
          height: "calc(100vh - 38px)",
          marginTop: "0px",
        }}
      ></div>
    </div>
  );
}

export default Map;
