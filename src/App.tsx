import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';
import { villagersActions } from './store/villagers';
import { useHttp } from './hooks/use-http';

import './App.module.css';
import { useEffect } from 'react';
import { VillagersList } from './components/Villagers/VillagersList';

export interface villagersState {
	villagers: {
		villagers: [];
	};
}

export type VillObj = {
	id: string;
	birthday_day: string;
	birthday_month: string;
	gender: string;
	image_url: string;
	name: string;
	personality: string;
	phrase: string;
	quote: string;
	sign: string;
	species: string;
};

function App() {
	const dispatch = useDispatch();
	const { isLoading, error, sendRequest: fetchVillagers } = useHttp();
	const villagers = useSelector(
		(state: villagersState) => state.villagers.villagers
	);

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (user) {
				const userEmail = user.email;
				dispatch(authActions.login(userEmail));
			}
		});
	}, [dispatch]);

	useEffect(() => {
		if (villagers.length !== 0) {
			return;
		}
		const transformVillager = (villsObj: VillObj[]) => {
			const newVillagers = villsObj.map((singleVill: VillObj) => {
				const {
					id,
					birthday_day,
					birthday_month,
					gender,
					image_url,
					name,
					personality,
					phrase,
					quote,
					sign,
					species,
				} = singleVill;

				return {
					id,
					birthday_day,
					birthday_month,
					gender,
					image_url,
					name,
					personality,
					phrase,
					quote,
					sign,
					species,
				};
			});
			dispatch(villagersActions.villagers(newVillagers));
		};

		fetchVillagers('https://api.nookipedia.com/villagers', transformVillager);
	}, [fetchVillagers, dispatch, villagers]);

	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home isLoading={isLoading} error={error} />} />
				<Route path='*' element={<Home isLoading={isLoading} error={error} />} />
				<Route path='/villagers' element={<VillagersList isLoading={isLoading} error={error}/>} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
