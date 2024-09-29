import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface IUser {
 userId:string
}

const initialState: IUser = {
  userId:"45",
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userInfo:(state)=>{

    }
  },
})

// Action creators are generated for each case reducer function
export const {userInfo } = userSlice.actions

export default userSlice.reducer