import { baseApi } from "../../Api/baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        body: data,
      }),
    }),
    
    }),
 
});

export const {useCreatePostMutation} = postApi;
