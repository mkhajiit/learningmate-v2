import { createSlice } from '@reduxjs/toolkit';

const initialLocationState = {
  lat: 0,
  lng: 0,
};

const locationSlice = createSlice({
  name: 'location',
  initialState: initialLocationState,
  reducers: {
    setLocation(state, action) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

const positionSlice = createSlice({
  name: 'position',
  initialState: initialLocationState,
  reducers: {
    setPosition(state, action) {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
    },
  },
});

export const locationAction = locationSlice.actions;
export const positionAction = positionSlice.actions;

export const locationReducer = locationSlice.reducer;
export const positionReducer = positionSlice.reducer;
