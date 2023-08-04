import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch data asynchronously using createAsyncThunk
export const fetchData = createAsyncThunk('dashboard/fetchData', async (filters) => {
  const response = await axios.get('http://localhost:5000/api/data', { params: filters });
  return response.data;
});

// Dashboard slice
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: [],
    filters: {
      end_year: '',
      topic: '',
      sector: '',
      region: '',
      pestle: '',
      source: '',
      swot: '',
      country: '',
      city: '',
    },
  },
  reducers: {
    updateFilters: (state, action) => {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.fulfilled, (state, action) => {
        state.data = action.payload;
      });
  },
});

export const { updateFilters } = dashboardSlice.actions;
export default dashboardSlice.reducer;
