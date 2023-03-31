import { useSelector } from 'react-redux';
import { SearchFormVillagers } from './SearchFormVillagers';
import { Villager } from './Villager';
import { VillObj } from '../Home/Home';
import { villagersState } from '../Home/Home';

import classes from './VillagersList.module.css';

export const VillagersList = () => {
	const villagers = useSelector(
		(state: villagersState) => state.villagers.villagers
	);

	return (
		<div className={classes.container}>
			<h1>Villagers List</h1>
			<SearchFormVillagers />
			<div className={classes['villagers-list-container']}>
				{villagers.slice(0, 80).map((item: VillObj, index) => {
					return <Villager key={index} {...item} />;
				})}
			</div>
		</div>
	);
};
