import { createSlice } from '@reduxjs/toolkit';

const initialLectureState = {
  term: '',
  courses: [],
  courseId: 0,
};

const lectureSlice = createSlice({
  name: 'lecture',
  initialState: initialLectureState,
  reducers: {
    insert(state, action) {
      state.term = action.payload.term;
      state.courses = action.payload.courses;
    },
    delete(state, action) {
      const courseIdToDelete = action.payload.courseId;
      state.courses = state.courses.filter((course) => course.course_id !== courseIdToDelete);
    },
  },
});

const initialLectureDetailState = {
  title: '',
  content: '',
  userId: 0,
  registerNickname: '',
  videoPath: '',
  category: '',
  createdAt: '',
  registerProfile: '',
};

const lectureDetailSlice = createSlice({
  name: 'lectureDetail',
  initialState: initialLectureDetailState,
  reducers: {
    insert(state, action) {
      state.title = action.payload.title;
      state.content = action.payload.content;
      state.userId = action.payload.userId;
      state.registerNickname = action.payload.registerNickname;
      state.videoPath = action.payload.videoPath;
      state.category = action.payload.category;
      state.createdAt = action.payload.createdAt;
      state.registerProfile = action.payload.registerProfile;
    },
  },
});

export const lectureAction = lectureSlice.actions;
export const lectureDetailAction = lectureDetailSlice.actions;
export const lectureReducer = lectureSlice.reducer;
export const lectureDetailReducer = lectureDetailSlice.reducer;
