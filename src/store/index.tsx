import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import villagersReducer from './villagers';
import bugsReducer from './bugs'
import fishesReducer from './fishes';

const store = configureStore({
	reducer: { auth: authReducer, villagers: villagersReducer, bugs: bugsReducer, fishes: fishesReducer },
});

export default store;
