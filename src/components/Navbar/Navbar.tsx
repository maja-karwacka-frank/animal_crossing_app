import { useDispatch, useSelector } from 'react-redux/es/exports';
import { NavLink, Link } from 'react-router-dom';
import { authActions } from '../../store/auth';
import logoUser from '../../img/Raymond_Icon.png';

import classes from './Navbar.module.css';

interface authState {
	auth: {
		isLogged: boolean;
		userEmail: string;
	};
}

export const Navbar = () => {
	const dispatch = useDispatch();
	const userEmail = useSelector((state: authState) => state.auth.userEmail);
	const isLogged = useSelector((state: authState) => state.auth.isLogged);

	const logoutHandler = () => {
		dispatch(authActions.logout());
	};

	return (
		<div className={classes.navigation}>
			{isLogged && (
				<p className={classes['user-email']}>
					Welcome,{' '}
					<img src={logoUser} className={classes['logo-user']} alt=''></img>
					{userEmail}!
				</p>
			)}
			<NavLink
				to='/'
				className={({ isActive }) => (isActive ? classes.active : undefined)}>
				Home
			</NavLink>
			{!isLogged && (
				<>
					<NavLink
						to='/login'
						className={({ isActive }) =>
							isActive ? classes.active : undefined
						}>
						Log in
					</NavLink>
					<NavLink
						to='/register'
						className={({ isActive }) =>
							isActive ? classes.active : undefined
						}>
						Sign up
					</NavLink>
				</>
			)}
			{isLogged && (
				<>
					<NavLink to='/'>My Wishlist</NavLink>
					<Link to='/' onClick={logoutHandler}>
						Log out
					</Link>
				</>
			)}
		</div>
	);
};
