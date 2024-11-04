import { baseApi } from "../../Api/baseApi";



const followersApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getMyFollowers:builder.query({
            query:()=>({
                url:'/followers/myFollowers',
                method:"GET"
            }),
            providesTags:["Followers"]
        })
    })
})

export const {useGetMyFollowersQuery}=followersApi