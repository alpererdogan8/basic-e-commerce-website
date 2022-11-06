import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

export const asyncAuthRegisterAPI = createAsyncThunk('auth/isRegister', async (registerData) => {
  const authData = axios.post('/api/v1/auth/register', {
    username: registerData.username,
    email: registerData.email,
    password: registerData.password,
    withCredentials: true
  })
  return authData.data
})

export const asyncAuthLoginAPI = createAsyncThunk('auth/isLogin', async (loginData) => {
  const authData = await axios.post('/api/v1/auth/login', {
    username: loginData.username,
    password: loginData.password,
    withCredentials: true
  })
  return authData.data
})

export const asyncAuthLogoutAPI = createAsyncThunk('auth/logout', async () => {
  const authData = await axios.post('/api/v1/auth/logout')
  return authData.data
})

export const asyncAuthUserAPI = createAsyncThunk('auth/getUser', async () => {
  const getUser = await axios.get('/api/v1/auth/user')
  return getUser.data
})
