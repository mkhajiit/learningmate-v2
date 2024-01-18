import { createSlice } from '@reduxjs/toolkit';
import md5 from 'md5';

const initialUserInfoState = {
  userId: 0,
  nickname: '',
  email: '',
  phone_number: '',
  profilePath: '', // 기본값을 빈 문자열로 설정
};

const getGravatarUrl = (email) => {
  const hash = md5(email.trim().toLowerCase());
  return `https://www.gravatar.com/avatar/${hash}?s=40&d=retro`;
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
export const selectProfilePath = (state) => state.userInfo.profilePath;

// 추가된 부분: 그라바타 URL을 가져오는 셀렉터
export const selectGravatarUrl = (state) => {
  const { email } = state.userInfo;
  return getGravatarUrl(email);
};

export const getProfileImageUrl = (state) => {
  const profilePath = selectProfilePath(state);

  // 수정된 부분: 이미지 경로가 없으면 그라바타 URL 사용
  return profilePath || selectGravatarUrl(state);
};

export default userInfoSlice.reducer;
