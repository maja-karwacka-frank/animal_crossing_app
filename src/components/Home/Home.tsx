import classes from './Home.module.css';
import ACLogo from '../../img/AC_Logo.png';


export const Home = () => {
	return (
		<>
			<div className={classes.container}>
                <img src={ACLogo} className={classes.logo} alt='Animal Crossing Logo'></img>
				<div>
					<p>Critterpedia</p>
				</div>
				<div>
					<p>Villagers</p>
				</div>
			</div>
		</>
	);
};