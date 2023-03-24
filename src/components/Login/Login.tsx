import { useInput } from '../../hooks/use-input';

import classes from './Login.module.css';

export const Login = () => {
	const isNotEmpty = (value: string) =>
		value.trim() !== '' && value.length >= 6;
	const isEmail = (value: string) => value.includes('@');

	const {
		value: passwordValue,
		isValid: passwordIsValid,
		hasError: passwordHasError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPassword,
	} = useInput(isNotEmpty);

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail);

	let formIsValid = false;

	if (passwordIsValid && emailIsValid) {
		formIsValid = true;
	}

	const submitHandler = (e: React.FormEvent) => {
		e.preventDefault();
		if (!formIsValid) {
			return;
		}
		console.log('submited');
		console.log(passwordValue, emailValue);

		resetPassword();
		resetEmail();
	};

	const passwordClasses = passwordHasError
		? `${classes['form-control']} ${classes.invalid}`
		: classes['form-control'];
	const emailClasses = emailHasError
		? `${classes['form-control']} ${classes.invalid}`
		: classes['form-control'];

	return (
		<>
		<h1>Please Log In</h1>
		<form onSubmit={submitHandler}>
			<div className={emailClasses}>
				<label htmlFor='email'>E-Mail Address</label>
				<input
					type='email'
					id='email'
					value={emailValue}
					onChange={emailChangeHandler}
					onBlur={emailBlurHandler}
				/>
				{emailHasError && (
					<p className={classes['error-text']}>
						Please enter an email address.
					</p>
				)}
			</div>
			<div className={passwordClasses}>
				<label htmlFor='password'>Password</label>
				<input
					type='password'
					id='password'
					value={passwordValue}
					onChange={passwordChangeHandler}
					onBlur={passwordBlurHandler}
				/>
				{passwordHasError && (
					<p className={classes['error-text']}>
						Please enter a password, min 6 characters.
					</p>
				)}
			</div>

			{/* <p className={classes['error-text']}>Some error from firebase</p> */}
			<div className={classes['form-actions']}>
				<button disabled={!formIsValid}>Sign up</button>
			</div>
		</form>
		</>
	);
};
