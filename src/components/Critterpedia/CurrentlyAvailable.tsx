// import { useSelector } from "react-redux";
// import { seaCreaturesState } from "./SeaCreatures";
import { FishObj, fishesState } from './Fishes';
// import { bugsState } from "./Bugs";

export const CurrentlyAvailably = (props: any) => {
	// const seaCreatures = useSelector((state: seaCreaturesState) => state.seaCreatures.seaCreatures);
	// const fishes = useSelector((state: fishesState) => state.fishes.fishes);
	const fishes = props.onCurrentCritters;
	// const bugs = useSelector((state: bugsState) => state.bugs.bugs);

	const today = new Date();
	const month = today.getMonth() + 1;
	const now = new Date().getHours();

	const filteredFishesByMonth = fishes.filter((fish: FishObj) =>
		fish.north.months_array.includes(month)
	);
	// console.log(filteredFishesByMonth);

	let filteredFishesByTime1: FishObj[] = [];
	let filteredFishesByTime2: FishObj[] = [];
	let filteredFishesByTime3: FishObj[] = [];

	const filteredFishesAllDay: FishObj[] = filteredFishesByMonth.filter(
		(fish: FishObj) => fish.north.times_by_month[month] === 'All day'
	);

	if (
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(now)
	) {
		filteredFishesByTime1 = filteredFishesByMonth.filter(
			(fish: FishObj) => fish.north.times_by_month[month] === '4 AM – 9 PM'
		);
	}

	if (
		[16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8].includes(now)
	) {
		filteredFishesByTime2 = filteredFishesByMonth.filter(
			(fish: FishObj) => fish.north.times_by_month[month] === '4 PM – 9 AM'
		);
	}

	if ([9, 10, 11, 12, 13, 14, 15].includes(now)) {
		filteredFishesByTime3 = filteredFishesByMonth.filter(
			(fish: FishObj) => fish.north.times_by_month[month] === '9 AM – 4 PM'
		);
	}

	const filteredAllFishes = [
		...filteredFishesAllDay,
		...filteredFishesByTime1,
		...filteredFishesByTime2,
		...filteredFishesByTime3,
	];

	console.log(filteredAllFishes);

	return <div>Curently Available</div>;
};
