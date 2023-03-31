import { Bugs } from './Bugs';
import { SeaCreatures } from './SeaCreatures';
import { Link } from 'react-router-dom';
import mahi from '../../img/Mahi.png';

import classes from './Critterpedia.module.css';

export const Criterpedia = () => {
	return (
		<div>
			<h1>Critterpedia</h1>
			<p>Currently available</p>
			<div>
				<Link to='/fishes'>
					Fishes
					<img className={classes.icon} src={mahi} alt='fish icon' />
				</Link>
			</div>
			<Bugs />
			<SeaCreatures />
		</div>
	);
};
