import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './firebase';

import './App.module.css';
import { useEffect } from 'react';
import { VillagersList } from './components/Villagers/VillagersList';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		onAuthStateChanged(firebaseAuth, async (user) => {
			if (user) {
				const userEmail = user.email;
				dispatch(authActions.login(userEmail));
			}
		});
	}, [dispatch]);

	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Home />} />
				<Route path='/villagers' element={<VillagersList />}/>
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
