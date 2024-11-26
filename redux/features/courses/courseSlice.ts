import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  quizzes: '',
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    saveQuiz: (
      state,
      action: PayloadAction<any>
    ) => {
      state.quizzes=action.payload;
      console.log(state.quizzes)
    },
  },
});

export const { saveQuiz } = quizSlice.actions;
export default quizSlice.reducer;
