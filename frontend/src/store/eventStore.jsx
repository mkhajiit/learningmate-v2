// eventStore.jsx
import { createSlice, current } from '@reduxjs/toolkit';

// Slice
const eventSlice = createSlice({
  name: 'event',
  initialState: [],
  reducers: {
    setEvents: (state, action) => action.payload,
    addEvent: (state, action) => {
      console.log(current(state), action.payload);
      const currentState = Array.isArray(state) ? state : [];
      return [...currentState, action.payload];
    },
    updateEvent: (state, action) =>
      state.map((event) => (event.id === action.payload.id ? { ...event, ...action.payload } : event)),
    deleteEvent: (state, action) => state.filter((event) => event.id !== action.payload),
  },
});

// Actions
export const { setEvents, addEvent, updateEvent, deleteEvent } = eventSlice.actions;

// Reducer
export default eventSlice.reducer;
