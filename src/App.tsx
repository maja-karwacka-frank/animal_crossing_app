import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { Home } from './components/Home/Home';
import { Login } from './components/Login/Login';
import { Navbar } from './components/Navbar/Navbar';
import { Register } from './components/Register/Register';
import { useDispatch } from 'react-redux';
import { authActions } from './store/auth';

import './App.module.css';
import { useEffect } from 'react';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(authActions.username());
	}, [dispatch]);

	return (
		<div>
			<Navbar />
			<Routes>
				<Route path='/login' element={<Login />} />
				<Route path='/register' element={<Register />} />
				<Route path='/' element={<Home />} />
				<Route path='*' element={<Home />} />
			</Routes>
			<Footer />
		</div>
	);
}

export default App;
