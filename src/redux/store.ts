import { configureStore } from "@reduxjs/toolkit";

// import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from "redux-persist";

import { baseApi } from "./Api/baseApi";

import authReducer from "@/src/redux/features/auth/authSlice";
import queryReducer from '@/src/redux/features/post/postSlice'
const persistConfig = {
  key: "auth",
  storage,
};

const authPersistedReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: authPersistedReducer,
    queryOperation:queryReducer,
    [baseApi.reducerPath]: baseApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
    
    }).concat(baseApi.middleware),

});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);