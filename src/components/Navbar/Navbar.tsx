// import { useSelector } from 'react-redux/es/exports';
import { NavLink } from 'react-router-dom';
import logoUser from '../../img/Raymond_Icon.png';


import classes from './Navbar.module.css';

export const Navbar = () => {
	// const userEmail = useSelector((state) => state.auth.userEmail);
	// const isLogged = useSelector((state) => state.auth.isLogged);

	return (
		<div>
			<img src={logoUser} className={classes['logo-user']} alt=''></img>
			{/* <p>{userEmail}</p> */}
			<NavLink to='/'>Home</NavLink>
			<>
				<NavLink to='/login'>Log in</NavLink>
				<NavLink to='/register'>Sign up</NavLink>
			</>
		</div>
	);
};
