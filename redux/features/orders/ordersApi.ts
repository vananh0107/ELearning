import { apiSlice } from '../api/apiSlice';

export const ordersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrders: builder.query({
      query: (type) => ({
        url: `get-all-orders`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    getStripePublishablekey: builder.query({
      query: () => ({
        url: `payment/stripepublishablekey`,
        method: 'GET',
        credentials: 'include' as const,
      }),
    }),
    createPaymentIntent: builder.mutation({
      query: ({ amountInfo , description, courseId}) => ({
        url: `create-payment`,
        method: 'POST',
        body: { amountInfo , description, courseId},
        credentials: 'include' as const,
      }),
    }),
    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: `create-order`,
        body: { courseId, payment_info },
        method: 'POST',
        credentials: 'include' as const,
      }),
    }),
  }),
});

export const {
  useGetAllOrdersQuery,
  useCreatePaymentIntentMutation,
  useCreateOrderMutation,
  useGetStripePublishablekeyQuery
} = ordersApi;
