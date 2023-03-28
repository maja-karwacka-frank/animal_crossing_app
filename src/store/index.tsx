import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import villagersReducer from './villagers';

const store = configureStore({
	reducer: { auth: authReducer, villagers: villagersReducer },
});

export default store;
