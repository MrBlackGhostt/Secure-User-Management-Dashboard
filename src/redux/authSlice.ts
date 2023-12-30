import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { userData } from "../data/user"

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (userData: any, { dispatch }) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    dispatch(signInSuccess(userData))
    return userData
  }
)

interface AuthState {
  isAuthenticated: boolean
  user: any
  errorMessage: string | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInSuccess: (state, action: PayloadAction<any>) => {
      userData.users.push(action.payload)
      state.isAuthenticated = true
      state.user = action.payload
    },
    signUp: (state, action: PayloadAction<any>) => {
      const userIndex = userData.users.findIndex((user: any) => {
        return user.email === action.payload.email
      })

      if (userIndex !== -1) {
        const foundUser = userData.users[userIndex]

        if (foundUser.password === action.payload.password) {
          state.isAuthenticated = true
          state.user = action.payload
          state.errorMessage = null
        } else {
          state.isAuthenticated = false
          state.user = null
          state.errorMessage = "Wrong Password . Please try again."
        }
      } else {
        state.isAuthenticated = false
        state.user = null
        state.errorMessage = "User not found. Please sign up."
      }
    },

    signOut: (state) => {
      state.isAuthenticated = false
      state.user = null
      state.errorMessage = null
    },
  },
})

export const { signInSuccess, signUp, signOut } = authSlice.actions
export default authSlice.reducer
