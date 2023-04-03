import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/use-http';
import { seaCreaturesActions } from '../../store/seaCreatures';
import { Loader } from '../Loader/Loader';
import { Sea } from './Sea';
import { Available } from './Fishes';

import classes from './SeaCreatures.module.css';
import { CurrentlyAvailably } from './CurrentlyAvailable';

export interface seaCreaturesState {
	seaCreatures: {
		seaCreatures: [];
	};
}

export type SeaCreaturesObj = {
	name: string;
	id: string;
	catchphrases: string[];
	render_url: string;
	image_url: string;
	shadow_size: string;
	shadow_movement: string;
	sell_nook: number;
	north: {
		availability_array: Available[];
		times_by_month: {};
		months: string;
		months_array: [];
	};
};

export const SeaCreatures = () => {
	const dispatch = useDispatch();
	const { isLoading, error, sendRequest: fetchSeaCreatures } = useHttp();
	const seaCreatures = useSelector(
		(state: seaCreaturesState) => state.seaCreatures.seaCreatures
	);

	useEffect(() => {
		if (seaCreatures.length !== 0) {
			return;
		}
		const transformSeaCreatures = (seaObj: SeaCreaturesObj[]) => {
			const newSeaCreatures = seaObj.map((singleSea: SeaCreaturesObj) => {
				const {
					name,
					render_url,
					image_url,
					shadow_size,
					shadow_movement,
					sell_nook,
					north,
					catchphrases,
				} = singleSea;

				return {
					name,
					id: name,
					catchphrases,
					render_url,
					image_url,
					shadow_movement,
					shadow_size,
					sell_nook,
					north,
				};
			});
			dispatch(seaCreaturesActions.seaCreatures(newSeaCreatures));
		};

		fetchSeaCreatures(
			'https://api.nookipedia.com/nh/sea',
			transformSeaCreatures
		);
	}, [fetchSeaCreatures, seaCreatures, dispatch]);

	return (
		<div className={classes.content}>
			<h1>Sea Creatures</h1>
			<CurrentlyAvailably onCurrentCritters={seaCreatures}/>
			{isLoading && <Loader />}
			<h2>All Sea Creatures:</h2>
			{error && <p>{error}</p>}
			<div className={classes['sea-list']}>
				{seaCreatures.map((sea: SeaCreaturesObj, index) => (
					<Sea key={index} {...sea} />
				))}
			</div>
		</div>
	);
};
