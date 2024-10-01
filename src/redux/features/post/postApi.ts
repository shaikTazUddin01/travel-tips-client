import { baseApi } from "../../Api/baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags:["Post"]
    }),
    getPost: builder.query({
      query: () => ({
        url: "/post/all-post",
        method: "GET",
        // body: data,
      }),
      providesTags:['Post']
    }),
    
    }),
 
});

export const {useCreatePostMutation,useGetPostQuery} = postApi;
