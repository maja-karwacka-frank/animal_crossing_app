import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth';
import villagersReducer from './villagers';
import bugsReducer from './bugs'
import fishesReducer from './fishes';
import seaCreaturesReducer from './seaCreatures';

const store = configureStore({
	reducer: { auth: authReducer, villagers: villagersReducer, bugs: bugsReducer, fishes: fishesReducer, seaCreatures: seaCreaturesReducer },
});

export default store;
