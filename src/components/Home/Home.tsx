import { Link } from 'react-router-dom';
import { Loader } from '../Loader/Loader';
import { Birthday } from '../Birthday/Birthday';
import ACLogo from '../../img/AC_Logo.png';
import wallpaper from '../../img/Villagers_Wallpaper.jpg';

import classes from './Home.module.css';

type Props = {
	isLoading: boolean;
	error: null | string;
}

export const Home = (props: Props) => {
	
	return (
		<>
			<div className={classes.container}>
				<img src={ACLogo} className={classes.logo} alt='Animal Crossing Logo' />
				<div className={classes.content}>
					{props.isLoading ? <Loader /> : <Birthday />}
					{props.error && <p>{props.error}</p>}
					<h2>Critterpedia</h2>
					<div>
					<h2>
						<Link to='/villagers'>Villagers<img className={classes.wallpaper} src={wallpaper}/></Link>
					</h2>
					
					</div>
				</div>
			</div>
		</>
	);
};
