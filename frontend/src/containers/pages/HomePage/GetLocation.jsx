import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { locationAction } from '../../../store/location';

function GetLocation() {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchLocation = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        dispatch(locationAction.setLocation({ lat, lng }));
      });
    };
    fetchLocation();
  }, [dispatch]);
}

export default GetLocation;
