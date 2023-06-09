import { useState } from 'react';

import classes from './CurrentlyAvailable.module.css';

export const CurrentlyAvailably = (props: any) => {
	const [selectedItemId, setSelectedItemId] = useState('');
	const [toggleItem, setToggleItem] = useState(false);

  function handleClick(itemId: any) {
    setSelectedItemId(itemId);
	setToggleItem(!toggleItem)
  }

	const critters = props.onCurrentCritters;

	const today = new Date();
	const month = today.getMonth() + 1;
	const now = new Date().getHours();

	const filteredByMonth = critters.filter((obj: any) =>
		obj.north.months_array.includes(month)
	);

	let filteredByTime1: [] = [];
	let filteredByTime2: [] = [];
	let filteredByTime3: [] = [];

	const filteredAllDay: [] = filteredByMonth.filter(
		(obj: any) => obj.north.times_by_month[month] === 'All day'
	);

	if (
		[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].includes(now)
	) {
		filteredByTime1 = filteredByMonth.filter(
			(obj: any) => obj.north.times_by_month[month] === '4 AM – 9 PM'
		);
	}

	if (
		[16, 17, 18, 19, 20, 21, 22, 23, 0, 1, 2, 3, 4, 5, 6, 7, 8].includes(now)
	) {
		filteredByTime2 = filteredByMonth.filter(
			(obj: any) => obj.north.times_by_month[month] === '4 PM – 9 AM'
		);
	}

	if ([9, 10, 11, 12, 13, 14, 15].includes(now)) {
		filteredByTime3 = filteredByMonth.filter(
			(obj: any) => obj.north.times_by_month[month] === '9 AM – 4 PM'
		);
	}

	const filteredAllCritters = [
		...filteredAllDay,
		...filteredByTime1,
		...filteredByTime2,
		...filteredByTime3,
	];

	return (
		<div className={classes.content}>
			<h2>Curently Available:</h2>
			<ul className={classes.list}>
				{filteredAllCritters.map((obj: any) => (
					<li onClick={() => handleClick(obj.id)} key={obj.id} className={toggleItem && selectedItemId === obj.id ? classes['active-item'] : ''}>
						{obj.name} <img src={obj.image_url} alt='critter icon' />
						{selectedItemId === obj.id && toggleItem && (
							<>
								<p>Location: {obj.location}</p>
								{/* <p>{obj.catchphrases}</p> */}
								<p>{obj.sell_nook}</p>
								<p>
									{obj.north.availability_array.map((val: any, index: any) => (
										<span key={index}>
											{val.months} / {val.time}
										</span>
									))}
								</p>
							</>
						)}
					</li>
				))}
			</ul>
		</div>
	);
};
