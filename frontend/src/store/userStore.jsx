/* eslint-disable default-param-last */
// 액션 타입 정의
const USER_LOGIN = 'USER_LOGIN';

// 액션 생성자 정의
export const loginAction = (data) => ({ type: USER_LOGIN, payload: data });

// 초기 상태 정의
const init = {
  userId: '',
  nickname: '',
  email: '',
};

// reducer 정의
const userStore = (state = init, action) => {
  switch (action.type) {
    case USER_LOGIN:
      // console.log(action.payload);
      return {
        ...state,
        userId: action.payload.user_id,
        nickname: action.payload.nickname,
        email: action.payload.email,
      };
    default:
      return state;
  }
};
export default userStore;
