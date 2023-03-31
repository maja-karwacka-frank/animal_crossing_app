import { useDispatch, useSelector } from 'react-redux/es/exports';
import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { authActions } from '../../store/auth';
import { signOut } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import logoUser from '../../img/Raymond_Icon.png';
import barIcon from '../../img/Hamburger-icon.png';

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
	const [toggleMenu, setToggleMenu] = useState(false);

	const logoutHandler = async (): Promise<void> => {
		try {
			await signOut(firebaseAuth);
		} catch (error) {
			console.log(error);
		}
		dispatch(authActions.logout());
	};

	const homeContent = (
		<NavLink
			to='/'
			className={({ isActive }) => (isActive ? classes.active : undefined)}>
			Home
		</NavLink>
	);

	const logoutContent = (
		<Link to='/' onClick={logoutHandler}>
			Log out
		</Link>
	);

	const myWishlistContent = <NavLink to='/'>My Wishlist</NavLink>;

	const loginContent = (
		<NavLink
			to='/login'
			className={({ isActive }) => (isActive ? classes.active : undefined)}>
			Log in
		</NavLink>
	);

	const signupContent = (
		<NavLink
			to='/register'
			className={({ isActive }) => (isActive ? classes.active : undefined)}>
			Sign up
		</NavLink>
	);

	const userContent = (
		<p className={classes['user-email']}>
			Welcome,{' '}
			<img src={logoUser} className={classes['logo-user']} alt=''></img>
			{userEmail}!
		</p>
	);

	const critterpediaContent = (
		<NavLink
			to='/critterpedia'
			className={({ isActive }) => (isActive ? classes.active : undefined)}>
			Critterpedia
		</NavLink>
	);

	return (
		<div className={classes.navigation}>
			<div className={classes.desktop}>
				{homeContent}
				{critterpediaContent}
				{isLogged && (
					<>
						{userContent}
						{myWishlistContent}
						{logoutContent}
					</>
				)}

				{!isLogged && (
					<>
						{loginContent}
						{signupContent}
					</>
				)}
			</div>

			<button
				onClick={() => setToggleMenu(!toggleMenu)}
				className={classes['bar-button']}>Nav
				<img src={barIcon} alt='' className={classes['bar-icon']}></img>
			</button>

			<div
				className={
					toggleMenu
						? `${classes['navbar-collapse']} ${classes['show-navbar-collapse']}`
						: classes['navbar-collapse']
				}>
				<ul className={classes.list}>
					{isLogged && (
						<>
							<li onClick={() => setToggleMenu(!toggleMenu)}>{homeContent}</li>
							<li onClick={() => setToggleMenu(!toggleMenu)}>{critterpediaContent}</li>
							<li onClick={() => setToggleMenu(!toggleMenu)}>
								{myWishlistContent}
							</li>
							<li onClick={() => setToggleMenu(!toggleMenu)}>
								{logoutContent}
							</li>
						</>
					)}
					{!isLogged && (
						<>
							<li onClick={() => setToggleMenu(!toggleMenu)}>{homeContent}</li>
							<li onClick={() => setToggleMenu(!toggleMenu)}>{critterpediaContent}</li>
							<li onClick={() => setToggleMenu(!toggleMenu)}>{loginContent}</li>
							<li onClick={() => setToggleMenu(!toggleMenu)}>
								{signupContent}
							</li>
						</>
					)}
				</ul>
			</div>
		</div>
	);
};
