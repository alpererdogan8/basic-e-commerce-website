import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { asyncAuthLoginAPI, asyncAuthLogoutAPI, asyncAuthUserAPI } from './authAPI'

const initialState = {
  isLogin: false,
  userData: []
}

const authSlice = createSlice({
  initialState,
  name: 'auth',

  extraReducers: (builder) => {
    builder
      .addCase(asyncAuthUserAPI.pending, (state, action) => {
        return {
          ...state,
          userData: [action.payload]
        }
      })
      .addCase(asyncAuthUserAPI.fulfilled, (state, action) => {
        return {
          ...state,
          isLogin: action.payload.isLogin,
          userData: [action.payload.userdata]
        }
      })
      .addCase(asyncAuthUserAPI.rejected, (state, action) => {
        return {
          ...state,
          userData: [action.payload]
        }
      })
      .addCase(asyncAuthLoginAPI.pending, (state) => {
        return {
          ...state,
          isLogin: false
        }
      })
      .addCase(asyncAuthLoginAPI.fulfilled, (state, action) => {
        if (action.payload.isLogin) {
          toast.success(`Welcome ${action.payload.userdata.username}`)
          return {
            ...state,
            isLogin: true
          }
        } else {
          toast.success(`Wrong Login`)
          return {
            ...state,
            isLogin: false
          }
        }
      })
      .addCase(asyncAuthLoginAPI.rejected, (state) => {
        toast.success(`Login Failed`)
        return {
          ...state,
          isLogin: false
        }
      })

      .addCase(asyncAuthLogoutAPI.pending, (state) => {
        return {
          ...state,
          isLogin: true
        }
      })
      .addCase(asyncAuthLogoutAPI.fulfilled, (state) => {
        toast.success('Goodbye :)')
        return {
          ...state,
          isLogin: false
        }
      })
      .addCase(asyncAuthLogoutAPI.rejected, (state) => {
        return {
          ...state,
          isLogin: false
        }
      })
  }
})

export const { controlCookie } = authSlice.actions
export default authSlice.reducer
