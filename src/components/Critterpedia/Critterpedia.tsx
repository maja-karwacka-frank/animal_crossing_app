import { Link } from 'react-router-dom';
import mahi from '../../img/Mahi.png';
import butterfly from '../../img/Butterfly.png';
import star from '../../img/Star.png';

import classes from './Critterpedia.module.css';

export const Criterpedia = () => {
	return (
		<div>
			<div className={classes.content}>
				<div>
					<Link to='/fishes'>
						Fishes
						<img className={classes.icon} src={mahi} alt='fish icon' />
					</Link>
				</div>
				<div>
					<Link to='/bugs'>
						Bugs
						<img
							className={classes.icon}
							src={butterfly}
							alt='butterfly icon'
						/>
					</Link>
				</div>
				<div>
					<Link to='/sea-creatures'>
						Sea Creatures
						<img className={classes.icon} src={star} alt='sea star icon' />
					</Link>
				</div>
			</div>
		</div>
	);
};
