import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { villagersActions } from '../../store/villagers';
import { useHttp } from '../../hooks/use-http';
import { Loader } from '../Loader/Loader';
import { SearchFormVillagers } from './SearchFormVillagers';
import { Villager } from './Villager';


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
	}, [fetchVillagers, dispatch]);
	console.log(villagers);

	return (
		<div>
			<h1>Villagers List</h1>
			<SearchFormVillagers />
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<Villager />
		</div>
	);
};
