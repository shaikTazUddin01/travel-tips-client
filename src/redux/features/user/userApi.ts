import { baseApi } from "../../Api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    alluser: builder.query({
      query: () => ({
        url: "/user/getUsers",
        method: "GET",
      }),
    }),
    getSingleUser: builder.query({
      query: (id:string) => ({
        url: `/user/getSingleUser/${id}`,
        method: "GET",
      }),
    }),
    
  }),
});

export const {useAlluserQuery,useGetSingleUserQuery} = userApi;
