import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const NotificationAPi = createApi({
  reducerPath: "NotificationAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:4000/notifications/",
    prepareHeaders(headers) {
      return headers;
    },
    credentials: "include",
  }),
  tagTypes: ["Notify"],
  endpoints: (build) => ({
    userNotification: build.query({
      query: (id) => `/userNotification/${id}`,
      providesTags: ["Notify"],
    }),
    updateNotification: build.mutation({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `/userNotification/${id}`,
          method: "PATCH",
          body,
        };
      },

      invalidatesTags: ["Notify"],
    }),
  }),
});

export const { useUserNotificationQuery, useUpdateNotificationMutation } =
  NotificationAPi;
