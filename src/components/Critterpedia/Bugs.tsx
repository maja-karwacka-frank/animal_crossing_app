import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHttp } from '../../hooks/use-http';
import { bugsActions } from '../../store/bugs';
import { Loader } from '../Loader/Loader';
import { Available } from './Fishes';
import { Bug } from './Bug';

import classes from './Bugs.module.css';
import { CurrentlyAvailably } from './CurrentlyAvailable';
export interface bugsState {
	bugs: {
		bugs: [];
	};
}

export type BugsObj = {
	name: string;
	id: string;
	catchphrases: string[];
	render_url: string;
	image_url: string;
	location: string;
	sell_nook: number;
	north: {
		availability_array: Available[];
		times_by_month: {};
		months: string;
		months_array: [];
	};
};

export const Bugs = () => {
	const dispatch = useDispatch();
	const { isLoading, error, sendRequest: fetchBugs } = useHttp();
	const bugs = useSelector((state: bugsState) => state.bugs.bugs);

	useEffect(() => {
		if (bugs.length !== 0) {
			return;
		}
		const transformBugs = (bugsObj: BugsObj[]) => {
			const newBugs = bugsObj.map((singleBug: BugsObj) => {
				const {
					render_url,
					image_url,
					name,
					location,
					sell_nook,
					north,
					catchphrases,
				} = singleBug;

				return {
					name,
					id: name,
					catchphrases,
					render_url,
					image_url,
					location,
					sell_nook,
					north,
				};
			});
			dispatch(bugsActions.bugs(newBugs));
		};

		fetchBugs('https://api.nookipedia.com/nh/bugs', transformBugs);
	}, [fetchBugs, bugs, dispatch]);

	return (
		<div>
			<h1>Bugs</h1>
			<CurrentlyAvailably onCurrentCritters={bugs}/>
			{isLoading && <Loader />}
			{error && <p>{error}</p>}
			<div className={classes['bugs-list']}>
				{bugs.map((bug: BugsObj, index) => (
					<Bug key={index} {...bug} />
				))}
			</div>
		</div>
	);
};
