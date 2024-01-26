import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const protectApi = createApi({
  reducerPath: "protectApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["protect"],
  endpoints: (build) => ({
    getProtect: build.query({
      query: () => `/`,
      providesTags: ["protect"],
    }),
  }),
});

export const { useGetProtectQuery } = protectApi;
