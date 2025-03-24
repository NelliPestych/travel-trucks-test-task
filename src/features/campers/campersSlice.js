import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8ee0cbc4c4c6fbd.mockapi.io';

export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async ({ page = 1, limit = 4, location = '', options = {}, form = '' }, thunkAPI) => {
      try {
        // Фільтрація валідних параметрів
        const filters = [];

        if (location) filters.push(`location=${encodeURIComponent(location)}`);

        if (form) filters.push(`form=${encodeURIComponent(form)}`);

        // Перетворити options: {AC: true, kitchen: false, ...} у правильний query
        Object.entries(options).forEach(([key, value]) => {
          if (value) filters.push(`${key}=true`);
        });

        filters.push(`page=${page}`);
        filters.push(`limit=${limit}`);

        const queryString = filters.join('&');

        const response = await axios.get(`${BASE_URL}/campers?${queryString}`);
        console.log('API Response:', response.data);
        return response.data;
      } catch (error) {
        console.error('API Error:', error.message);
        return thunkAPI.rejectWithValue(error.message);
      }
    }
);

const campersSlice = createSlice({
  name: 'campers',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    clearCampers: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
        .addCase(fetchCampers.pending, (state) => {
          state.status = 'loading';
          state.error = null;
        })
        .addCase(fetchCampers.fulfilled, (state, action) => {
          state.status = 'succeeded';
          state.items = action.payload;
        })
        .addCase(fetchCampers.rejected, (state, action) => {
          state.status = 'failed';
          state.error = action.payload;
        });
  },
});

export const { clearCampers } = campersSlice.actions;
export default campersSlice.reducer;
