import React, { useEffect, useState } from "react";
import axios from "axios";

function Map() {
  const [restrooms, setRestrooms] = useState([]);
  const [geocodedRestrooms, setGeocodedRestrooms] = useState([]);

  useEffect(() => {
    const fetchRestrooms = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/restrooms/",
          {
            params: {
              query: "공중화장실",
              lat: 37.5665,
              lng: 126.978,
              radius: 1000,
            },
          }
        );

        setRestrooms(response.data.items || []); // 응답 데이터 구조에 맞게 수정
      } catch (error) {
        console.error("Error fetching restroom data:", error);
      }
    };

    fetchRestrooms();
  }, []); // 빈 배열을 넣어 처음 마운트될 때만 실행

  useEffect(() => {
    const loadMap = async () => {
      const map = new window.naver.maps.Map("map", {
        center: new window.naver.maps.LatLng(37.5665, 126.978),
        zoom: 15,
      });

      const updatedRestrooms = [];

      for (const restroom of restrooms) {
        try {
          const geocodeResponse = await axios.get(
            "http://127.0.0.1:8000/api/geocode/",
            {
              params: {
                address: restroom.roadAddress || restroom.address,
              },
            }
          );

          const location = geocodeResponse.data.addresses[0];
          if (location) {
            const { y, x } = location;
            updatedRestrooms.push({
              ...restroom,
              latitude: y,
              longitude: x,
            });

            new window.naver.maps.Marker({
              position: new window.naver.maps.LatLng(y, x),
              map,
              title: restroom.name,
            });
          }
        } catch (error) {
          console.error("Error geocoding address:", error);
        }
      }

      setGeocodedRestrooms(updatedRestrooms);
    };

    if (restrooms.length > 0 && geocodedRestrooms.length === 0) {
      loadMap(); // 처음에만 loadMap 호출
    }
  }, [restrooms]); // restrooms가 업데이트된 후 처음 한 번만 실행

  return (
    <div>
      <div>
        <h3>검색 결과:</h3>
        <ul>
          {geocodedRestrooms.map((restroom, index) => (
            <li key={index}>
              <strong>{restroom.title}</strong>
              <br />
              주소: {restroom.roadAddress || restroom.address}
              <br />
              전화번호: {restroom.telephone || "정보 없음"}
              <br />
              위도: {restroom.latitude || "변환 불가"}
              <br />
              경도: {restroom.longitude || "변환 불가"}
            </li>
          ))}
        </ul>
      </div>
      <div
        id="map"
        style={{
          width: "100%",
          height: "400px",
          marginTop: "20px",
        }}
      ></div>
    </div>
  );
}

export default Map;
