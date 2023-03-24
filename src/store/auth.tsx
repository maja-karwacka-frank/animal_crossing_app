import { createSlice } from '@reduxjs/toolkit';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase';

const initialAuthState = {
	isLogged: false,
	userEmail: '',
};

const authSlice = createSlice({
	name: 'authentication',
	initialState: initialAuthState,
	reducers: {
		login(state) {
			state.isLogged = true;
		},
		logout(state) {
			state.isLogged = false;
		},
		username(state) {
			onAuthStateChanged(firebaseAuth, async (user) => {
				if (user?.email) {
					state.userEmail = user.email;
					state.isLogged = true;
                    console.log('isLogged');
				} else {
					state.userEmail = '';
					state.isLogged = false;
                    console.log('isNotLogged');
				}
			});
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
