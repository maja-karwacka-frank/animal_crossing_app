import { VillObj } from '../../App';
import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import classes from './Villager.module.css';
import { useState } from 'react';

export const Villager = (props: VillObj) => {
	const [selectedItemId, setSelectedItemId] = useState('');
	const [isActive, setIsActive] = useState<boolean>(false);

	const onClickHandler = (itemId: string) => {
		setSelectedItemId(itemId);
		setIsActive(!isActive);
	};

	return (
		<div className={classes.container}>
			<button
				className={classes.button}
				onClick={() => onClickHandler(props.id)}>
				{isActive && selectedItemId === props.id ? (
					<AiFillHeart className={classes.heart} />
				) : (
					<AiOutlineHeart className={classes.heart} />
				)}
			</button>
			<img
				className={classes['villager-icon']}
				src={props.image_url}
				alt='villager icon'></img>
			<p className={classes.name}>{props.name}</p>
			<p>
				Birthday: {props.birthday_day} {props.birthday_month} {props.sign}
			</p>
			<p>
				Species: {props.species} / {props.gender}
			</p>
			<p>Personality: {props.personality}</p>
			<p>Phrase: {props.phrase}</p>
			<p>Quote: {props.quote}</p>
		</div>
	);
};
