import { createSlice } from '@reduxjs/toolkit';

const initialAuthState = {
	isLogged: false,
	userEmail: '',
};

const authSlice = createSlice({
	name: 'authentication',
	initialState: initialAuthState,
	reducers: {
		login(state, action) {
			state.isLogged = true;
			state.userEmail = action.payload;
		},
		logout(state) {
			state.isLogged = false;
			// state.userEmail = '';
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
