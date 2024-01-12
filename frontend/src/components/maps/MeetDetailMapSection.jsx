import { Container } from 'react-bootstrap';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';

// 위치정보 받을 수 있으면 {position} 프롭추가
export default function MeetDetailMapSection({ latitude, longitude }) {
  // onFetchLocationData();
  // const meetPosition = position;
  const lat = latitude;
  const lng = longitude;
  const handleMarkerClick = () => {
    // 마커를 누르면 그 위치를 보여주는 카카오맵페이지를 띄워준다
    // 프롭을 받아오면 프롭의 위치정보로 바꿔준다
    window.open(`https://map.kakao.com/link/map/모임위치,${lat},${lng}`);
  };
  return (
    <Container style={{ height: '8rem' }}>
      <Map
        center={{
          // 지도의 중심좌표
          // 프롭으로 받아온 위치정보로 바꾸기
          lat,
          lng,
        }}
        style={{
          width: '100%',
          height: '100%',
        }}
        level={4}
      >
        <MapMarker
          position={{
            // 프롭으로 받아온 위치정보로 바꾸기
            lat,
            lng,
          }}
          onClick={handleMarkerClick}
        />
      </Map>
    </Container>
  );
}
