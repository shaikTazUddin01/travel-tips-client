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
    updateNotification: builder.mutation({
      query: () => ({
        url: "/notification/isread",
        method: "PATCH",
        body:{}
        
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const { useGetMyNotificationQuery,useUpdateNotificationMutation} = notificationAPi;
