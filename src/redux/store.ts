import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/src/redux/features/auth/authSlice";
import { baseApi } from "./Api/baseApi";

export const store = configureStore({
  reducer: {
    userInFo: authReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
