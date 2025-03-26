import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';

export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/campers`);
            return response.data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const fetchCamperById = createAsyncThunk(
    'campers/fetchCamperById',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(`${BASE_URL}/campers/${id}`);
            return response.data;
        } catch (error) {
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
        selectedCamper: null,
        selectedCamperStatus: 'idle',
        selectedCamperError: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload.items;
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchCamperById.pending, (state) => {
                state.selectedCamperStatus = 'loading';
                state.selectedCamperError = null;
            })
            .addCase(fetchCamperById.fulfilled, (state, action) => {
                state.selectedCamperStatus = 'succeeded';
                state.selectedCamper = action.payload;
            })
            .addCase(fetchCamperById.rejected, (state, action) => {
                state.selectedCamperStatus = 'failed';
                state.selectedCamperError = action.payload;
            });
    }
});

export default campersSlice.reducer;
