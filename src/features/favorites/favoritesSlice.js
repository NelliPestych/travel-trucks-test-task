import { createSlice } from '@reduxjs/toolkit';

const getInitialFavorites = () => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
};

const favoritesSlice = createSlice({
    name: 'favorites',
    initialState: {
        items: getInitialFavorites(),
    },
    reducers: {
        toggleFavorite: (state, action) => {
            const camperId = action.payload;
            if (state.items.includes(camperId)) {
                state.items = state.items.filter((id) => id !== camperId);
            } else {
                state.items.push(camperId);
            }
            localStorage.setItem('favorites', JSON.stringify(state.items));
        },
    },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
