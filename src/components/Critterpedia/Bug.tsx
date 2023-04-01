import { BugsObj } from './Bugs';
import classes from './Bug.module.css';

export const Bug = (props: BugsObj) => {
	return (
		<div className={classes.container}>
			<img className={classes['bug-icon']} src={props.render_url} />
			<p className={classes.title}>{props.name}</p>
			<p>Location: {props.location}</p>
			<p>{props.catchphrases}</p>
			<p>{props.sell_nook}</p>
			<p>
				{props.north.availability_array.map((val, index) => (
					<span key={index}>
						{val.months} / {val.time}
					</span>
				))}
			</p>
		</div>
	);
};
