// 추가할 기능: 검색결과 ui목록 구현
import { useState } from 'react';
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useDispatch, useSelector } from 'react-redux';
import { positionAction } from '../../store/location';

function SearchLocationSection() {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState('');
  const [markers, setMarkers] = useState([]);
  const position = useSelector((state) => state.position);
  const [map, setMap] = useState(false);
  const [info, setInfo] = useState(null);
  const reduxLat = useSelector((state) => state.location.lat);
  const reduxLng = useSelector((state) => state.location.lng);

  const searchLocation = async () => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(keyword, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        const bounds = new kakao.maps.LatLngBounds();
        const newMarkers = [];

        for (let i = 0; i < data.length; i += 1) {
          newMarkers.push({
            position: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });

          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setMarkers(newMarkers);
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
        // 검색 후 마커들을 띄웁니다.
        if (newMarkers.length > 0) {
          setInfo(newMarkers[0]);
        }
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    searchLocation();
  };

  const onClickHandlerMarker = (marker) => {
    const moveLatLon = new window.kakao.maps.LatLng(marker.position.lat, marker.position.lng);
    map.panTo(moveLatLon);

    setInfo(marker);
    dispatch(
      positionAction.setPosition({
        lat: Number(marker.position.lat).toFixed(6),
        lng: Number(marker.position.lng).toFixed(6),
      }),
    );
  };

  return (
    <Container>
      {/* mx-auto: 중앙정렬 */}
      <Form className='mx-auto' style={{ width: '50%' }} onSubmit={handleFormSubmit}>
        <InputGroup className='mb-3'>
          <Form.Control
            type='text'
            value={keyword}
            required
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='장소를 검색하세요'
          />
          <Button variant='primary' type='button' onClick={searchLocation}>
            검색
          </Button>
        </InputGroup>
      </Form>
      <Container className='d-flex justify-content-center align-items-center'>
        <Map
          center={{ lat: reduxLat, lng: reduxLng }} // 지도의 중심 좌표 홈에서 수집한 위치정보를 기준으로함
          style={{ width: '800px', height: '600px' }} // 지도 크기
          level={2}
          onCreate={setMap}
          disableDoubleClickZoom={true} // 더블클릭 확대 끔
          // 클릭한 위치의 위도 경도를 받는 이벤트 소수점6자리까지만 받는다 mouseEvent.latLng.getLat()는 숫자라 따로 변환안해도 된다
          onClick={
            (_t, mouseEvent) =>
              dispatch(
                positionAction.setPosition({
                  lat: mouseEvent.latLng.getLat().toFixed(6),
                  lng: mouseEvent.latLng.getLng().toFixed(6),
                }),
              )
            // setPosition((current) => ({
            //   ...current,
            //   lat: mouseEvent.latLng.getLat().toFixed(6),
            //   lng: mouseEvent.latLng.getLng().toFixed(6),
            // }))
          }
        >
          {/* 내위치 마커 생성 */}
          <MapMarker
            position={{ lat: reduxLat, lng: reduxLng }}
            // 내위치마커를 클릭해도 위치가 저장이 된다
            onClick={
              () => dispatch(positionAction.setPosition({ lat: reduxLat.toFixed(6), lng: reduxLng.toFixed(6) }))
              // setPosition((current) => ({
              //   ...current,
              //   lat: reduxLat.toFixed(6),
              //   lng: reduxLng.toFixed(6),
              // }))
            }
          >
            <div style={{ color: '#000', textAlign: 'center' }}>내위치</div>
          </MapMarker>
          {/* 클릭으로 마커 생성 */}
          {position && <MapMarker position={position} />}
          {/* 키워드 검색으로 주변 마커 생성 */}
          {markers.map((marker) => (
            <MapMarker
              key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
              position={marker.position}
              onClick={() => onClickHandlerMarker(marker)}
            >
              {info && info.content === marker.content && <div style={{ color: '#000' }}>{marker.content}</div>}
            </MapMarker>
          ))}
        </Map>
      </Container>
      {position && <p>{`클릭한 위치의 위도는 ${position.lat}이고, 경도는 ${position.lng} 입니다`}</p>}
      <h3>원하는 장소를 지도에 클릭하세요</h3>
    </Container>
  );
}

export default SearchLocationSection;
