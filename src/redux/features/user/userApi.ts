import { baseApi } from "../../Api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    alluser: builder.query({
      query: () => ({
        url: "/user/getUsers",
        method: "GET",
      }),
      providesTags:["user"]
    }),
    getSingleUser: builder.query({
      query: (id:string) => ({
        url: `/user/getSingleUser/${id}`,
        method: "GET",
      }),
      providesTags:['user']
    }),
    getMyInFo: builder.query({
      query: () => ({
        url: `/user/getMyInFo`,
        method: "GET",
      }),
      providesTags:['user']
    }),
    deleteUser: builder.mutation({
      query: (id:string) => ({
        url: `/user/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["user"]
    }),
    updateUser: builder.mutation({
      query: ({payload}) => ({
        url: `/user/updateUserProfile/${payload?.id}`,
        method: "PATCH",
        body:payload?.updateInFo
      }),
      invalidatesTags:["user"]
    }),
    // update image
    updateProfileImage: builder.mutation({
      query: (payload) =>{ 
        // console.log('object-->',payload);
        return({
        url: '/user/updateProfileImage',
        method: "PATCH",
        body:payload
      })},
      invalidatesTags:["user"]
    }),
    // send request
    sendFriendRequest: builder.mutation({
      query: (payload) =>{ 
        // console.log('object-->',payload);
        return({
        url: '/user/sendRequest',
        method: "POST",
        body:{userId:payload}
      })},
      invalidatesTags:["user"]
    }),
    // confirm request
    confirmRequest: builder.mutation({
      query: (payload) =>{ 
        // console.log('object-->',payload);
        return({
        url: '/user/confirmRequest',
        method: "POST",
        body:{userId:payload}
      })},
      invalidatesTags:["user"]
    }),
    //delete request
    deleteRequest: builder.mutation({
      query: (payload) =>{ 
        // console.log('object-->',payload);
        return({
        url: '/user/deleteRequest',
        method: "POST",
        body:{userId:payload}
      })},
      invalidatesTags:["user"]
    }),
    //unfriend
    unfriend: builder.mutation({
      query: (payload) =>{ 
        // console.log('object-->',payload);
        return({
        url: '/user/unfriend',
        method: "POST",
        body:{userId:payload}
      })},
      invalidatesTags:["user"]
    }),
    
  }),
});

export const {useAlluserQuery,useGetSingleUserQuery,useDeleteUserMutation,useUpdateUserMutation,useUpdateProfileImageMutation,useGetMyInFoQuery,useSendFriendRequestMutation,useConfirmRequestMutation,useDeleteRequestMutation,useUnfriendMutation} = userApi;
