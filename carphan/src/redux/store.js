import { configureStore } from "@reduxjs/toolkit";
import authSLice from "./slices/authSLice";
import { authApi } from "./api_Slices/authSLice";
import { carApi } from "./api_Slices/carSlice";
import { bookingAPI } from "./api_Slices/bookingSlice";
import { protectApi } from "./api_Slices/protectSlice";
import { NotificationAPi } from "./api_Slices/notificationSlice";

export const store = configureStore({
  reducer: {
    auth: authSLice,
    [authApi.reducerPath]: authApi.reducer,
    [carApi.reducerPath]: carApi.reducer,
    [bookingAPI.reducerPath]: bookingAPI.reducer,
    [protectApi.reducerPath]: protectApi.reducer,
    [NotificationAPi.reducerPath]: NotificationAPi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      authApi.middleware,
      carApi.middleware,
      bookingAPI.middleware,
      protectApi.middleware,
      NotificationAPi.middleware,
    ]),
});
