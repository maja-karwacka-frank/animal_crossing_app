import { useInput } from '../../hooks/use-input';
import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseAuth } from '../../firebase.js';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux/es/exports';
import { authActions } from '../../store/auth';
import icon from '../../img/isabell.png';

import classes from './Register.module.css';

export const Register = () => {
	const dispatch = useDispatch();
	const [error, setError] = useState('');
	const navigate = useNavigate();

	const isNotEmpty = (value: string) =>
		value.trim() !== '' && value.length >= 6;
	const isEmail = (value: string) => value.includes('@');
	const isTheSame = (value: string) => value === passwordValue;

	const {
		value: passwordValue,
		isValid: passwordIsValid,
		hasError: passwordHasError,
		valueChangeHandler: passwordChangeHandler,
		inputBlurHandler: passwordBlurHandler,
		reset: resetPassword,
	} = useInput(isNotEmpty);

	const {
		value: repeatPasswordValue,
		isValid: repeatPasswordIsValid,
		hasError: repeatPasswordHasError,
		valueChangeHandler: repeatPasswordChangeHandler,
		inputBlurHandler: repeatPasswordBlurHandler,
		reset: resetRepeatPassword,
	} = useInput(isTheSame);

	const {
		value: emailValue,
		isValid: emailIsValid,
		hasError: emailHasError,
		valueChangeHandler: emailChangeHandler,
		inputBlurHandler: emailBlurHandler,
		reset: resetEmail,
	} = useInput(isEmail);

	let formIsValid = false;

	if (
		passwordIsValid &&
		emailIsValid &&
		repeatPasswordValue === passwordValue &&
		repeatPasswordIsValid
	) {
		formIsValid = true;
	}

	const submitHandler = async (e: React.FormEvent): Promise<void> => {
		e.preventDefault();
		if (!formIsValid) {
			return;
		}
		
		try {
			await createUserWithEmailAndPassword(
				firebaseAuth,
				emailValue,
				passwordValue
			);
			dispatch(authActions.login(emailValue))
			navigate('/')
		} catch (error: any) {
			if (error.code === 'auth/email-already-in-use') {
				console.log(error.message);
				setError('There is already user with that login. Please try again.');
			}
			if (error.code === 'auth/invalid-email') {
				console.log(error.message);
				setError('Your email is invalid. Please type a correct email address.');
			}
			setTimeout(() => {
				setError('');
			}, 6000);
		}

		resetPassword();
		resetRepeatPassword();
		resetEmail();
	};

	const repeatPasswordClasses = repeatPasswordHasError
		? `${classes['form-control']} ${classes.invalid}`
		: classes['form-control'];
	const passwordClasses = passwordHasError
		? `${classes['form-control']} ${classes.invalid}`
		: classes['form-control'];
	const emailClasses = emailHasError
		? `${classes['form-control']} ${classes.invalid}`
		: classes['form-control'];

	return (
		<div className={classes.content}>
			<img className={classes.icon} src={icon} alt='isabell icon'/>
			<h1>Please Sign up</h1>
			<form onSubmit={submitHandler} className={classes.form}>
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
				<div className={repeatPasswordClasses}>
					<label htmlFor='password'>Repeat password</label>
					<input
						type='password'
						id='password'
						value={repeatPasswordValue}
						onChange={repeatPasswordChangeHandler}
						onBlur={repeatPasswordBlurHandler}
					/>
					{repeatPasswordHasError && (
						<p className={classes['error-text']}>Please repeat a password.</p>
					)}
				</div>
				{error && <p className={classes['error-text']}>{error}</p>}
				<div className={classes['form-actions']}>
					<button disabled={!formIsValid}>Sign up</button>
				</div>
			</form>
		</div>
	);
};
