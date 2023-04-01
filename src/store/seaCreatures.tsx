import { createSlice } from '@reduxjs/toolkit';

const initialSeaCreaturesState = {
	seaCreatures: []
};

const seaCreaturesSlice = createSlice({
	name: 'seaCreatures',
	initialState: initialSeaCreaturesState,
	reducers: {
		seaCreatures(state, action) {
			state.seaCreatures = action.payload;
		},
	},
});

export const seaCreaturesActions = seaCreaturesSlice.actions;

export default seaCreaturesSlice.reducer;