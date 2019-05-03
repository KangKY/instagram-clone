import React, {useEffect} from "react";
import styled from 'styled-components';

const Container = styled.div`
  margin:0 auto;
  min-width:80%;
  height:500px;
`

export default ({lat, lng}) => {
  

  useEffect(() => {
    const daum = window.daum;
    console.log(lat, lng);
    if(daum !== undefined && lat !== 0 && lng !== 0) {
      console.log(daum);

      const container = document.getElementById("map");
      const options = {
        center: new daum.maps.LatLng(lat, lng),
        level: 3
      };

      const map = new daum.maps.Map(container, options);

      // const imageSrc = 'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png', // 마커이미지의 주소입니다    
      //       imageSize = new daum.maps.Size(64, 69), // 마커이미지의 크기입니다
      //       imageOption = {offset: new daum.maps.Point(27, 69)}; // 마커이미지의 옵션입니다. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정합니다.

      //     // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      // //const markerImage = new daum.maps.MarkerImage(imageSrc, imageSize, imageOption);
      const markerPosition = new daum.maps.LatLng(lat, lng); // 마커가 표시될 위치입니다

      // 마커를 생성합니다
      const marker = new daum.maps.Marker({
        position: markerPosition, 
        //image: markerImage // 마커이미지 설정 
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(map);  
    }
  }, [lat, lng]);

  return (
    <>
      <Container id="map">
      </Container>
    </>
  );
};
