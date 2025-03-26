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
        allItems: [],
        items: [],
        status: 'idle',
        error: null,
        selectedCamper: null,
        selectedCamperStatus: 'idle',
        selectedCamperError: null,
    },
    reducers: {
        filterCampers(state, action) {
            const { location, form, ...options } = action.payload;

            state.items = state.allItems.filter((camper) => {
                const matchesLocation = location
                    ? camper.location?.toLowerCase().includes(location.toLowerCase())
                    : true;

                const matchesForm = form ? camper.form === form : true;

                const matchesOptions = Object.entries(options).every(([key, value]) => {
                    if (!value) return true;

                    switch (key.toLowerCase()) {
                        case 'automatic':
                            return camper.transmission?.toLowerCase() === 'automatic';
                        case 'petrol':
                            return camper.engine?.toLowerCase() === 'petrol';
                        default:
                            // Для булевих полів — знаходимо ключ без урахування регістру
                            const camperKeys = Object.keys(camper).map(k => k.toLowerCase());
                            const matchIndex = camperKeys.indexOf(key.toLowerCase());

                            if (matchIndex === -1) return false;

                            const actualKey = Object.keys(camper)[matchIndex];
                            return camper[actualKey] === true;
                    }
                });

                return matchesLocation && matchesForm && matchesOptions;
            });
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCampers.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchCampers.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allItems = action.payload.items;
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

export const { filterCampers } = campersSlice.actions;
export default campersSlice.reducer;
