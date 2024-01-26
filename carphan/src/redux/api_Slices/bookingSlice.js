import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const bookingAPI = createApi({
  reducerPath: "bookingAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/booking",
  }),
  tagTypes: ["Booking"],
  endpoints: (build) => ({
    getBooking: build.query({
      query: (id) => `/userBooking/${id}`,
      providesTags: ["Booking"],
    }),
    singleBooking: build.query({
      query: (id) => `/singleBooking/${id}`,
      providesTags: ["Booking"],
    }),
    createBooking: build.mutation({
      query(body) {
        return {
          url: `/createBooking`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: ["Booking"],
    }),
  }),
});

export const {
  useGetBookingQuery,
  useSingleBookingQuery,
  useCreateBookingMutation,
} = bookingAPI;
