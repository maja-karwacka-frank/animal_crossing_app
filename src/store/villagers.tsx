import { createSlice } from '@reduxjs/toolkit';

const initialVillagersState = {
	villagers: []
};

const villagersSlice = createSlice({
	name: 'villagers',
	initialState: initialVillagersState,
	reducers: {
		villagers(state, action) {
			state.villagers = action.payload;
		},
	},
});

export const villagersActions = villagersSlice.actions;

export default villagersSlice.reducer;