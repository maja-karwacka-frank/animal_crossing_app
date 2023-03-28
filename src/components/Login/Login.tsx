import { signInWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useInput } from '../../hooks/use-input';
import { useDispatch } from 'react-redux/es/exports';

import classes from './Login.module.css';
import { authActions } from '../../store/auth';

export const Login = () => {
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const navigate = useNavigate();
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

	const loginHandler = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		if (!formIsValid) {
			return;
		}

		try {
			await signInWithEmailAndPassword(firebaseAuth, emailValue, passwordValue);
			navigate('/');
			dispatch(authActions.login(emailValue));
		} catch ({ message }) {
			console.log(message);
			setError(
				'Raymond is not satisfied with your login or password. Please try again'
			);
			// setTimeout(() => {
			// 	setError('');
			// }, 6000);
		}

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
		<div className={classes.content}>
			<h1>Please Log In</h1>
			<form onSubmit={loginHandler} className={classes.form}>
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
				{error && <div className={classes['form-control']}><p className={classes['error-text']}>{error}</p></div>}
				<div className={classes['form-actions']}>
					<button disabled={!formIsValid}>Log in</button>
				</div>
			</form>
		</div>
	);
};
