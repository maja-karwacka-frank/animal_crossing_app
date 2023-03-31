import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { VillObj } from '../../App';
import { villagersState } from '../../App';
import { Villager } from '../Villagers/Villager';
import classes from './Birthday.module.css';

export const Birthday = () => {
	const villagers = useSelector(
		(state: villagersState) => state.villagers.villagers
	);
	const [filteredVill, setFilteredVill] = useState<VillObj[]>([]);

	const today = new Date();
	const day = today.toLocaleString('en-US', { day: '2-digit' });
	const month = today.toLocaleString('en-EN', { month: 'long' });

	useEffect(() => {
		if (villagers.length !== 0) {
			setFilteredVill(
				villagers.filter(
					(vill: VillObj) =>
						vill.birthday_month === month && vill.birthday_day === day
				)
			);
		}
	}, [villagers, day, month]);

	return (
		<div className={classes.container}>
			<h2>Today Birthday:</h2>
			<ul className={classes.list}>
				{filteredVill.map((vill, index) => (
					<Villager key={index} {...vill} />
				))}
			</ul>
		</div>
	);
};
