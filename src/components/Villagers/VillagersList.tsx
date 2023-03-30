import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { villagersActions } from '../../store/villagers';
import { useHttp } from '../../hooks/use-http';
import { Loader } from '../Loader/Loader';
import { SearchFormVillagers } from './SearchFormVillagers';
import { Villager } from './Villager';

import classes from './VillagersList.module.css';
interface villagersState {
	villagers: {
		villagers: [];
	};
}

type VillObj = {
	id: string;
	birthday_day: string;
	birthday_month: string;
	gender: string;
	image_url: string;
	name: string;
	personality: string;
	phrase: string;
	quote: string;
	sign: string;
	species: string;
};

export const VillagersList = () => {
	const { isLoading, error, sendRequest: fetchVillagers } = useHttp();
	const dispatch = useDispatch();
	const villagers = useSelector(
		(state: villagersState) => state.villagers.villagers
	);

	useEffect(() => {
		if (villagers.length !== 0) {
			return;
		}
		const transformVillager = (villsObj: VillObj[]) => {
			const newVillagers = villsObj.map((singleVill: VillObj) => {
				const {
					id,
					birthday_day,
					birthday_month,
					gender,
					image_url,
					name,
					personality,
					phrase,
					quote,
					sign,
					species,
				} = singleVill;

				return {
					id,
					birthday_day,
					birthday_month,
					gender,
					image_url,
					name,
					personality,
					phrase,
					quote,
					sign,
					species,
				};
			});
			dispatch(villagersActions.villagers(newVillagers));
		};

		fetchVillagers('https://api.nookipedia.com/villagers', transformVillager);
	}, [fetchVillagers, dispatch, villagers.length]);

	return (
		<div className={classes.container}>
			<h1>Villagers List</h1>
			<SearchFormVillagers />
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<div className={classes['villagers-list-container']}>
				{villagers.slice(0, 80).map((item: VillObj, index) => {
					return <Villager key={index} {...item} />;
				})}
			</div>
		</div>
	);
};
