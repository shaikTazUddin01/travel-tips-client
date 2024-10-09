import { baseApi } from "../../Api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signupApi: builder.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
        body: data,
      }),
    }),
    loginApi: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/changePassword",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgotPassword",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignupApiMutation ,useLoginApiMutation,useChangePasswordMutation,useForgotPasswordMutation} = authApi;
