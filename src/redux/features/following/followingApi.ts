import { baseApi } from "../../Api/baseApi";

export const followingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    markFollowing: builder.mutation({
      query: (data) => ({
        url: "/following/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Following"],
    }),
  }),
});

export const { useMarkFollowingMutation } = followingApi;
