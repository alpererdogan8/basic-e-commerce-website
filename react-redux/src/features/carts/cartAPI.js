import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8000'

export const asyncAPI = createAsyncThunk('cart/fetchData', async (data) => {
  const fetchJson = await axios.get(`/${data}`, { withCredentials: true })
  return fetchJson.data
})
