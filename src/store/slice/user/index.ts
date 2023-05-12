import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../api/dto/auth";

interface IUserState {
  user: IUser | null
  isAuth: boolean
  isLoading: boolean
}

const initialState: IUserState = {
  user: null,
  isAuth: !!localStorage.getItem('token'),
  isLoading: true
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUser: (state, action: PayloadAction<IUser | null>) => {
      state.user = action.payload
      state.isLoading = false
    },
    setIsAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
  }
})

export const {getUser, setIsAuth} = userSlice.actions

export default userSlice.reducer