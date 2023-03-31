import { createSlice } from '@reduxjs/toolkit';

const initialFishesState = {
	fishes: []
};

const fishesSlice = createSlice({
	name: 'fishes',
	initialState: initialFishesState,
	reducers: {
		fishes(state, action) {
			state.fishes = action.payload;
		},
	},
});

export const fishesActions = fishesSlice.actions;

export default fishesSlice.reducer;