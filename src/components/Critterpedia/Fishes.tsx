import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/use-http';
import { fishesActions } from '../../store/fishes';
import { Loader } from '../Loader/Loader';
import { Fish } from './Fish';
import classes from './Fishes.module.css';
import { CurrentlyAvailably } from './CurrentlyAvailable';

export interface fishesState {
	fishes: {
		fishes: [];
	};
}

export type Available = {
	months: string;
	time: string;
};

export type FishObj = {
	id: string;
	catchphrases: string[];
	render_url: string;
	image_url: string;
	name: string;
	location: string;
	shadow_size: string;
	sell_nook: number;
	north: {
		availability_array: Available[];
		times_by_month: {
			[month: number]: string;
		};
		months: string;
		months_array: number[];
	};
};

export const Fishes = () => {
	const dispatch = useDispatch();
	const { isLoading, error, sendRequest: fetchFishes } = useHttp();
	const fishes = useSelector((state: fishesState) => state.fishes.fishes);

	useEffect(() => {
		if (fishes.length !== 0) {
			return;
		}
		const transformFish = (fishObj: FishObj[]) => {
			const newFishes = fishObj.map((singleFish: FishObj) => {
				const {
					render_url,
					image_url,
					name,
					location,
					shadow_size,
					sell_nook,
					north,
					catchphrases,
				} = singleFish;

				return {
					id: name,
					catchphrases,
					name,
					render_url,
					image_url,
					location,
					shadow_size,
					sell_nook,
					north,
				};
			});
			dispatch(fishesActions.fishes(newFishes));
		};

		fetchFishes('https://api.nookipedia.com/nh/fish', transformFish);
	}, [fetchFishes, fishes, dispatch]);
   

	return (
		<div className={classes.content}>
			<h1>Fishes</h1>
			<CurrentlyAvailably onCurrentCritters={fishes}/>
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<h2>All Fishes:</h2>
			<div className={classes['fishes-list']}>
				{fishes.map((fish: FishObj, index) => (
					<Fish key={index} {...fish} />
				))}
			</div>
		</div>
	);
};
