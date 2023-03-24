import { useState } from 'react';

export const useInput = (validateValue: (s: string) => boolean) => {
	const [enteredValue, setEnteredValue] = useState('');
	const [isTouched, setIsTouched] = useState(false);

	const valueIsValid = validateValue(enteredValue);
	const hasError = isTouched && !valueIsValid;

	const valueChangeHandler = (e: React.FormEvent<HTMLInputElement>) => {
		setEnteredValue(e.currentTarget.value);
	};

	const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement>) => {
		setIsTouched(true);
	};

	const reset = () => {
		setEnteredValue('');
		setIsTouched(false);
	};

	return {
		value: enteredValue,
		isValid: valueIsValid,
		hasError,
		inputBlurHandler,
		valueChangeHandler,
		reset,
	};
};
