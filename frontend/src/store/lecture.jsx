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
      state.courses = state.courses.filter((comment) => comment.course_id !== courseIdToDelete);
    },
  },
});

export const lectureAction = lectureSlice.actions;
export default lectureSlice.reducer;
