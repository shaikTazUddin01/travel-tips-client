import { baseApi } from "../../Api/baseApi";



const followersApi=baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getMyFollowers:builder.query({
            query:()=>({
                url:'/followers/myFollowers',
                method:"GET"
            })
        })
    })
})

export const {useGetMyFollowersQuery}=followersApi