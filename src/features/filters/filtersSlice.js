import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    location: '',
    vehicleType: '',
    options: {
        ac: false,
        automatic: false,
        kitchen: false,
        tv: false,
        bathroom: false,
    },
};

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
        },
        setVehicleType: (state, action) => {
            state.vehicleType = action.payload;
        },
        toggleOption: (state, action) => {
            const option = action.payload;
            state.options[option] = !state.options[option];
        },
        resetFilters: () => initialState,
    },
});

export const {setLocation, setVehicleType, toggleOption, resetFilters} = filtersSlice.actions;
export default filtersSlice.reducer;
