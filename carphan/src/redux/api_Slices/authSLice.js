import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/users",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Auth"],
  endpoints: (build) => ({
    Register: build.mutation({
      query(body) {
        return {
          url: `/register`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
    Login: build.mutation({
      query(body) {
        return {
          url: `/login`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
