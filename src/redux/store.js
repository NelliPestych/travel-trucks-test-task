import {configureStore} from '@reduxjs/toolkit';
import campersReducer from './campersSlice.js';
import filtersReducer from './filtersSlice.js';
import favoritesReducer from './favoritesSlice.js';

export const store = configureStore({
    reducer: {
        campers: campersReducer,
        filters: filtersReducer,
        favorites: favoritesReducer,
    },
});
