import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const carApi = createApi({
  reducerPath: "carApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/cars/",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Car"],
  endpoints: (build) => ({
    getCars: build.query({
      query: () => "all",
      providesTags: ["Car"],
    }),
    userCar: build.query({
      query: (user) => `userCar?user=${user}`,
      providesTags: ["Car"],
    }),
    recommendCar: build.query({
      query: (location) => `/${location}`,
      providesTags: ["Car"],
    }),
    singleCars: build.query({
      query: (id) => `single/${id}`,
      providesTags: ["Car"],
    }),
    createCar: build.mutation({
      query(body) {
        return {
          url: `/create`,
          method: "POST",
          body,
        };
      },

      invalidatesTags: ["Car"],
    }),
    rateCar: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `${id}`,
          method: "PATCH",
          body,
        };
      },

      invalidatesTags: ["Car"],
    }),
  }),
});

export const {
  useGetCarsQuery,
  useUserCarQuery,
  useRecommendCarQuery,
  useSingleCarsQuery,
  useCreateCarMutation,
  useRateCarMutation,
} = carApi;
