import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { villagersActions } from '../../store/villagers';
import { useHttp } from '../../hooks/use-http';
import { Loader } from '../Loader/Loader';

import classes from './Home.module.css';
import ACLogo from '../../img/AC_Logo.png';
import { Birthday } from '../Birthday/Birthday';

export interface villagersState {
	villagers: {
		villagers: [];
	};
}

export type VillObj = {
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

export const Home = () => {
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
	}, [fetchVillagers, dispatch, villagers]);

	return (
		<>
			<div className={classes.container}>
				<img src={ACLogo} className={classes.logo} alt='Animal Crossing Logo' />
				<div className={classes.content}>
					{isLoading ? <Loader /> : <Birthday />}
					{error && <p>{error}</p>}
					<h2>Critterpedia</h2>
					<h2>
						<Link to='/villagers'>Villagers</Link>
					</h2>
				</div>
			</div>
		</>
	);
};
