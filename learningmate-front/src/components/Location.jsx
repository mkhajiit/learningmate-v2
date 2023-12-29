import { Map, MapMarker } from 'react-kakao-maps-sdk';
import { useSelector } from 'react-redux';

function Location() {
    const redux_lat = useSelector((state) => state.location.lat);
    const redux_lng = useSelector((state) => state.location.lng);
    return (
        <Map
            center={{ lat: redux_lat, lng: redux_lng }} // 지도의 중심 좌표
            style={{ width: '800px', height: '600px' }} // 지도 크기
            level={3}
        >
            <MapMarker position={{ lat: redux_lat, lng: redux_lng }}>
                <div style={{ color: '#000', textAlign: 'center' }}>내위치</div>
            </MapMarker>
        </Map>
    );
}

export default Location;
