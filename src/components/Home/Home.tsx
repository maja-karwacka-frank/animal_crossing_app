import { Link } from 'react-router-dom';
import { useHttp } from '../../hooks/use-http';
import { Loader } from '../Loader/Loader';

import classes from './Home.module.css';
import ACLogo from '../../img/AC_Logo.png';
import { Birthday } from '../Birthday/Birthday';

export const Home = () => {
	const { isLoading, error} = useHttp();
	
	return (
		<>
			<div className={classes.container}>
				<img src={ACLogo} className={classes.logo} alt='Animal Crossing Logo' />
				<div className={classes.content}>
					{isLoading ? <Loader /> : <Birthday />}
					{error && <p>{error}</p>}
					<h2>Critterpedia</h2>
					<h2>
						<Link to='/villagers'>Villagers</Link>
					</h2>
				</div>
			</div>
		</>
	);
};
