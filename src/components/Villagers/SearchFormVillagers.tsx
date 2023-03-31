import classes from './SearchFormVillagers.module.css';

type Props = {
	selected: string;
	onChangeFilter: (n: string) => void;
};

export const SearchFormVillagers = (props: Props) => {
	const personalityChangeHandler = (
		event: React.ChangeEvent<HTMLSelectElement>
	) => {
		props.onChangeFilter(event.target.value);
	};

	return (
		<div className={classes.filter}>
			<div className={classes['filter-control']}>
				<label>Filter by personality:</label>
				<select value={props.selected} onChange={personalityChangeHandler}>
					<option value=''>None</option>
					<option value='Big sister'>Big sister</option>
					<option value='Cranky'>Cranky</option>
					<option value='Jock'>Jock</option>
					<option value='Lazy'>Lazy</option>
					<option value='Normal'>Normal</option>
					<option value='Peppy'>Peppy</option>
					<option value='Smug'>Smug</option>
					<option value='Snooty'>Snooty</option>
				</select>
			</div>
			<div className={classes['filter-control']}>
				<label>Filter by species:</label>
				<select value={props.selected} onChange={personalityChangeHandler}>
					<option value=''>None</option>
					<option value='Anteater'>Anteater</option>
					<option value='Bear cub'>Bear cub</option>
					<option value='Cat'>Cat</option>
					<option value='Deer'>Deer</option>
					<option value='Frog'>Frog</option>
					<option value='Koala'>Koala</option>
					<option value='Octopus'>Octopus</option>
					<option value='Ostrich'>Ostrich</option>
					<option value='Rabbit'>Rabbit</option>
					<option value='Squirrel'>Squirrel</option>
					<option value='Wolf'>Wolf</option>
				</select>
			</div>
		</div>
	);
};
