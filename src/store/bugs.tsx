import { createSlice } from '@reduxjs/toolkit';

const initialBugsState = {
	bugs: []
};

const bugsSlice = createSlice({
	name: 'bugs',
	initialState: initialBugsState,
	reducers: {
		bugs(state, action) {
			state.bugs = action.payload;
		},
	},
});

export const bugsActions = bugsSlice.actions;

export default bugsSlice.reducer;