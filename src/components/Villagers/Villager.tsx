import { VillObj } from '../Home/Home';
import classes from './Villager.module.css';

export const Villager = (props: VillObj) => {
	return (
		<div className={classes.container}>
			<img className={classes['villager-icon']} src={props.image_url} alt='villager icon'></img>
			<p className={classes.name}>{props.name}</p>
			<p>Birthday: {props.birthday_day} {props.birthday_month} {props.sign}</p>
			<p>Species: {props.species} / {props.gender}</p>
			<p>Personality: {props.personality}</p>
			<p>Phrase: {props.phrase}</p>
			<p>Quote: {props.quote}</p>
		</div>
	);
};
