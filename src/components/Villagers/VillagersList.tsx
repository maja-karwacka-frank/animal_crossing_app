import { useSelector } from 'react-redux';
import { useState } from 'react';
import { SearchFormVillagers } from './SearchFormVillagers';
import { Villager } from './Villager';
import { VillObj } from '../../App';
import { villagersState } from '../../App';

import classes from './VillagersList.module.css';

export const VillagersList = () => {
	const villagers = useSelector(
		(state: villagersState) => state.villagers.villagers
	);
	const [filteredPersonality, setFilteredPersonality] = useState('');

	const filteredChangeHandler = (selectedValue: string) => {
		setFilteredPersonality(selectedValue);
	};

	const filteredVillagers = villagers.filter((vill: VillObj) => {
		return (
			vill.personality === filteredPersonality ||
			vill.species === filteredPersonality
		);
	});

	let content;
	if (filteredVillagers.length > 0) {
		content = filteredVillagers.map((item: VillObj, index) => {
			return <Villager key={index} {...item} />;
		});
	} else {
		content = villagers.slice(0, 40).map((item: VillObj, index) => {
			return <Villager key={index} {...item} />;
		});
	}

	return (
		<div className={classes.container}>
			<h1>Villagers List</h1>
			<SearchFormVillagers
				selected={filteredPersonality}
				onChangeFilter={filteredChangeHandler}
			/>
			<div className={classes['villagers-list-container']}>{content}</div>
		</div>
	);
};
