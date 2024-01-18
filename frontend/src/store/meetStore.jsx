/* eslint-disable default-param-last */

// 액션 타입 정의
const MEET_DETAIL = 'MEET_DETAIL'; // 게시물 상세 정보
const MEET_CHANGE_DATA = 'MEET_CHANGE_DATA'; // 게시물 데이터 수정
const MEET_CLEAR_DATA = 'MEET_CLEAR_DATA'; // 게시물 데이터 초기화
const MEET_SET_DATES = 'MEET_SET_DATES'; // 날짜 설정
const UPDATE_MEET = 'UPDATE_MEET';

// 액션 생성자 정의
export const getMeetAction = (data) => ({ type: MEET_DETAIL, payload: data });
export const changeData = (evt) => {
  // console.log('Changed Data:', evt.target.name, evt.target.value);
  return {
    type: MEET_CHANGE_DATA,
    payload: {
      name: evt.target.name,
      value: evt.target.type === 'number' ? Number(evt.target.value) : evt.target.value,
    },
  };
};

// 날짜 액션 생성자 수정
export const setDates = (start_date, end_date) => ({
  type: MEET_SET_DATES,
  payload: { start_date, end_date },
});

export const clearData = () => ({ type: MEET_CLEAR_DATA });

export const updateMeetAction = (updatedMeet) => ({
  type: UPDATE_MEET,
  payload: updatedMeet,
});

// 초기 상태 정의 initialState
const init = {
  meet: {
    meet_id: '',
    nickname: '',
    email: '',
    title: '',
    content: '',
    start_date: '',
    end_date: '',
    max_num: '',
    onoff: '',
    image: '',
    category: '',
    createdAt: '',
  },
};

// reducer 정의
const meetStore = (state = init, action) => {
  switch (action.type) {
    case MEET_DETAIL:
      return { ...state, meet: action.payload };
    case MEET_CHANGE_DATA:
      return { ...state, meet: { ...state.meet, [action.payload.name]: action.payload.value } };
    case MEET_SET_DATES:
      return {
        ...state,
        meet: {
          ...state.meet,
          start_date: action.payload.start_date,
          end_date: action.payload.end_date,
        },
      };
    case MEET_CLEAR_DATA:
      return init;

    case UPDATE_MEET:
      return { ...state, meet: action.payload };

    default:
      return state;
  }
};
export default meetStore;
