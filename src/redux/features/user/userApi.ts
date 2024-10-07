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
    deleteUser: builder.mutation({
      query: (id:string) => ({
        url: `/user/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags:["user"]
    }),
    
  }),
});

export const {useAlluserQuery,useGetSingleUserQuery,useDeleteUserMutation} = userApi;
