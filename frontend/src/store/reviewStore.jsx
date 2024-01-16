/* eslint-disable default-param-last */

// 액션 타입 정의
const REVIEW_DETAIL = 'REVIEW_DETAIL'; // 게시물 상세 정보
const REVIEW_CHANGE_DATA = 'REVIEW_CHANGE_DATA'; // 게시물 데이터 수정
const REVIEW_CLEAR_DATA = 'REVIEW_CLEAR_DATA'; // 게시물 데이터 초기화

// 액션 생성자 정의
export const getReviewAction = (data) => ({ type: REVIEW_DETAIL, payload: data });
export const changeData = (evt) => {
  console.log('Changed Data:', evt.target.name, evt.target.value);
  return {
    type: REVIEW_CHANGE_DATA,
    payload: {
      name: evt.target.name,
      value: evt.target.type === 'number' ? Number(evt.target.value) : evt.target.value,
    },
  };
};

export const clearData = () => ({ type: REVIEW_CLEAR_DATA });

// 초기 상태 정의 initialState
const init = {
  review: [],
};

// reducer 정의
const reviewStore = (state = init, action) => {
  switch (action.type) {
    case REVIEW_DETAIL:
      console.log('REVIEW_DETAIL Action:', action.payload);
      return { ...state, review: action.payload };
    case REVIEW_CHANGE_DATA:
      console.log('REVIEW_CHANGE_DATA Action:', action.payload);
      return { ...state, review: { ...state.review, [action.payload.name]: action.payload.value } };
    case REVIEW_CLEAR_DATA:
      console.log('REVIEW_CLEAR_DATA Action');
      return init;
    default:
      return state;
  }
};
export default reviewStore;
