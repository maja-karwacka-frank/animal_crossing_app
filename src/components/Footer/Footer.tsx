import githubLogo from '../../img/github-logo.png';
import liLogo from '../../img/LI-logo.png';

import classes from './Footer.module.css';

export const Footer = () => {
	return (
		<footer>
			<div>
				<p>Animal Crossing App is a project created by Maja Karwacka-Frank:</p>
				<a target='_blank' href='https://github.com/maja-karwacka-frank'>
					<img
						className={classes['footer-small-logos']}
						src={githubLogo}
						alt='github'
					/>
				</a>
				<a
					target='_blank'
					href='https://www.linkedin.com/in/maja-karwacka-frank/'>
					<img
						className={classes['footer-small-logos']}
						src={liLogo}
						alt='LI'
					/>
				</a>
			</div>
		</footer>
	);
};
