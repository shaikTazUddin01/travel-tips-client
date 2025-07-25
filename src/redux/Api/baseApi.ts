import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// import { headers } from "next/headers";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl:
  // "http://localhost:5000/api/v1"
  "https://travel-tips-server.vercel.app/api/v1"
  ,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;

    if (token) {
      headers.set("authorization", token);
    }
    return headers;
  },
});

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({}),
  tagTypes: ["Post", "Following", "user", "verify", "messages","Followers","notification"],
});
