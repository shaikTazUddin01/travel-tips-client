import { baseApi } from "../../Api/baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create post
    createPost: builder.mutation({
      query: (data) => ({
        url: "/post/create-post",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Post"],
    }),
    // get all post
    getPost: builder.query({
      query: ({category,search,type,sorting}:Record<string,any>) =>{
        console.log({category,search,type,sorting});
        return  ({
          url: "/post/all-post",
          method: "GET",
          params: { category,search,type,sorting},
        })
      },
      providesTags: ["Post"],
    }),
    // get my post
    getMyPost: builder.query({
      query: (query: string | undefined) => ({
        url: "/post/my-post",
        method: "GET",
        params: { type: query },
      }),
      providesTags: ["Post"],
    }),
    // get specific data
    getSpecificPost: builder.query({
      query: (id) => ({
        url: `/post/getSpecificUserPost/${id}`,
        method: "GET",
      }),
      providesTags: ["Post"],
    }),
    // upvote or downvote
    upvoteDownvote: builder.mutation({
      query: (postId) => ({
        url: "/post/upvoteDownvote",
        method: "POST",
        body:postId,
      }),
      invalidatesTags: ["Post"],
    }),
    // get specific data
    deleteSpecificPost: builder.mutation({
      query: (id) => ({
        url: `/post/delete-post/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
    // get specific data
    updateSpecificPost: builder.mutation({
      query: (data) => ({
        url: "/post/updatePost",
        method: "PATCH",
        body:data
      }),
      invalidatesTags: ["Post"],
    }),
    // comment post
    commentToPost: builder.mutation({
      query: (data) => ({
        url: "/post/comment",
        method: "POST",
        body:data
      }),
      invalidatesTags: ["Post","messages"],
    }),
    // delete comment from post
    deleteComment: builder.mutation({
      query: (data) => ({
        url: "/post/comment",
        method: "DELETE",
        body:data
      }),
      invalidatesTags: ["Post","messages"],
    }),
    //Update comment into post
    updateComment: builder.mutation({
      query: (data) => ({
        url: "/post/comment",
        method: "PATCH",
        body:data
      }),
      invalidatesTags: ["Post","messages"],
    }),
    //Update comment into post
    getSinglePost: builder.query({
      query: (id) => ({
        url: `/post/getSinglePost/${id}`,
        method: "GET",
      }),
      providesTags: ["Post","messages"],
    }),
  }),
});

export const {
  useCreatePostMutation,
  useGetPostQuery,
  useGetSpecificPostQuery,
  useGetMyPostQuery,
  useUpvoteDownvoteMutation,
  useDeleteSpecificPostMutation,
  useUpdateSpecificPostMutation,
  useCommentToPostMutation,
  useDeleteCommentMutation,
  useUpdateCommentMutation,
  useGetSinglePostQuery
} = postApi;
