import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';

export const fetchCampers = createAsyncThunk(
    'campers/fetchCampers',
    async (params, thunkAPI) => {
        try {
            const response = await axios.get(BASE_URL, { params });

            console.log('API FULL Response:', response.data);

            // Повертаємо тільки масив campers
            return response.data.data || response.data.items || [];
        } catch (err) {
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);

const campersSlice = createSlice({
    name: 'campers',
    initialState: {
        items: [],
        isLoading: false,
        error: null,
        page: 1,
    },
    reducers: {
        resetCampers(state) {
            state.items = [];
            state.page = 1;
        },
        incrementPage(state) {
            state.page += 1;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.isLoading = false;

                if (Array.isArray(action.payload)) {
                    state.items.push(...action.payload);
                } else {
                    console.error('❌ Expected array in payload, got:', action.payload);
                }
            })
            .addCase(fetchCampers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Unknown error';
            });
    },
});

export const { resetCampers, incrementPage } = campersSlice.actions;

export default campersSlice.reducer;
