import { baseApi } from "../../Api/baseApi";

export const notificationAPi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    
    getMyNotification: builder.query({
      query: () => ({
        url: "/notification/",
        method: "GET",
        
      }),
      providesTags: ["notification"],
    }),
  }),
});

export const { useGetMyNotificationQuery} = notificationAPi;
