import { apiSlice } from '../api/apiSlice';
export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: 'create-course',
        method: 'POST',
        body: data,
        credentials: 'include' as const,
      }),
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: 'get-all-courses-admin',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: 'DELETE',
        credentials: 'include' as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: 'PUT',
        body: data,
        credentials: 'include' as const,
      }),
    }),
    getUsersAllCourses: builder.query({
      query: () => ({
        url: 'get-courses',
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getReviewCourse: builder.query({
      query: (courseId) => ({
        url: `get-review/${courseId}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getCourseContent: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    addNewQuestion: builder.mutation({
      query: ({ question, courseId, contentId }) => ({
        url: 'add-question',
        body: {
          question,
          courseId,
          contentId,
        },
        method: 'PUT',
        credentials: 'include' as const,
      }),
    }),
    addAnswerInQuestion: builder.mutation({
      query: ({ answer, questionId, courseId, contentId }) => ({
        url: 'add-answer',
        body: {
          answer,
          courseId,
          contentId,
          questionId,
        },
        method: 'PUT',
        credentials: 'include' as const,
      }),
    }),
    addReviewInCourse: builder.mutation({
      query: ({ review, rating, courseId }) => ({
        url: `add-review/${courseId}`,
        body: {
          review,
          rating,
        },
        method: 'PUT',
        credentials: 'include' as const,
      }),
    }),
    addReplyInReview: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `add-reply`,
        body: {
          comment,
          courseId,
          reviewId,
        },
        method: 'PUT',
        credentials: 'include' as const,
      }),
    }),
    getProgress: builder.query({
      query: ({ courseId }) => ({
        url: `get-progress/${courseId}`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    updateProgress: builder.mutation({
      query: ({ contentId, courseId, quizId, quizStatus,quizSectionStatus }) => ({
        url: `update-progress`,
        body: {
          contentId,
          courseId,
          quizId,
          quizStatus,
          quizSectionStatus
        },
        method: 'POST',
        credentials: 'include' as const,
      }),
    }),
    shuffleQuiz: builder.mutation({
      query: ({ data }) => ({
        url: `shuffle-quiz`,
        body: {
          data: data,
        },
        method: 'POST',
        credentials: 'include' as const,
      }),
    }),
    getComplete: builder.mutation({
      query: ({ courseId, contentId }) => ({
        url: `is-complete`,
        body: {
          courseId,
          contentId,
        },
        method: 'POST',
        credentials: 'include' as const,
      }),
    }),
    submitCode: builder.mutation({
      query: ({courseId,contentId, code, language}) => ({
        url: `run-piston`,
        body: {
          courseId,contentId, code, language
        },
        method: 'POST',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUsersAllCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCourseContentQuery,
  useAddNewQuestionMutation,
  useAddAnswerInQuestionMutation,
  useAddReviewInCourseMutation,
  useAddReplyInReviewMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
  useShuffleQuizMutation,
  useGetCompleteMutation,
  useGetReviewCourseQuery,
  useSubmitCodeMutation
} = courseApi;
