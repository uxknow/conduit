import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../api/dto/auth";

interface IUserState {
  user: IUser | null
}

const initialState: IUserState = {
  user: null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload
    }
  }
})

export const {getUser} = userSlice.actions

export default userSlice.reducer