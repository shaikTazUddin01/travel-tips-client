import { baseApi } from "../../Api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    alluser: builder.query({
      query: () => ({
        url: "/user/getUsers",
        method: "GET",
      }),
    }),
    
  }),
});

export const {useAlluserQuery} = userApi;
