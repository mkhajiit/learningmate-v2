import { createSlice } from '@reduxjs/toolkit';

const initialUserInfoState = {
  userId: 0,
  nickname: '',
  email: '',
  phone_number: '',
  profilePath: `${process.env.PUBLIC_URL}/img/default.png`,
};

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState: initialUserInfoState,
  reducers: {
    insert(state, action) {
      state.userId = action.payload.userId;
      state.nickname = action.payload.nickname;
      state.email = action.payload.email;
      state.phone_number = action.payload.phone_number;
      state.profilePath = action.payload.profilePath;
    },
    initialize() {
      return initialUserInfoState;
    },
  },
});

export const userInfoAction = userInfoSlice.actions;
export default userInfoSlice.reducer;
